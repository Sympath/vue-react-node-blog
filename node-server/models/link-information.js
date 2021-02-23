"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const linkInformationSchema = new Schema({
  blog_name:String,
  author:String,
  logo:String,
  link:String,
  content:String,
  create_time:String
});

linkInformationSchema.index({ id: 1 });

const LinkInformation = mongoose.model(
  "LinkInformation",
  linkInformationSchema
);

export default LinkInformation;
