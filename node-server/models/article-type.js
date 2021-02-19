"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleTypeInformationSchema = new Schema({
 article_type:Array
});

articleTypeInformationSchema.index({ id: 1 });

const ArticleTypeInformation = mongoose.model(
  "ArticleTypeInformation",
  articleTypeInformationSchema
);

export default ArticleTypeInformation;
