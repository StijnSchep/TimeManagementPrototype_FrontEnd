import { shallowMount, createLocalVue } from '@vue/test-utils';
import Dashboard from '../components/dashboard/Dashboard';
import Vuex from 'vuex'
import WelcomeScreen from "../components/login/WelcomeScreen";
import { getString } from 'tns-core-modules/application-settings';

jest.mock('tns-core-modules/application-settings', () => ({
  getString: jest.fn(() => "")
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

const localVue = createLocalVue();
localVue.use(Vuex)

describe('Dashboard.vue', () => {
  let store;
  let state;
  let actions;

  beforeEach(() => {
    state = {
      token: ''
    };
    actions = {
      getToken: jest.fn()
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

  // jest.mock('nativescript-drop-drown');



  it('mounts and renders', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.html()).toBeTruthy();
  });

  test('renders correctly', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.element).toMatchSnapshot();
  });

  it('is a Vue instance', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('Expect component to exist', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper).toBeTruthy();
  });

  it('Expect component to have Page element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('Page')).toBeTruthy();
  });

  it('Expect component to have StackLayout element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('StackLayout')).toBeTruthy();
  });

  it('Expect component to have template element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('template')).toBeTruthy();
  });

  it('Expect component to have script element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('script')).toBeTruthy();
  });

  it('Expect component to have style element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('style')).toBeTruthy();
  });

  it('Expect component to have Label element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('Label')).toBeTruthy();
  });

  it('Expect component to have BottomNavigation element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('BottomNavigation')).toBeTruthy();
  });

  it('Expect component to have TabStrip element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('TabStrip')).toBeTruthy();
  });

  it('Expect component to have TabStripItem element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('TabStripItem')).toBeTruthy();
  });

  it('Expect component to have TabContentItem element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('TabContentItem')).toBeTruthy();
  });

  it('Expect component to have Frame element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('Frame')).toBeTruthy();
  });

  it('Expect component to have HomeComponent element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('HomeComponent')).toBeTruthy();
  });

  it('Expect component to have HoursComponent element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('HoursComponent')).toBeTruthy();
  });

  it('Expect component to have CalendarComponent element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('CalendarComponent')).toBeTruthy();
  });

  it('Expect component to have AccountComponent element', async () => {
    const wrapper = shallowMount(Dashboard, { store, localVue });
    await expect(wrapper.find('AccountComponent')).toBeTruthy();
  });
});
