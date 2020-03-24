import { shallowMount } from "@vue/test-utils";
import App from "../components/App";


jest.mock("tns-core-modules/application-settings", () => ({
  getString: jest.fn()
}));

jest.mock('nativescript-fingerprint-auth', () => ({
  FingerprintAuth: jest.fn(),
  getString: jest.fn(() => "")
}));

jest.mock('tns-core-modules/application', () => ({
  android: {
    on: jest.fn()
  },
  AndroidApplication: {
    activityBackPressedEvent: {}
  }
}));

jest.mock("tns-core-modules/ui/dialogs", () => ({
  alert: jest.fn(() => Promise.resolve())
}));

describe("App.vue", () => {
  it("mounts and renders", async () => {
    const wrapper = shallowMount(App);
    await expect(wrapper.html()).toBeTruthy();
  });

  test("renders correctly", async () => {
    const wrapper = shallowMount(App);
    await expect(wrapper.element).toMatchSnapshot();
  });

  it("is a Vue instance", async () => {
    const wrapper = shallowMount(App);
    await expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Expect component to exist", async () => {
    const wrapper = shallowMount(App);
    await expect(wrapper).toBeTruthy();
  });

  it("Expect component to have Page element", async () => {
    const wrapper = shallowMount(App);
    await expect(wrapper.find("Page")).toBeTruthy();
  });

  it("Expect component to have FlexboxLayout element", async () => {
    const wrapper = shallowMount(App);
    await expect(wrapper.find("FlexboxLayout")).toBeTruthy();
  });

  it("Expect component to have template element", async () => {
    const wrapper = shallowMount(App);
    await expect(wrapper.find("template")).toBeTruthy();
  });

  it("Expect component to have script element", async () => {
    const wrapper = shallowMount(App);
    await expect(wrapper.find("script")).toBeTruthy();
  });

  it("Expect component to have style element", async () => {
    const wrapper = shallowMount(App);
    await expect(wrapper.find("style")).toBeTruthy();
  });
});
