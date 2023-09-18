import { config } from "dotenv";
config();

import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_DB);

import { MJ } from "./models/mjModel.js";

export { MJ };
