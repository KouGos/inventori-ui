import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const { chatId, message } = await req.json()

    if (!chatId || !message) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Get previous messages for context
    const { data: prevMessages, error: fetchError } = await supabase
      .from("messages")
      .select("role, content")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })

    if (fetchError) {
      return NextResponse.json({ error: "Failed to fetch previous messages" }, { status: 500 })
    }

    // Format messages for the AI
    const formattedMessages =
      prevMessages?.map((msg) => ({
        role: msg.role as "system" | "user" | "assistant",
        content: msg.content,
      })) || []

    // Add the new user message if not already included
    if (!formattedMessages.some((msg) => msg.role === "user" && msg.content === message)) {
      formattedMessages.push({
        role: "user",
        content: message,
      })
    }

    // Generate response using AI SDK
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      messages: formattedMessages,
    })

    // Save the AI response to the database
    const { error: insertError } = await supabase.from("messages").insert([
      {
        chat_id: chatId,
        role: "assistant",
        content: text,
      },
    ])

    if (insertError) {
      return NextResponse.json({ error: "Failed to save AI response" }, { status: 500 })
    }

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in AI route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
