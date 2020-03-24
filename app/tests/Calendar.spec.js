import {shallowMount, mount, createLocalVue} from '@vue/test-utils';
import Calendar from '../components/dashboard/CalendarPage';
import Vuex from "vuex";
import Home from "../components/dashboard/HomePage";

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

describe('CalendarPage.vue', () => {
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
    const wrapper = shallowMount(Calendar, { store, localVue });
    await expect(wrapper.html()).toBeTruthy();
  });

  test('renders correctly', async () => {
    const wrapper = shallowMount(Calendar, { store, localVue });
    await expect(wrapper.element).toMatchSnapshot();
  });

  it('is a Vue instance', async () => {
    const wrapper = shallowMount(Calendar, { store, localVue });
    await expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('Expect component to exist', async () => {
    const wrapper = shallowMount(Calendar, { store, localVue });
    await expect(wrapper).toBeTruthy();
  });

  it('Expect component to have Page element', async () => {
    const wrapper = shallowMount(Calendar, { store, localVue });
    await expect(wrapper.find('Page')).toBeTruthy();
  });

  it('Expect component to have GridLayout element', async () => {
    const wrapper = shallowMount(Calendar, { store, localVue });
    await expect(wrapper.find('GridLayout')).toBeTruthy();
  });

  it('Expect component to have Label element', async () => {
    const wrapper = shallowMount(Calendar, { store, localVue });
    await expect(wrapper.find('Label')).toBeTruthy();
  });

  it('Expect component to have 1 Label elements', async () => {
    const wrapper = shallowMount(Calendar, { store, localVue });
    await expect(wrapper.findAll('Label').length).toBe(1);
  });

  
});
