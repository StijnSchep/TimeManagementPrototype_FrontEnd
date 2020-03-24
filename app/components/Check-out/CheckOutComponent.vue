<template>
  <ScrollView>
    <StackLayout>
      <card-view class="card" elevation="10" radius="5">
        <GridLayout rows="auto, auto, auto, auto" class="form">
          <StackLayout row="1">
            <Image
              v-if="employee.Photo && employee.Photo.data"
              stretch="fill"
              class="image"
              :src="photo()"
            />
            <label class="welcomeText" :text="screenText" />
          </StackLayout>
          <StackLayout row="2">
            <Button col="1" class="checkOutBtn" @tap="onCheckOutTap">Uitklokken</Button>
          </StackLayout>
          <StackLayout class="buttons" orientation="horizontal" row="3">
            <Button v-on:tap="goToPauseScreen" col="1" class="breakBtn">Pauze</Button>
            <Button :isEnabled="false" col="1" class="changeBtn">Wisselen</Button>
          </StackLayout>
        </GridLayout>
      </card-view>
    </StackLayout>
  </ScrollView>
</template>

<script>
import { Accuracy } from "tns-core-modules/ui/enums";
import * as geolocation from "nativescript-geolocation";
import { getString } from "tns-core-modules/application-settings";
import * as dialogs from "tns-core-modules/ui/dialogs";
const test = require("base64-arraybuffer");

export default {
  props: ["token", "branchId", "departmentId", "isPausedIn"],
  data() {
    return {
      form: {
        fetchedLatitude: "",
        fetchedLongitude: ""
      },
      employee: {},
      count: 0,
      checkOutStatus: 0,
      endTime: null
    };
  },
  computed: {
    screenText: function() {
      return `Goedemiddag ${this.employee.Nickname}!`
    }
  },
  methods: {
    goToPauseScreen() {
      if (this.isPausedIn) {
        this.$emit("onPauseTap", true);
      } else {
        this.$emit("onPauseTap", false);
      }
    },
    photo() {
      var photo =
        "data:image/jpg;base64," + test.encode(this.employee.Photo.data);
      return photo;
    },
    getEmployee() {
      return (this.employee = this.$store.state.account.employee);
    },
    getLocation() {
      geolocation
        .getCurrentLocation({
          desiredAccuracy: Accuracy.high,
          maximumAge: 5000,
          timeout: 20000
        })
        .then(res => {
          this.form.fetchedLatitude = res.latitude;
          this.form.fetchedLongitude = res.longitude;
        })
        .catch(err => {
          dialogs.alert({
            title: "Error",
            message: err.message,
            okButtonText: "Ok!"
          });
        });
    },
    onCheckOutTap() {
      const date = new Date(Date.now());
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      this.endTime = date.getHours() + ":" + minutes;

      if (this.isPausedIn) {
        this.$store.dispatch("pause/addEndPause", this.endTime);
      }

      if (this.form.fetchedLatitude == "" || this.form.fetchedLongitude == "") {
        console.log("--------------------------- INVALID LATITUDE/LONGITUDE");

        dialogs.alert({
          title: "Error",
          message: "Zet je locatie aan om uit te klokken!",
          okButtonText: "Ok!"
        });
        return;
      }

      const checkInData = JSON.parse(getString("checkIn"));

      const checkOutData = {
        endTime: this.endTime,
        branchId: checkInData.branchId,
        departmentId: checkInData.departmentId,
        latitude: this.form.fetchedLatitude,
        longitude: this.form.fetchedLongitude,
        pause: checkInData.pause
      };

      this.$store.dispatch("checkIn/updateWorkedHours", {
        data: checkOutData,
        token: this.token
      });
    }
  },
  created() {
    this.getLocation();
    this.getEmployee();
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "checkIn/setCheckOutStatus") {
        this.checkOutStatus = state.checkIn.checkOutStatus;
      }
    });
  },
  watch: {
    checkOutStatus: function(val, oldVal) {
      if (this.checkOutStatus === 200) {
        this.$emit("onCheckedOut", this.endTime);
      } else if (this.checkOutStatus === 400) {
        dialogs.alert({
          title: "Error",
          message: "Ben je wel op de juiste locatie?",
          okButtonText: "Ok!"
        });
      } else {
        dialogs.alert({
          title: "Error",
          message: "Iets is er misgegaan met je request",
          okButtonText: "Ok!"
        });
      }
    }
  }
};
</script>

<style scoped>
.image {
  color: #dddddd;
  text-align: center;
  border-radius: 200%;
  height: 270dip;
  width: 270dip;
  margin: 20dip;
}

.welcomeText {
  text-align: center;
  font-size: 20dip;
  color: #676a6c;
  padding: 15 0;
}

.card {
  margin-top: 25dip;
  width: 90%;
  margin-bottom: 30dip;
}

label {
  color: #dddddd;
}

button {
  padding: 20;
}

.buttons {
  padding: 20;
}

button.checkOutBtn {
  border-radius: 10;
  width: 90%;
  background-color: #00a0d1;
  color: white;
}

button.breakBtn {
  width: 45%;
  background-color: #dddddd;
  color: #b3676a6c;
}

button.changeBtn {
  width: 45%;
  background-color: #dddddd;
  color: #b3676a6c;
}
</style>
