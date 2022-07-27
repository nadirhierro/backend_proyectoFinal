import mongoose from "mongoose";

let ObjectId = mongoose.Types.ObjectId;

export default function isValidObjectId(id) {
  try {
    if (ObjectId.isValid(id)) {
      if (String(new ObjectId(id)) === id) return true;
      throw new Error("Wrong ID format");
    }
    throw new Error("Wrong ID format");
  } catch (err) {
    throw err;
  }
}
