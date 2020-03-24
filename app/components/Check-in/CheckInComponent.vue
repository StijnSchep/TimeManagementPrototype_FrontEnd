<template>
  <ScrollView>
    <StackLayout>
      <card-view
        class="card"
        elevation="10"
        radius="5"
        v-bind:class="{ fadeBackground: isProcessing }"
      >
        <GridLayout rows="auto" class="container">
          <StackLayout
            row="0"
            class="form"
            v-bind:class="{ fadeBackground: isProcessing }"
          >
            <Label text="* Filiaal" v-bind:class="{ isFaded: isProcessing }" />
            <GridLayout
              class="gridTextfield"
              columns="*, auto"
              v-bind:class="{ isFaded: isProcessing }"
            >
              <DropDown
                hint="Filiaalnaam"
                returnKeyType="next"
                col="0"
                itemsPadding="15px"
                :items="branchSource"
                :selectedIndex="branchIndex"
                v-on:selectedIndexChanged="branchChanged"
                v-model="form.branch"
              />
              <Label col="1" class="fas" :text="'fa-building' | fonticon" />
            </GridLayout>

            <Label text="* Afdeling" v-bind:class="{ isFaded: isProcessing }" />
            <GridLayout
              class="gridTextfield"
              columns="*, auto"
              v-bind:class="{ isFaded: isProcessing }"
            >
              <DropDown
                hint="Afdelingnaam"
                returnKeyType="next"
                col="0"
                :items="departmentSource"
                :selectedIndex="departmentIndex"
                itemsPadding="15px"
                v-on:selectedIndexChanged="departmentChanged"
                v-model="form.department"
              />
              <Label col="1" class="fas" :text="'fa-sitemap' | fonticon" />
            </GridLayout>

            <StackLayout
              class="buttons"
              orientation="horizontal"
              v-bind:class="{ isFaded: isProcessing }"
            >
              <Button v-on:tap="onReset" class="cancelBtn">Annuleren</Button>
              <Button v-on:tap="onCheckInTap" class="checkInBtn"
                >Inklokken</Button
              >
            </StackLayout>
          </StackLayout>
          <ActivityIndicator
            row="0"
            v-bind:busy="isProcessing"
          ></ActivityIndicator>
        </GridLayout>
      </card-view>
    </StackLayout>
  </ScrollView>
</template>

<script>
import { ValueList } from "nativescript-drop-down";
import { Accuracy } from "tns-core-modules/ui/enums";
import * as geolocation from "nativescript-geolocation";
import * as dialogs from "tns-core-modules/ui/dialogs";

