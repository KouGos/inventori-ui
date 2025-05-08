"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  created_at: string
}

type Chat = {
  id: string
  title: string
  initial_prompt: string
  created_at: string
}

export default function ChatPage() {
  const { id } = useParams()
  const [chat, setChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch chat and messages
  useEffect(() => {
    const fetchChatAndMessages = async () => {
      try {
        // Fetch chat details
        const { data: chatData, error: chatError } = await supabase.from("chats").select("*").eq("id", id).single()

        if (chatError) throw chatError
        setChat(chatData as Chat)

        // Fetch messages
        const { data: messagesData, error: messagesError } = await supabase
          .from("messages")
          .select("*")
          .eq("chat_id", id)
          .order("created_at", { ascending: true })

        if (messagesError) throw messagesError

        // If no messages yet, create the initial system and user messages
        if (messagesData.length === 0 && chatData) {
          const systemMessage = {
            chat_id: id,
            role: "system",
            content:
              "You are MedResearch AI, an assistant specialized in medical research. Provide accurate, evidence-based information and help researchers with their queries.",
          }

          const userMessage = {
            chat_id: id,
            role: "user",
            content: chatData.initial_prompt,
          }

          // Insert system message
          const { data: sysMsg, error: sysError } = await supabase.from("messages").insert([systemMessage]).select()

          if (sysError) throw sysError

          // Insert user message
          const { data: userMsg, error: userError } = await supabase.from("messages").insert([userMessage]).select()

          if (userError) throw userError

          // Generate AI response to initial prompt
          await generateAIResponse(chatData.initial_prompt, id as string)

          // Fetch messages again after creating initial ones
          const { data: updatedMessages, error: updatedError } = await supabase
            .from("messages")
            .select("*")
            .eq("chat_id", id)
            .order("created_at", { ascending: true })

          if (updatedError) throw updatedError
          setMessages(updatedMessages as Message[])
        } else {
          setMessages(messagesData as Message[])
        }
      } catch (error) {
        console.error("Error fetching chat data:", error)
      }
    }

    if (id) {
      fetchChatAndMessages()
    }
  }, [id])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Generate AI response using AI SDK
  const generateAIResponse = async (userMessage: string, chatId: string) => {
    try {
      setIsLoading(true)

      // Get previous messages for context
      const { data: prevMessages } = await supabase
        .from("messages")
        .select("role, content")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true })

      // Format messages for the AI
      const formattedMessages =
        prevMessages?.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })) || []

      // Add the new user message
      formattedMessages.push({
        role: "user",
        content: userMessage,
      })

      // Generate response using AI SDK
      const { text } = await generateText({
        model: openai("gpt-3.5-turbo"),
        messages: formattedMessages,
      })

      // Save the AI response to the database
      const { error } = await supabase.from("messages").insert([
        {
          chat_id: chatId,
          role: "assistant",
          content: text,
        },
      ])

      if (error) throw error

      // Fetch updated messages
      const { data: updatedMessages, error: fetchError } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true })

      if (fetchError) throw fetchError
      setMessages(updatedMessages as Message[])
    } catch (error) {
      console.error("Error generating AI response:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")

    // Add user message to the database
    try {
      const { error } = await supabase.from("messages").insert([
        {
          chat_id: id,
          role: "user",
          content: userMessage,
        },
      ])

      if (error) throw error

      // Fetch updated messages to include the new user message
      const { data: updatedMessages, error: fetchError } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", id)
        .order("created_at", { ascending: true })

      if (fetchError) throw fetchError
      setMessages(updatedMessages as Message[])

      // Generate AI response
      await generateAIResponse(userMessage, id as string)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#e8e8e8]">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center">
        <Link href="/chat" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-medium truncate">{chat?.title || "Medical Research Chat"}</h1>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages
          .filter((m) => m.role !== "system")
          .map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-3xl rounded-lg p-4 ${
                  message.role === "user" ? "bg-[#500001] text-white" : "bg-white border border-gray-200"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-3xl rounded-lg p-4 bg-white border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "600ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your research question..."
            className="flex-1 min-h-[60px] max-h-[200px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button
            type="submit"
            className="bg-[#500001] hover:bg-[#700001] self-end h-[60px] px-4"
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
