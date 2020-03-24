import { shallowMount, createLocalVue } from "@vue/test-utils";
import CheckIn from "../components/Check-in/CheckInComponent";
import * as Toast from 'nativescript-toast';
import * as geolocation from "nativescript-geolocation";
import Vuex from "vuex";
import * as dialogs from 'tns-core-modules/ui/dialogs';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("nativescript-geolocation", () => ({
  getCurrentLocation: jest.fn(() =>
    Promise.resolve({
      latitude: 0.0,
      longitude: 0.0
    })
  ),
  enableLocationRequest: jest.fn(() => Promise.resolve({ data: {} })),
  isEnabled: jest.fn(() => Promise.resolve(true))
}));

jest.mock("tns-core-modules/ui/dialogs", () => ({
  alert: jest.fn(() => Promise.resolve())
}));

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} }))
}));

describe("CheckInComponent.vue", () => {
  let store;
  let state;
  let actions;
  let mutations;

  beforeEach(() => {
    state = {
      workedHours: [],
      branchId: null,
      departmentId: null
    };
    actions = {
      getBranchIdAndDepartmentId: jest.fn(),
      getAllBranchesAndDepartments: jest.fn((c, d) =>
        Promise.resolve({ data: {} })
      ),
      postCheckIn: jest.fn((c, d) => Promise.resolve({ data: {} })),
      fetchAllWorkedHours: jest.fn()
    };
    mutations = {
      setBranchesWithDepartments: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        checkIn: {
          state,
          actions,
          mutations
        }
      }
    });
  });

  it("mounts and renders", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.html()).toBeTruthy();
  });

  it("has form object inside data()", async () => {
    await expect(typeof CheckIn.data().form).toEqual("object");
  });

  it("renders correctly", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.element).toMatchSnapshot();
  });

  it("is a Vue instance", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Expect component to exist", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper).toBeTruthy();
  });

  it("Expect component to have Page element", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.find("Page")).toBeTruthy();
  });

  it("Expect component to have StackLayout element", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.find("StackLayout")).toBeTruthy();
  });

  it("Expect component to have template element", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.find("template")).toBeTruthy();
  });

  it("Expect component to have script element", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.find("script")).toBeTruthy();
  });

  it("Expect component to have style element", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.find("style")).toBeTruthy();
  });

  it("Expect component to have Label element", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.find("Label")).toBeTruthy();
  });

  it("Expect component to have data()", async () => {
    await expect(typeof CheckIn.data).toEqual("function");
    await expect(typeof CheckIn.data()).toEqual("object");
  });

  it("Expect component to have form object", async () => {
    await expect(typeof CheckIn.data().form).toEqual("object");
  });

  it("Expect form object to have props", async () => {
    await expect(typeof CheckIn.data().form.branch).toEqual("object");
    await expect(CheckIn.data().form.branch).toEqual(null);
    await expect(typeof CheckIn.data().form.branchId).toEqual("object");
    await expect(CheckIn.data().form.branchId).toEqual(null);
    await expect(typeof CheckIn.data().form.department).toEqual("object");
    await expect(CheckIn.data().form.department).toEqual(null);
    await expect(typeof CheckIn.data().form.departmentId).toEqual("object");
    await expect(CheckIn.data().form.departmentId).toEqual(null);
  });

  it("Expect component to have methods object", async () => {
    await expect(typeof CheckIn.methods).toEqual("object");
  });

  it("Expect component to be visible", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.isVisible()).toBe(true);
  });

  it("Expect component to have created function", async () => {
    await expect(typeof CheckIn.created).toEqual("function");
  });

  it("Expect component to have methods object", async () => {
    await expect(typeof CheckIn.methods).toBe("object");
  });

  it("Expect component to have 3 methods", async () => {
    await expect(typeof CheckIn.methods.branchChanged).toBe("function");
    await expect(typeof CheckIn.methods.departmentChanged).toBe("function");
    await expect(typeof CheckIn.methods.onCheckInTap).toBe("function");
  });

  it("Expect method onCheckInTap to exist", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.vm.onCheckInTap).toBeTruthy();
  });

  it("Expect method branchChaged to exist", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.vm.branchChanged).toBeTruthy();
  });

  it("Expect isProcessing to be true with all data filled in form", async () => {
    const formData = {
      form: {
        branch: "Breda",
        branchId: 1,
        department: "Development",
        departmentId: 1,
        dateCorrectFormat: "1999-12-14",
        startTime: "12:00",
        latitude: 0.9897856745634,
        longitude: 1.22423654
      }
    };
    const wrapper = shallowMount(CheckIn, { store, localVue });
    wrapper.setData(formData);

    const method = jest.spyOn(wrapper.vm, "onCheckInTap");

    wrapper.vm.onCheckInTap();

    await expect(method).toBeCalled();
    await expect(geolocation.isEnabled).toBeCalledWith();
    await expect(dialogs.alert).toBeCalledWith({
      title: 'Error',
      message: 'Zet je locatie aan om in te klokken!',
      okButtonText: 'Ok!'
    });
    await expect(wrapper.vm.isProcessing).toBe(false);
  });
  it("Expect isProcessing to be false without selected department", async () => {
    const formData = {
      form: {
        branch: "Breda",
        branchId: 1
      }
    };
    const wrapper = shallowMount(CheckIn, { store, localVue });
    wrapper.setData(formData);

    const method = jest.spyOn(wrapper.vm, "onCheckInTap");

   wrapper.vm.onCheckInTap();

    await expect(method).toBeCalled();
    await expect(wrapper.vm.isProcessing).toBe(false);
  });

  it("Expect isProcessing to be false without longitude/latitude", async () => {
    const formData = {
      form: {
        branch: "Breda",
        branchId: 1,
        department: "Development",
        departmentId: 1,
        dateCorrectFormat: "1999-12-14",
        startTime: "12:00",
        latitude: 0.5555
      }
    };
    const wrapper = shallowMount(CheckIn, { store, localVue });
    wrapper.setData(formData);

    const method = jest.spyOn(wrapper.vm, "onCheckInTap");

    wrapper.vm.onCheckInTap();

    await expect(method).toBeCalled();
    await expect(geolocation.isEnabled).toBeCalledWith();
    await expect(wrapper.vm.isProcessing).toBe(false);
    await expect(dialogs.alert).toBeCalledWith({
      title: 'Error',
      message: 'Zet je locatie aan om in te klokken!',
      okButtonText: 'Ok!'
    });
  });

  it("Expect getAllBranchesAndDepartments to get called when component is created", async () => {
    shallowMount(CheckIn, { store, localVue });
    const spy = jest.spyOn(actions, "getAllBranchesAndDepartments");
    const commit = jest.fn();
    const state = jest.fn();
    actions.getAllBranchesAndDepartments({ state, commit });

    await expect(spy).toBeCalled();
  });

  it("Expect setBranchesWithDepartments be called", async () => {
    shallowMount(CheckIn, { store, localVue });
    const spy = jest.spyOn(mutations, "setBranchesWithDepartments");
    const items = jest.fn();
    mutations.setBranchesWithDepartments({ state, items });
    await expect(spy).toBeCalled();
  });

  it("Expect method departmentChanged to exist", async () => {
    const wrapper = shallowMount(CheckIn, { store, localVue });
    await expect(wrapper.vm.departmentChanged).toBeTruthy();
  });

  it("Expect to set wrapper vm data correctly", async () => {
    const formData = {
      form: {
        branch: "Breda",
        branchId: 1,
        department: "Development",
        departmentId: 1,
        dateCorrectFormat: "1999-12-14",
        startTime: "12:00"
      }
    };
    const wrapper = shallowMount(CheckIn, { store, localVue });
    wrapper.setData(formData);
    await expect(wrapper.vm.form.branch).toBe("Breda");
    await expect(wrapper.vm.form.branchId).toBe(1);
    await expect(wrapper.vm.form.department).toBe("Development");
    await expect(wrapper.vm.form.departmentId).toBe(1);
    await expect(wrapper.vm.form.dateCorrectFormat).toBe("1999-12-14");
    await expect(wrapper.vm.form.startTime).toBe("12:00");
  });
});
