import { Schema, model } from "mongoose";
import { schemaOptions } from "../config.js";

const sudoerSchema = new Schema(
  {
    sudoer: {
      type: Number,
      required: true
    }
  },
  schemaOptions
);

export const SUDOER = new model("SUDOER", sudoerSchema);
