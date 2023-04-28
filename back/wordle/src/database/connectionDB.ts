import mongoose from "mongoose"

export const connectionDB = async () => {
    try {
        const db = await mongoose.connect(`mongodb+srv://ulopez:CVGh0h47JFJcjA7J@cluster0.rbxqsys.mongodb.net/Wordle?retryWrites=true&w=majority`)        
        console.log(`Database is connected to`,  db.connection.db.databaseName)
        
    } catch (error) {
        if (error instanceof Error) console.log(error.message)
    }
}