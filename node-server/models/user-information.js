"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userInformationSchema = new Schema({
  account: String,
  password: {
    type: String,
    select: false,
    set(val) {
      return require("bcryptjs").hashSync(val, 10);
    },
  },
  nackname:String,
  register_time: String
});

userInformationSchema.index({ id: 1 });

const UserInformation = mongoose.model(
  "UserInformation",
  userInformationSchema
);

export default UserInformation;