export default {
  props: ["token"],
  data() {
    return {
      branches: [],
      branchDepartments: [],
      selectedDepartments: [],
      departmentSource: null,
      branchSource: null,
      isProcessing: false,
      form: {
        branch: null,
        branchId: null,
        department: null,
        departmentId: null,
        dateCorrectFormat: null,
        startTime: null,
        latitude: null,
        longitude: null
      },
      isCheckedIn: false,
      postCheckInStatus: 0,
      checked: false,
      branchIndex: null,
      departmentIndex: null
    };
  },
  methods: {
    branchChanged(args) {
      this.selectedDepartments = [];
      if (args.newIndex != null) {
        this.branchDepartments[args.newIndex].forEach(item => {
          this.selectedDepartments.push({
            value: item.DepartmentId,
            display: item.DepartmentName
          });
        });
      }
      this.departmentSource = new ValueList(this.selectedDepartments);
      this.branchIndex = args.newIndex;
      if (args.newIndex != null) {
        this.form.branch = this.branches[args.newIndex].display;
        this.form.branchId = this.branches[args.newIndex].value;
      }
    },
    departmentChanged(args) {
      if (args.newIndex != null) {
        this.departmentIndex = args.newIndex;
        this.form.department = this.selectedDepartments[args.newIndex].display;
        this.form.departmentId = this.selectedDepartments[args.newIndex].value;
      }
    },
    onReset() {
      this.checked = false;
      this.branchIndex = null;
      this.departmentIndex = null;
    },
    onCheckInTap() {
      this.isProcessing = true;
      const date = new Date(Date.now());
      const dateCorrectFormat = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      const startTime = date.getHours() + ":" + minutes;
      this.form.dateCorrectFormat = dateCorrectFormat;
      this.form.startTime = startTime;

      if (!this.form.branch || !this.form.branchId) {
        dialogs.alert({
          title: 'Error',
          message: 'Selecteer uw filiaal!',
          okButtonText: 'Ok!'
        });
        this.isProcessing = false;
        return;
      }

      if (!this.form.department || !this.form.departmentId) {
          dialogs.alert({
            title: 'Error',
            message: 'Selecteer uw afdeling!',
            okButtonText: 'Ok!'
          });
          this.isProcessing = false;
          return;
      }

      geolocation.isEnabled().then(isEnabled => {
        if(isEnabled) {
          geolocation
          .getCurrentLocation({
                desiredAccuracy: Accuracy.high,
                maximumAge: 5000,
                timeout: 20000
          })
          .then(res => {
              this.form.latitude = res.latitude;
              this.form.longitude = res.longitude;

              if (!this.form.longitude || !this.form.latitude) {
                dialogs.alert({
                  title: 'Error',
                  message: 'Zet je locatie aan om in te klokken!',
                  okButtonText: 'Ok!'
                });
                this.isProcessing = false;
                return;
              }

              this.$store.dispatch("checkIn/postCheckIn", {
                form: this.form,
                token: this.token
              });

              this.isProcessing = false;
          })
          .catch(err => {
              dialogs.alert({
                title: 'Error',
                message: err.message,
                okButtonText: 'Ok!'
              });
              this.isProcessing = false;
          });
        } else {
          this.isProcessing = false;
          geolocation.enableLocationRequest();
        }
      })
    }
    // onLocationChanged(event) {
    //   let sw = event.object;
    //   let isChecked = sw.checked;
    //   if (isChecked) {
    //     geolocation.enableLocationRequest();
    //     geolocation
    //       .getCurrentLocation({
    //         desiredAccuracy: Accuracy.high,
    //         maximumAge: 5000,
    //         timeout: 20000
    //       })
    //       .then(res => {
    //         this.form.latitude = res.latitude;
    //         this.form.longitude = res.longitude;
    //       })
    //       .catch(err => {
    //         // Toast.makeText(err.message).show();
    //       });
    //   } else {
    //     this.form.latitude = null;
    //     this.form.longitude = null;
    //   }
    // }
  },
  created() {
    this.$store.dispatch("checkIn/getAllBranchesAndDepartments", this.token);

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "checkIn/setBranchesWithDepartments") {
        const res = state.checkIn.allBranchesWithDepartments;
        res.forEach(item => {
          this.branches.push({
            value: item.BranchId,
            display: item.BranchName
          });
          this.branchSource = new ValueList(this.branches);
          var departments = JSON.parse(item.Departments);
          var departmentArray = [];
          departments.forEach(department => {
            departmentArray.push(department);
          });
          this.branchDepartments.push(departmentArray);
        });
      }

      if (mutation.type === "checkIn/setPostCheckInStatus") {
        this.postCheckInStatus = state.checkIn.postCheckInStatus;
      }
    });
  },
  watch: {
    postCheckInStatus: function(val, oldVal) {
      if (this.postCheckInStatus === 200) {
        this.$emit("onCheckedIn", {
          startTime: this.form.startTime,
          branchId: this.form.branchId,
          departmentId: this.form.departmentId
        });
        this.isProcessing = false;
      } else if (this.postCheckInStatus === 400) {
        this.isProcessing = false;
      }
    }
  }
};
</script>

<style scoped>
ActivityIndicator {
  width: 100px;
  color: #00a0d1;
}

.card {
  margin-top: 25px;
  width: 90%;
  padding-bottom: 0;
  margin-bottom: 0;
}

DropDown {
  border-radius: 25%;
  background-color: transparent;
}

.form {
  background-color: white;
  border-radius: 10px;
  padding: 40px;
  padding-bottom: 0;
  margin-bottom: 0;
}

.isFaded {
  opacity: 0.75;
}

.fadeBackground {
  background-color: #bfffffff;
}

GridLayout.gridTextfield {
  border-width: 0 0 1 0;
  border-color: #b3676a6c;
  padding-top: 5;
}

label {
  color: #dddddd;
  font-size: 13px;
  padding-top: 10dip;
}

.fa,
.fas,
.fal,
.far {
  color: #676a6c;
  font-size: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
}

TextField {
  background-color: transparent;
  border-color: transparent;
  color: #676a6c;
  padding-left: 0;
  padding-top: 0;
  font-size: 16px;
}

.buttons {
  padding-top: 20;
  margin: 0;
  padding-bottom: 0;
  margin-bottom: 10dip;
}

button.checkInBtn {
  width: 50%;
  background-color: #00a0d1;
  color: white;
  margin-bottom: 0;
}

button.cancelBtn {
  width: 50%;
  background-color: #dddddd;
  color: #b3676a6c;
  margin-bottom: 0;
}
</style>
