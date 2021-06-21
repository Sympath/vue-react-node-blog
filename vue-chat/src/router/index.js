import Vue from "vue";
import VueRouter from "vue-router";
import GroupChat from "../views/group-chat";
import SingleChat from "../views/single-chat";

Vue.use(VueRouter);

const routes = [
  {
    path: "/groupChat",
    name: "groupChat",
    component: GroupChat,
  },
  {
    path: "/singleChat",
    name: "singleChat",
    component: SingleChat,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
