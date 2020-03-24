import { shallowMount, mount } from '@vue/test-utils';
import WelcomeScreen from '../components/login/WelcomeScreen';


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


const wrapper = shallowMount(WelcomeScreen, {
  propsData: {
    employee: Object,
    token: String
  }
});

describe('WelcomeScreen.vue', () => {
  it('mounts and renders', async () => {
    await expect(wrapper.html()).toBeTruthy();
  });

  test('renders correctly', async () => {
    await expect(wrapper.element).toMatchSnapshot();
  });

  it('is a Vue instance', async () => {
    await expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('Expect component to exist', async () => {
    await expect(wrapper).toBeTruthy();
  });

  it('Expect component to have Page element', async () => {
    await expect(wrapper.find('Page')).toBeTruthy();
  });

  it('Expect component to have GridLayout element', async () => {
    await expect(wrapper.find('GridLayout')).toBeTruthy();
  });

  it('Expect component to have Label element', async () => {
    await expect(wrapper.find('Label')).toBeTruthy();
  });

  it('Expect component to have data property', async () => {
    await expect(typeof WelcomeScreen.data).toBe('function')
    const defaultData = WelcomeScreen.data()
    await expect(defaultData.busy).toBe(true)
  });

  it('Expect component to have methods property which is an object', async () => {
    await expect(typeof WelcomeScreen.methods).toBe('object');
  });

  it('Expect methods object to have onBusyChanged', async () => {
    await expect(typeof WelcomeScreen.methods.onBusyChanged).toBe('function');
  });

  it('Expect methods object to have goToDashboard function', async () => {
    await expect(typeof WelcomeScreen.methods.goToDashboard).toBe('function');
  });

  it('Expect methods object to have sleep fucntion', async () => {
    await expect(typeof WelcomeScreen.methods.sleep).toBe('function');
  });

  it('Expect created() lifecylce hook', async () => {
    await expect(typeof WelcomeScreen.created).toBe('function');
  });
});


