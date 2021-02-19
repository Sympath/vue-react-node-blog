"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleInformationSchema = new Schema({
  article:String,
  author: String,
  category: String,
  isPublic: Boolean,
  title: String,
  create_time:String,
  comments:String,
  like:{
    type:Number,
    default:0
  },
  read:{
    type:Number,
    default:0
  }
});

articleInformationSchema.index({ id: 1 });

const ArticleInformation = mongoose.model(
  "ArticleInformation",
  articleInformationSchema
);

export default ArticleInformation;
