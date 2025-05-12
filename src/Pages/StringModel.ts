import mongoose from "mongoose";

export interface IString extends Document {
  content: string;
}

const StringSchema = new mongoose.Schema({
    content: { type: String, required: true }
  });
  
  export const StringModel = mongoose.model<IString>('String', StringSchema);