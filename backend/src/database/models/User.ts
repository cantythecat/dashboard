import { model, Schema } from "mongoose";

export interface UserInt {
  userId: string;
  userTag: string;
  avatar: string;
  guilds: string[];
}

export const user = new Schema({
  userId: String,
  userTag: String,
  avatar: String,
  guilds: Array,
});

export default model<UserInt>("user", user);
