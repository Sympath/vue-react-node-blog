"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageInformationSchema = new Schema({
    user_id:String,
    nackname:String,
    user_avatar:String,
    message_txt:String,
    message_time:String

});

messageInformationSchema.index({ id: 1 });

const MessageInformation = mongoose.model(
  "MessageInformation",
  messageInformationSchema
);

export default MessageInformation;
