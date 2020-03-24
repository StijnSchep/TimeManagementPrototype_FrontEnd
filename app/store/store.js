import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from "./auth";
import checkIn from "./checkIn";
import account from './account';
import pause from './pause'

export default new Vuex.Store({
  modules: {
    auth,
    checkIn,
    account,
    pause
  }
});
