import types from "./type";

export default {
  // 将state中的socket重新赋值
  [types.SET_SOCKET](state, param) {
    state.socket = param;
  },
  // 将state中的message push进新消息
  [types.SET_MESSAGE](state, param) {
    state.message = param;
  },
};
