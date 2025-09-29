import mongoose from "mongoose";

export const conn_mongo = () => {
    mongoose.connect(process.env.MONGO_URI as string, {
        dbName: 'Wanderer'
    })
    .then(() => console.log("✅ Conectado ao MongoDB"))
    .catch(err => console.error("❌ Erro ao conectar MongoDB:", err));
}
