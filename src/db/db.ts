import mongoose from 'mongoose';

export const connectToMongo = () => {
    return new Promise((resolve, reject) => {
        mongoose.createConnection('mongodb://localhost:27017/yourDB', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(_ => {
                console.log("Connected to DB");
                resolve(true)
            })
            .catch(err => reject(err))
    })
}
