import mongoose from "mongoose";
import app from "./app";

const MONGO_URL = process.env.MONGOURL!
const PORT = process.env.PORT || 5000

mongoose.connect(MONGO_URL).then(() => {
    console.log("MONGO DB Connected successfully!");
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
})