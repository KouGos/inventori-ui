import { supabase } from "./supabase"

export async function initializeDatabase() {
  // Check if tables exist
  const { data: tablesExist, error: checkError } = await supabase.from("chats").select("id").limit(1)

  // If tables don't exist or there's an error, create them
  if (checkError || !tablesExist) {
    console.log("Initializing database tables...")

    try {
      // Create chats table
      await supabase.rpc("create_chats_table")

      // Create messages table
      await supabase.rpc("create_messages_table")

      // Create research_papers table
      await supabase.rpc("create_research_papers_table")

      // Create research_collections table
      await supabase.rpc("create_research_collections_table")

      // Create collection_items table
      await supabase.rpc("create_collection_items_table")

      console.log("Database tables created successfully")
    } catch (error) {
      console.error("Error initializing database:", error)
    }
  }
}
