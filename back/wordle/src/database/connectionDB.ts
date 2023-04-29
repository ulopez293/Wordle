import mongoose from "mongoose"

export const connectionDB = async () => {
    try {
        const db = await mongoose.connect(`your_url`)        
        console.log(`Database is connected to`,  db.connection.db.databaseName)
        
    } catch (error) {
        if (error instanceof Error) console.log(error.message)
    }
}