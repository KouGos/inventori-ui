"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowRight, FileText, Beaker, TrendingUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

// Sample data for the suggestions
const PROMPT_SUGGESTIONS = [
  "Find recent studies on CRISPR gene editing for cancer treatment",
  "Summarize the latest research on mRNA vaccine technology",
  "Compare efficacy data between different COVID-19 treatments",
  "Analyze trends in neurodegenerative disease research",
  "Find clinical trials for novel Alzheimer's treatments",
  "Explain the mechanism of action for new diabetes medications",
]

// Sample data for recent research
const RECENT_RESEARCH = [
  {
    id: "1",
    title: "Advances in Immunotherapy for Solid Tumors",
    journal: "Nature Medicine",
    date: "May 2023",
  },
  {
    id: "2",
    title: "Novel Biomarkers for Early Alzheimer's Detection",
    journal: "Neurology",
    date: "April 2023",
  },
  {
    id: "3",
    title: "CRISPR-Based Diagnostics for Infectious Diseases",
    journal: "Science Translational Medicine",
    date: "June 2023",
  },
]

// Sample data for AI research tools
const AI_RESEARCH_TOOLS = [
  {
    id: "1",
    name: "Literature Analysis",
    description: "Analyze research papers and extract key findings",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "2",
    name: "Experiment Design",
    description: "Get AI assistance with research methodology",
    icon: <Beaker className="h-5 w-5" />,
  },
  {
    id: "3",
    name: "Trend Analysis",
    description: "Identify emerging trends in medical research",
    icon: <TrendingUp className="h-5 w-5" />,
  },
]

// Sample data for trending research
const TRENDING_RESEARCH = [
  {
    id: "1",
    title: "Single-cell RNA sequencing reveals cellular heterogeneity in pancreatic cancer",
    citations: 342,
    trend: "+28% this month",
  },
  {
    id: "2",
    title: "AI-powered drug discovery platform identifies novel antibiotic candidates",
    citations: 287,
    trend: "+42% this month",
  },
  {
    id: "3",
    title: "Long-term outcomes of CAR-T cell therapy in hematological malignancies",
    citations: 215,
    trend: "+15% this month",
  },
]

export default function ChatPage() {
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Rotate through suggestions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestionIndex((prev) => (prev + 1) % PROMPT_SUGGESTIONS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      // In a real app, this would navigate to a chat with this prompt
      console.log("Submitted:", inputValue)
      // For demo purposes, just clear the input
      setInputValue("")
    }
  }

  return (
    <div className="min-h-screen bg-[#e8e8e8] pb-10">
      {/* Hero section with animated orb */}
      <div className="relative bg-[#1a1a1a] text-white py-20 px-6 flex flex-col items-center justify-center overflow-hidden">
        {/* Animated floating orb */}
        <div className="absolute">
          <motion.div
            className="w-64 h-64 rounded-full bg-gradient-to-br from-[#500001] to-[#800002] opacity-20 blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 z-10">What medical research can I help with?</h1>

        <div className="w-full max-w-2xl z-10">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={PROMPT_SUGGESTIONS[currentSuggestionIndex]}
              className="w-full px-4 py-3 pr-12 rounded-md bg-[#2a2a2a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#500001]"
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSuggestionIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-4 top-3 text-gray-400 pointer-events-none"
                style={{ opacity: inputValue ? 0 : 1 }}
              >
                {PROMPT_SUGGESTIONS[currentSuggestionIndex]}
              </motion.span>
            </AnimatePresence>
            <Button
              type="submit"
              className="absolute right-2 top-2 bg-[#500001] hover:bg-[#700001] p-2 rounded-md"
              disabled={!inputValue.trim()}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6 z-10">
          <Button
            variant="outline"
            className="bg-[#2a2a2a] border-gray-700 text-white hover:bg-[#333] hover:text-white"
            onClick={() => router.push("/tools/literature")}
          >
            <FileText className="h-4 w-4 mr-2" />
            Analyze Paper
          </Button>
          <Button
            variant="outline"
            className="bg-[#2a2a2a] border-gray-700 text-white hover:bg-[#333] hover:text-white"
            onClick={() => router.push("/knowledge/journals")}
          >
            <Search className="h-4 w-4 mr-2" />
            Literature Search
          </Button>
          <Button
            variant="outline"
            className="bg-[#2a2a2a] border-gray-700 text-white hover:bg-[#333] hover:text-white"
            onClick={() => router.push("/tools/protocol")}
          >
            <Beaker className="h-4 w-4 mr-2" />
            Research Design
          </Button>
          <Button
            variant="outline"
            className="bg-[#2a2a2a] border-gray-700 text-white hover:bg-[#333] hover:text-white"
            onClick={() => router.push("/tools/comparator")}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Trend Analysis
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent Research */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-[#500001]" />
              Recent Research
            </h2>
            <div className="space-y-3">
              {RECENT_RESEARCH.map((item) => (
                <Card key={item.id} className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="text-sm text-gray-500 mt-1">
                      {item.journal} • {item.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start text-[#500001] hover:text-[#700001] hover:bg-white/50"
                onClick={() => router.push("/knowledge/journals")}
              >
                View all recent research
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* AI Research Tools */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-[#500001]" />
              AI Research Tools
            </h2>
            <div className="space-y-3">
              {AI_RESEARCH_TOOLS.map((tool) => (
                <Card key={tool.id} className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="bg-[#fff8f8] p-2 rounded-md mr-3 text-[#500001]">{tool.icon}</div>
                      <div>
                        <h3 className="font-medium">{tool.name}</h3>
                        <p className="text-sm text-gray-500">{tool.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start text-[#500001] hover:text-[#700001] hover:bg-white/50"
                onClick={() => router.push("/tools")}
              >
                Explore all tools
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Trending Research */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-[#500001]" />
              Trending Research
            </h2>
            <div className="space-y-3">
              {TRENDING_RESEARCH.map((item) => (
                <Card key={item.id} className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-2">{item.title}</h3>
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span className="text-gray-500">{item.citations} citations</span>
                      <span className="text-green-600 font-medium">{item.trend}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start text-[#500001] hover:text-[#700001] hover:bg-white/50"
                onClick={() => router.push("/knowledge/journals")}
              >
                View all trending topics
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
