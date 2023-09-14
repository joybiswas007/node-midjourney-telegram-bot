import { Schema, model } from "mongoose";
import { schemaOptions } from "../config.js";

const mjSchema = new Schema(
    {
     query_id: Number,
     message_id: Number,
     chat_instance: Number,
     chat_id: Number,
     chat_name: String,
     user_id: Number,
     username: String,
     data: String,
     prompt: String,
    },
    schemaOptions
  );
  
export const MJ = new model("MIDJOURNEY", mjSchema);