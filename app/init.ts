import { initializeDatabase } from "@/lib/init-db"

// Initialize the database when the app starts
export async function init() {
  try {
    await initializeDatabase()
    console.log("Database initialization complete")
  } catch (error) {
    console.error("Failed to initialize database:", error)
  }
}

// Call the init function
init()
