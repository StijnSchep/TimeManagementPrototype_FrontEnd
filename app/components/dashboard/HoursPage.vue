<template>
  <Page
    xmlns:Card="@nstudio/nativescript-cardview"
    xmlns:dd="nativescript-drop-down"
  >
    <ActionBar>
      <Label text="Klokken"></Label>
    </ActionBar>
    <CheckInComponent
      :token="token"
      v-if="!isCheckedIn"
      v-on:onCheckedIn="onCheckedIn"
    />
    <ConfirmCheckInComponent
      v-else-if="!checkInIsConfirmed"
      :time="startTime"
      :token="token"
      v-on:onCheckInIsConfirmed="onCheckInIsConfirmed"
    />
    <CheckOutComponent
      :token="token"
      :branch-id="branchId"
      :department-id="departmentId"
      :isPausedIn="isPause"
      v-else-if="checkInIsConfirmed && !isCheckedOut && !isOnPauseTapped"
      v-on:onCheckedOut="onCheckedOut"
      v-on:onPauseTap="onPauseTap"
    />
    <ConfirmCheckOutComponent
      v-else-if="isCheckedOut"
      :end-time="endTime"
      :token="token"
      v-on:onCheckOutIsConfirmed="onCheckOutIsConfirmed"
    />

    <ConfirmPauseComponent
      v-else-if="checkInIsConfirmed && !isCheckedOut && isOnPauseTapped"
      v-on:onPauseConfirmed="onPauseConfirmed"
      :msg="pauseMsg"
    />
  </Page>
</template>

<script>
import CheckInComponent from "../Check-in/CheckInComponent";
import CheckOutComponent from "../Check-out/CheckOutComponent";
import ConfirmCheckInComponent from "../Check-in/ConfirmationCheckInComponent";
import ConfirmCheckOutComponent from "../Check-out/ConfirmationCheckOutComponent";
import ConfirmPauseComponent from "../Pause/ConfirmationPauseComponent";
import { getString, setString } from 'tns-core-modules/application-settings';

export default {
  components: {
    CheckInComponent,
    CheckOutComponent,
    ConfirmCheckInComponent,
    ConfirmCheckOutComponent,
    ConfirmPauseComponent
  },
  props: ["token"],
  data() {
    return {
      isCheckedIn: false,
      isCheckedOut: false,
      startTime: "",
      hours: "",
      checkInIsConfirmed: false,
      branchId: null,
      departmentId: null,
      endTime: "",
      isOnPauseTapped: false,
      time: null,
      pauseMsg: "",
      isPause: false
    };
  },
  methods: {
    onCheckedIn(data) {
      this.isCheckedIn = true;
      this.startTime = data.startTime;
      this.branchId = data.branchId;
      this.departmentId = data.departmentId;
    },
    onCheckedOut(endTime) {
      this.isCheckedOut = true;
      this.endTime = endTime;
    },
    onCheckInIsConfirmed() {
      this.checkInIsConfirmed = true;
    },
    onCheckOutIsConfirmed() {
      this.isCheckedOut = false;
      this.hours = "";
      this.startTime = "";
      this.isCheckedIn = false;
      this.checkInIsConfirmed = false;

      setString('pause', '');
      setString('checkIn', '');
      this.$store.dispatch('checkIn/clearState');
      this.$store.dispatch('pause/clearState');
    },
    onPauseTap(isPausedIn) {
      let d = new Date(Date.now());
      let minutes = d.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      this.isOnPauseTapped = true;
      this.time = d.getHours() + ":" + minutes;
      if (isPausedIn) {
        this.$store.dispatch("pause/addEndPause", this.time);
        this.pauseMsg = `Je pauze is om ${this.time} afgelopen`;
        this.isPause = false;
      } else {
        this.$store.dispatch("pause/addStartPause", this.time);
        this.pauseMsg = `Je pauze is om ${this.time} begonnen`;
        this.isPause = true;
      }
    },
    onPauseConfirmed() {
      this.isOnPauseTapped = false;
    }
  },
  mounted() {
    if ( getString('checkIn') && getString('checkIn') !== '' ) {
       const checkInData = JSON.parse(getString('checkIn'));
       this.branchId = checkInData.branchId;
       this.departmentId = checkInData.departmentId;
       this.checkInIsConfirmed = true;
       this.isCheckedIn = true;

       if ( getString('pause') && getString('pause') !== '') {
         this.isPause = true;
       }
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #34444e;
  color: #ffffff;
  font-size: 20px;
}
</style>
