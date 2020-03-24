import { shallowMount, mount, shallow, createLocalVue } from "@vue/test-utils";
import Login from "../components/login/LoginPage";
import Vuex from "vuex";
import axios from "axios";
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as application from "tns-core-modules/application";
import { on } from "cluster";

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
  )
}));

describe("LoginPage.vue Standard", () => {
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

  it("mounts and renders", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.html()).toBeTruthy();
  });

  it("renders correctly", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.element).toMatchSnapshot();
  });

  it("is a Vue instance", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Expect component to exist", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper).toBeTruthy();
  });

  it("Expect component to have Page element", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("Page")).toBeTruthy();
  });

  it("Expect component to have StackLayout element", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("StackLayout")).toBeTruthy();
  });

  it("Expect component to have template element", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("template")).toBeTruthy();
  });

  it("Expect component to have script element", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("script")).toBeTruthy();
  });

  it("Expect component to have style element", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("style")).toBeTruthy();
  });

  it("Expect component to have Label element", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("Label")).toBeTruthy();
  });

  it("Expect component to have GridLayout element", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("GridLayout")).toBeTruthy();
  });

  it("Expect component to have TextField element", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("TextField")).toBeTruthy();
  });

  it("Expect component to have Button element", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("Button")).toBeTruthy();
  });

  it("Expect component to have ActivityIndicator element", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("ActivityIndicator")).toBeTruthy();
  });

  it("Expect component to have ScrollView element", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("ScrollView")).toBeTruthy();
  });

  it('Expect Button "Inloggen" to be visible', async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("Button").isVisible()).toBe(true);
  });

  it('Expect Button to have text "Inloggen"', async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    await expect(wrapper.find("Button").text()).toEqual("Inloggen");
  });

  it("Expect component to have methods property which is an object", async () => {
    await expect(typeof Login.methods).toBe("object");
  });

  it("Expect methods object to have onButtonTap function", async () => {
    await expect(typeof Login.methods.onButtonTap).toBe("function");
  });

  it("Expect methods object to have login function", async () => {
    await expect(typeof Login.methods.login).toBe("function");
  });

  it("Expect component to have data function", async () => {
    await expect(typeof Login.data).toBe("function");
  });

  it("Expect to have data() object", async () => {
    await expect(typeof Login.data()).toBe("object");
  });

  it("Expect data object to have user object", async () => {
    await expect(typeof Login.data().user).toBe("object");
  });

  it("Expect user object to have username property to equal empty string", async () => {
    await expect(typeof Login.data().user.username).toBe("string");
    await expect(Login.data().user.username).toEqual("");
  });

  it("Expect user object to have password property to equal empty string", async () => {
    await expect(typeof Login.data().user.password).toBe("string");
    await expect(Login.data().user.password).toEqual("");
  });

  it("Expect user object to have accountname property to equal empty string", async () => {
    await expect(typeof Login.data().user.accountname).toBe("string");
    await expect(Login.data().user.accountname).toEqual("");
  });
});

describe("LoginPage.vue functional", () => {
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

  it("Should show a dialog if username is empty", async function () {
    const wrapper = shallowMount(Login, { store, localVue });
    wrapper.vm.onButtonTap();

    await expect(dialogs.alert).toBeCalledWith(
      {
        title: 'Error',
        message: "Vul uw gebruikersnaam in!",
        okButtonText: 'Ok!'
      });
  });

  it("Should show a dialog if password is empty", async function () {
    const wrapper = shallowMount(Login, { store, localVue });
    wrapper.vm.user.username = "Test";
    wrapper.vm.onButtonTap();

    await expect(dialogs.alert).toBeCalledWith(
      {
        title: 'Error',
        message: "Vul uw wachtwoord in!",
        okButtonText: 'Ok!'
      });
  });

  it("Should show a dialog if accountname is empty", async function () {
    const wrapper = shallowMount(Login, { store, localVue });
    wrapper.vm.user.username = "Test";
    wrapper.vm.user.password = "OK";
    wrapper.vm.onButtonTap();

    await expect(dialogs.alert).toBeCalledWith(
      {
        title: 'Error',
        message: "Vul uw accountnaam in!",
        okButtonText: 'Ok!'
      });
  });

  it.skip("Should set isProcessing to true when logging in", async function () {
    const wrapper = shallowMount(Login, { store, localVue });
    wrapper.vm.login();

    await expect(axios.post).toBeCalledWith(
      "https://nostrapersoneelsapi.herokuapp.com/api/auth/login",
      {
        username: "",
        password: "",
        accountname: "",
        domain: ""
      }
    );
  });

  it("Should show a dialog if accountname is empty", async function () {
    const wrapper = shallowMount(Login, { store, localVue });
    wrapper.vm.user.username = "Test";
    wrapper.vm.user.password = "OK";
    wrapper.vm.user.accountname = "";
    wrapper.vm.onButtonTap();

    await expect(dialogs.alert).toBeCalledWith(
      {
        title: 'Error',
        message: "Vul uw accountnaam in!",
        okButtonText: 'Ok!'
      });
  });

  it("Expect login to be called", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    const method = jest.spyOn(wrapper.vm, "login");

    wrapper.vm.login();
    await expect(method).toBeCalled();
  });

  it("Expect onButtonTap to be called", async () => {
    const wrapper = shallowMount(Login, { store, localVue });
    const method = jest.spyOn(wrapper.vm, "onButtonTap");

    wrapper.vm.onButtonTap()
    await expect(method).toBeCalled();
  });

  it("Expect dialog to be shown when username is null", async () => {
    const formData = {
      user: {
        username: null,
        password: 'test',
        accountname: 'pieter',
        domain: ".avans.nl"
      }
    };
    const wrapper = shallowMount(Login, { store, localVue });
    wrapper.setData(formData);

    const method = jest.spyOn(wrapper.vm, "onButtonTap");

    wrapper.vm.onButtonTap();

    await expect(method).toBeCalled();
    await expect(dialogs.alert).toBeCalledWith(
      {
        title: 'Error',
        message: "Vul uw gebruikersnaam in!",
        okButtonText: 'Ok!'
      });
  });

  it("Expect dialog to be shown when password is null", async () => {
    const formData = {
      user: {
        username: 'null',
        password: null,
        accountname: 'pieter',
        domain: ".avans.nl"
      }
    };
    const wrapper = shallowMount(Login, { store, localVue });
    wrapper.setData(formData);

    const method = jest.spyOn(wrapper.vm, "onButtonTap");

    wrapper.vm.onButtonTap();

    await expect(method).toBeCalled();
    await expect(dialogs.alert).toBeCalledWith(
      {
        title: 'Error',
        message: "Vul uw wachtwoord in!",
        okButtonText: 'Ok!'
      });
  });

  it("Expect dialog to be shown when accountname is null", async () => {
    const formData = {
      user: {
        username: 'll',
        password: 'test',
        accountname: null,
        domain: ".avans.nl"
      }
    };
    const wrapper = shallowMount(Login, { store, localVue });
    wrapper.setData(formData);

    const method = jest.spyOn(wrapper.vm, "onButtonTap");

    wrapper.vm.onButtonTap()

    await expect(method).toBeCalled();
    await expect(dialogs.alert).toBeCalledWith(
      {
        title: 'Error',
        message: "Vul uw accountnaam in!",
        okButtonText: 'Ok!'
      });
  });
});
