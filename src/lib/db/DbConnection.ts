import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {}

const DbConnect = async () => {
    if (connection.isConnected) {
        console.log("db is already connected");
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONOGODB_UR || "" , {})
        connection.isConnected = db.connections[0].readyState;
        console.log("database is connected ", db.connections[0].readyState)
    } catch (error) {
        console.log("db is not connected ", error)
        process.exit(1)
    }
}


export default DbConnect;