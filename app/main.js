import Vue from 'nativescript-vue'
import App from './components/App'
import Vuex from 'vuex'
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';

Vue.use(Vuex)
import store from './store/store';

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === 'production';

Vue.registerElement(
    'CardView',
    () => require('@nstudio/nativescript-cardview').CardView
);

Vue.registerElement(
    'DropDown',
    () => require('nativescript-drop-down').DropDown
);


TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  fa: './assets/css/fontawesome.min.css',
  fal: './assets/css/light.min.css',
  far: './assets/css/regular.min.css',
  fas: './assets/css/solid.min.css',
  fab: './assets/css/brands.min.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start();
