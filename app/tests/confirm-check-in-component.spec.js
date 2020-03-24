import { shallowMount, createLocalVue } from '@vue/test-utils';
import ConfirmCheckIn from '../components/Check-in/ConfirmationCheckInComponent';
import Vuex from "vuex";
import CheckIn from "../components/Check-in/CheckInComponent";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("tns-core-modules/ui/dialogs", () => ({
  alert: jest.fn(() => Promise.resolve())
}));

describe('ConfirmCheckInComponent.vue', () => {
  let store;
  let state;
  let actions;

  beforeEach(() => {
    state = {
      workedHours: [],
      branchId: null,
      departmentId: null
    };
    actions = {
      getBranchIdAndDepartmentId: jest.fn(),
      getAllBranchesAndDepartments: jest.fn((c, d) => Promise.resolve({ data: {} })),
      postCheckIn: jest.fn((c, d) => Promise.resolve({ data: {} })),
      fetchAllWorkedHours: jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        checkIn: {
          state,
          actions
        }
      }
    });
  });
  
  
  it('mounts and renders', async () => {
    const wrapper = shallowMount(ConfirmCheckIn, { store, localVue });
    await expect(wrapper.html()).toBeTruthy();
  });

  it('renders correctly', async () => {
    const wrapper = shallowMount(ConfirmCheckIn, { store, localVue });
    await expect(wrapper.element).toMatchSnapshot();
  });

  it('is a Vue instance', async () => {
    const wrapper = shallowMount(ConfirmCheckIn, { store, localVue });
    await expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('Expect component to exist', async () => {
    const wrapper = shallowMount(ConfirmCheckIn, { store, localVue });
    await expect(wrapper).toBeTruthy();
  });

  it('Expect component to have Page element', async () => {
    const wrapper = shallowMount(ConfirmCheckIn, { store, localVue });
    await expect(wrapper.find('Page')).toBeTruthy();
  });

  it('Expect component to have StackLayout element', async () => {
    const wrapper = shallowMount(ConfirmCheckIn, { store, localVue });
    await expect(wrapper.find('StackLayout')).toBeTruthy();
  });

  it('Expect component to have template element', async () => {
    const wrapper = shallowMount(ConfirmCheckIn, { store, localVue });
    await expect(wrapper.find('template')).toBeTruthy();
  });

  it('Expect component to have script element', async () => {
    const wrapper = shallowMount(ConfirmCheckIn, { store, localVue });
    await expect(wrapper.find('script')).toBeTruthy();
  });

  it('Expect component to have style element', async () => {
    const wrapper = shallowMount(ConfirmCheckIn, { store, localVue });
    await expect(wrapper.find('style')).toBeTruthy();
  });

  it('Expect component to have Label element', async () => {
    const wrapper = shallowMount(ConfirmCheckIn, { store, localVue });
    await expect(wrapper.find('Label')).toBeTruthy();
  });

  it('Expect component to have HoursPage Component', async () => {
    const wrapper = shallowMount(ConfirmCheckIn, { store, localVue });
    await expect(wrapper.find('HoursPage')).toBeTruthy();
  });

  it('Expect component to have props array property', async () => {
    const wrapper = shallowMount(ConfirmCheckIn, { store, localVue });
    await expect(typeof wrapper.props).toBe('function')
  });
});
