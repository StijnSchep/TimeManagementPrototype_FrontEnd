import { shallowMount, mount, shallow, createLocalVue } from "@vue/test-utils";
import SettingsPage from '../components/dashboard/SettingPage'
import Vuex from "vuex";
import axios from "axios";
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as application from "tns-core-modules/application";
import { getString, setString } from "tns-core-modules/application-settings";

jest.mock("tns-core-modules/application-settings", () => ({
  getString: jest.fn(() => ""),
  setString: jest.fn(),
  clear: jest.fn()
}));

jest.mock('nativescript-fingerprint-auth', () => ({
  FingerprintAuth: jest.fn(),
  getString: jest.fn(() => "")
}));

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("tns-core-modules/ui/dialogs", () => ({
  alert: jest.fn(() => Promise.resolve())
}));

jest.mock('tns-core-modules/application', () => ({
  android: {
    on: jest.fn()
  },
  AndroidApplication: {
    activityBackPressedEvent: {}
  }
}));

jest.mock("axios", () => ({
  post: jest.fn(() =>
    Promise.resolve({
      status: 200,
      data: {
        token: "bla"
      }
    })
  ),
  get: jest.fn(() => Promise.resolve(true))
}));

describe("SettingsPage", () => {
  let store;
  let state;
  let actions;

  beforeEach(() => {
    state = {
      token: null,
      user: null,
      isProcessing: true
    };
    actions = {
      getToken: jest.fn(),
      loginUser: jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        auth: {
          state,
          actions
        }
      }
    });
  });

  it("Should toggle usetouch to true if it's false", async function() {
    const wrapper = shallowMount(SettingsPage, { store, localVue });
    wrapper.vm.onCheckChanged();

    await expect(setString).toBeCalledWith("usetouch", "true")
  })

  it('Should get domains when user logs out', async function() {
    const wrapper = shallowMount(SettingsPage, { store, localVue });
    wrapper.vm.onLogout();

    await expect(axios.get).toBeCalledWith("https://nostrapersoneelsapi.herokuapp.com/api/company/domains")
  })


});
