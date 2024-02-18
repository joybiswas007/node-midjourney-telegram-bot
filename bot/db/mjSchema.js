import { config } from "dotenv";

import mongoose from "mongoose";

import { MJ } from "./models/mjModel.js";
import { SUDOER } from "./models/sudoerModel.js";

config();

const { MONGO_DB } = process.env;

mongoose.connect(MONGO_DB);

export { MJ, SUDOER };
