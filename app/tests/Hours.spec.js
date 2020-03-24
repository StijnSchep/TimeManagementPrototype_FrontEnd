import { shallowMount, createLocalVue } from "@vue/test-utils";
import Hours from "../components/dashboard/HoursPage";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('tns-core-modules/application', () => ({
  android: {
    on: jest.fn()
  },
  AndroidApplication: {
    activityBackPressedEvent: {}
  }
}));

jest.mock("tns-core-modules/application-settings", () => ({
  getString: jest.fn(() => ""),
  setString: jest.fn(),
  clear: jest.fn()
}));

jest.mock("tns-core-modules/ui/dialogs", () => ({
  alert: jest.fn(() => Promise.resolve())
}));

describe("HoursPage.vue", () => {
  let store;
  let state;
  let actions;

  beforeEach(() => {
    state = {
      pause: 0,
      startTime: null
    };
    actions = {
      addEndPause: jest.fn(),
      addStartPause: jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        pause: {
          state,
          actions
        }
      }
    });
  });

  it("mounts and renders", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    await expect(wrapper.html()).toBeTruthy();
  });

  test("renders correctly", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    await expect(wrapper.element).toMatchSnapshot();
  });

  it("is a Vue instance", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    await expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Expect component to exist", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    await expect(wrapper).toBeTruthy();
  });

  it("Expect component to have Page element", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    await expect(wrapper.find("Page")).toBeTruthy();
  });

  it("Expect component to have GridLayout element", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    await expect(wrapper.find("GridLayout")).toBeTruthy();
  });

  it("Expect component to have Label element", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    await expect(wrapper.find("Label")).toBeTruthy();
  });

  it("Expect component to have 2 Label elements", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    await expect(wrapper.findAll("Label").length).toBe(1);
  });

  it("Expect onCheckedIn to be called", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    const method = jest.spyOn(wrapper.vm, "onCheckedIn");
    const data = {
      startTime: "12:00",
      branchId: 1,
      departmentId: 1
    };
    wrapper.vm.onCheckedIn(data);
    await expect(method).toBeCalled();
  });

  it("Expect onCheckedOut to be called", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    const method = jest.spyOn(wrapper.vm, "onCheckedOut");
    const data = {
      endTime: "12:00"
    };
    wrapper.vm.onCheckedOut(data);
    await expect(method).toBeCalled();
  });

  it("Expect data() prop to be correct after method call", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    const method = jest.spyOn(wrapper.vm, "onCheckedIn");
    const data = {
      startTime: "12:00",
      branchId: 1,
      departmentId: 1
    };
    wrapper.vm.onCheckedIn(data);

    await expect(method).toBeCalled();
    await expect(wrapper.vm.isCheckedIn).toBe(true);
    await expect(wrapper.vm.startTime).toBe("12:00");
    await expect(wrapper.vm.branchId).toBe(1);
    await expect(wrapper.vm.departmentId).toBe(1);
  });

  it("Expect onCheckedOut to be called", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    const method = jest.spyOn(wrapper.vm, "onCheckedOut");
    const endTime = "12:00";

    wrapper.vm.onCheckedOut(endTime);
    await expect(method).toBeCalled();
    await expect(wrapper.vm.isCheckedOut).toBe(true);
    await expect(wrapper.vm.endTime).toBe(endTime);
  });

  it("Expect onCheckInIsConfirmed to be called", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    const method = jest.spyOn(wrapper.vm, "onCheckInIsConfirmed");

    wrapper.vm.onCheckInIsConfirmed();
    await expect(method).toBeCalled();
  });

  it("Expect onCheckOutIsConfirmed to be called", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    const method = jest.spyOn(wrapper.vm, "onCheckOutIsConfirmed");

    wrapper.vm.onCheckOutIsConfirmed();
    await expect(method).toBeCalled();
  });

  it("Expect onPauseConfirmed to be called", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});
    const method = jest.spyOn(wrapper.vm, "onPauseConfirmed");

    wrapper.vm.onPauseConfirmed();
    await expect(method).toBeCalled();
    await expect(wrapper.vm.isOnPauseTapped).toBe(false);
  });

  it("Expect onPauseTap(true) to be called", async () => {
    const wrapper = shallowMount(Hours, {store, localVue});

    const isPausedIn = true;
    wrapper.vm.onPauseTap(isPausedIn)

    let d = new Date(Date.now());
    let minutes = d.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    await expect(wrapper.vm.isOnPauseTapped).toBe(true);
    await expect(wrapper.vm.time).toBe(d.getHours() + ":" + minutes);
    await expect(wrapper.vm.pauseMsg).toBe(`Je pauze is om ${d.getHours() + ":" + minutes} afgelopen`)
    await expect(wrapper.vm.isPause).toBe(false);
  });
});
