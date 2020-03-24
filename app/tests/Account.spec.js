import { shallowMount, createLocalVue } from "@vue/test-utils";
import Account from "../components/dashboard/AccountPage";
import Vuex from "vuex";

jest.mock('tns-core-modules/application', () => ({
  android: {
    on: jest.fn()
  },
  AndroidApplication: {
    activityBackPressedEvent: {}
  }
}));

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AccountPage.vue", () => {
  let store;
  let authState;
  let authActions;
  let accountState;
  let accountActions;
  let mutations;

  beforeEach(() => {
    authState = {
      token: ""
    };
    authActions = {
      getToken: jest.fn()
    };

    accountState = {
      employee: {}
    };
    accountActions = {
      fetchEmployee: jest.fn()
    };
    mutations = {
      setEmployee: jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        auth: {
          authState,
          authActions
        },
        account: {
          accountState,
          accountActions
        }
      }
    });
  });

  it("mounts and renders", async () => {
    const wrapper = shallowMount(Account, { store, localVue });
    await expect(wrapper.html()).toBeTruthy();
  });

  test("renders correctly", async () => {
    const wrapper = shallowMount(Account, { store, localVue });
    await expect(wrapper.element).toMatchSnapshot();
  });

  it("is a Vue instance", async () => {
    const wrapper = shallowMount(Account, { store, localVue });
    await expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Expect component to exist", async () => {
    const wrapper = shallowMount(Account, { store, localVue });
    await expect(wrapper).toBeTruthy();
  });

  it("Expect component to have Page element", async () => {
    const wrapper = shallowMount(Account, { store, localVue });
    await expect(wrapper.find("Page")).toBeTruthy();
  });

  it("Expect component to have GridLayout element", async () => {
    const wrapper = shallowMount(Account, { store, localVue });
    await expect(wrapper.find("GridLayout")).toBeTruthy();
  });

  it("Expect component to have Label element", async () => {
    const wrapper = shallowMount(Account, { store, localVue });
    await expect(wrapper.find("Label")).toBeTruthy();
  });

  it("Expect component to have 23 Label elements", async () => {
    const wrapper = shallowMount(Account, { store, localVue });
    await expect(wrapper.findAll("Label").length).toBe(23);
  });

  it("data returns message", async () => {
    await expect(typeof Account.data()).toBe("object");
    await expect(Account.data().employee).toBeTruthy();
  });

  it("Expect fetchEmployee to be called", async () => {
    shallowMount(Account, { store, localVue });
    const spy = jest.spyOn(accountActions, "fetchEmployee");
    const commit = jest.fn();
    const state = jest.fn();
    const token = authActions.getToken();
    accountActions.fetchEmployee({ state, commit }, token);
    await expect(spy).toBeCalled();
  });

  it("Expect setEmployee to be called", async () => {
    shallowMount(Account, { store, localVue });
    const spy = jest.spyOn(mutations, "setEmployee");
    const state = jest.fn();
    const employee = accountState.employee;
    mutations.setEmployee({ state, employee });
    await expect(spy).toBeCalled();
  });
});
