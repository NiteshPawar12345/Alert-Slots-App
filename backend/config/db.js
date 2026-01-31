import mongoose from 'mongoose'

async function DbConnection() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected...!")
    }catch(err) {
        console.log(err);
    }
}

export default DbConnection;