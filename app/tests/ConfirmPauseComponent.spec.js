import { shallowMount, createLocalVue } from "@vue/test-utils";
import ConfirmPauseComp from "../components/Pause/ConfirmationPauseComponent";

describe("ConfirmPauseComponent.vue", () => {
  it("mounts and renders", async () => {
    const wrapper = shallowMount(ConfirmPauseComp);
    await expect(wrapper.html()).toBeTruthy();
  });

  it("Expect created to be called", async () => {
    const method = jest.spyOn(ConfirmPauseComp, "created");
    const wrapper = shallowMount(ConfirmPauseComp);
    wrapper.created;
    await expect(method).toBeCalled();
  });

  it("Expect emit to be called", async () => {
    const wrapper = shallowMount(ConfirmPauseComp);
    wrapper.vm.$emit("onPauseConfirmed");

    await expect(wrapper.emitted().onPauseConfirmed).toBeTruthy();
  });

  it("Expect emit in created to be called", async () => {
    const spy = jest.spyOn(ConfirmPauseComp, 'created');
    const wrapper = shallowMount(ConfirmPauseComp);

    await expect(spy).toBeCalled();
    await expect(wrapper.emitted().onPauseConfirmed)
  });
});
