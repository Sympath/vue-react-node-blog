"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const publishInformationSchema = new Schema({
  notice:String,
  create_time:String
});

publishInformationSchema.index({ id: 1 });

const PublishInformation = mongoose.model(
  "PublishInformation",
  publishInformationSchema
);

export default PublishInformation;
