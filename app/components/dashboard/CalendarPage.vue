<template>
  <Page>
    <ActionBar>
      <Label text="Kalender"></Label>
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
  import WorkedHoursComponent from "../Worked-hours/WorkedHoursComponent";
  import DetailsComponent from "../Details/DetailsComponent";


  export default {
    components: {
      WorkedHoursComponent,
      DetailsComponent
    },
    props: ["token"],
    data: () => {
      return {
        message: "Dit is de Kalender pagina",
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
      this.hours = this.workedHours;
    },
    computed: {
      workedHours() {
        return this.$store.state.checkIn.workedHours;
      }
    },
    created() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'checkIn/setWorkedHours') {
          this.hours = state.checkIn.workedHours;
        }
      });
    }
  };
</script>

<style scoped>
  ActionBar {
    background-color: #34444e;
    color: #ffffff;
    font-size: 20px;
  }

  .isInvisible {
    visibility: hidden;
  }

</style>
