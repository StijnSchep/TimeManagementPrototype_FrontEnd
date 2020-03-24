<template>
  <Page xmlns:Card="@nstudio/nativescript-cardview">
    <ActionBar>
      <Label text="Home"></Label>
    </ActionBar>

        <StackLayout horizontalAlignment="center">
      <DetailsComponent
                    v-if="detailsClickedBool"
                    v-bind:key="hourClick"
                    :hourClick="hourClick"
                    @backClicked="onClickBack"
    />

      <ScrollView v-bind:class="{ isInvisible: detailsClickedBool }">
        <StackLayout horizontalAlignment="center">
          <Label class="head" text=" Uren"></Label>
          <WorkedHoursComponent
            v-for="hour of hours"
            v-bind:key="hour"
            :hour="hour"
            @detailsClicked="onClickDetails"
          />
        </StackLayout>
      </ScrollView>
          </StackLayout>

  </Page>
</template>

<script>
import WorkedHoursComponent from '../Worked-hours/WorkedHoursComponent';
import DetailsComponent from "../Details/DetailsComponent";
import * as application from "tns-core-modules/application";

export default {
    components: {
    WorkedHoursComponent,
    DetailsComponent
  },
  props: ["token"],
  data: () => {
    return {
      message: 'Dit is de Home pagina',
      hours: [],
        hourClick: {},
        detailsClickedBool: false
    };
  },
      methods: {
    onClickDetails (value) {
      console.log(value);
      this.hourClick = value;
      this.detailsClickedBool = true;
    },
    onClickBack (value) {
      console.log(value);
      this.detailsClickedBool = false;
    }
  },
  mounted() {
    this.hours = this.workedHours.slice(0, 5);
  },
  computed: {
    workedHours() {
      return this.$store.state.checkIn.workedHours;
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "checkIn/setWorkedHours") {
        this.hours = state.checkIn.workedHours.slice(0, 5);
      }
    });
  }
};

if ( application.android ) {
  application.android.on(
          application.AndroidApplication.activityBackPressedEvent,
          (args) => {
            args.cancel = true;
          }
  );
}
</script>

<style scoped>
ActionBar {
  background-color: #34444e;
  color: #ffffff;
  font-size: 20px;
}

.head {
  font-size: 24px;
  text-align: left;
  margin: 10px;
  margin-bottom: 5px;
  color: #676a6c;
}

  .isInvisible {
    visibility: hidden;
  }
</style>
