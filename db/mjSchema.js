import { config } from "dotenv";
config();

import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_DB).then( () => {
    console.log("Connected to database!")
}).catch( (err) => {
    console.log("Error: ", err)
});

import { MJ } from "./models/mjModel.js";

export { MJ }
