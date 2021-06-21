import Vue from "vue";
import Vuex from "vuex";
import userInformation from "./user-information";
import singleChat from "./single-chat";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      singleChat,
      userInformation
    },
});
