<template>
  <StackLayout horizontalAlignment="center">
    <CardView class="card">
      <StackLayout class="card-body">
        <Label class="head" text=" Gewerkte uren"></Label>
          <StackLayout class="stack">
            <Label class="record" text=" Datum"></Label>
            <GridLayout columns="*, auto">
              <TextField
                v-if="hourClick.Date"
                class="textfield"
                editable="false"
                :text="convertDateToString(hourClick.Date)"
                col="0"
              />
              <label
                id="icon"
                class="fa"
                :text="'fa-calendar-alt' | fonticon"
                col="1"
              ></label>
            </GridLayout>
          </StackLayout>
          <StackLayout class="stack">
            <Label class="record" text=" Begin- en eindtijd"></Label>
            <GridLayout columns="*, auto" >
            <TextField
              v-if="hourClick.StartTime"
              class="textfield"
              editable="false"
              :text="convertedStartTime + ' - ' + convertedEndTime"
            />
            <TextField v-else class="textfield" editable="false" text="-" />
            <label
              id="icon"
              col="1"
              class="fa"
              :text="'fa-check-circle' | fonticon"
            ></label>
            </GridLayout>
          </StackLayout>
          <StackLayout class="stack">
            <Label class="record" text=" Pauze"></Label>
            <GridLayout columns="*, auto" >
            <TextField
              v-if="hourClick.Pause"
              class="textfield"
              editable="false"
              :text="hourClick.Pause"
            />
            <TextField v-else class="textfield" editable="false" text="-" />
            <label
              id="icon"
              col="1"
              class="fas"
              :text="'fa-coffee' | fonticon"
            ></label>
            </GridLayout>
          </StackLayout>
          <StackLayout class="stack">
            <Label class="record" text=" Filiaal"></Label>
            <GridLayout columns="*, auto">
            <TextField
              v-if="hourClick.BranchName"
              class="textfield"
              editable="false"
              :text="hourClick.BranchName"
            />
            <TextField v-else class="textfield" editable="false" text="-" />
            <label
              id="icon"
              col="1"
              class="fas"
              :text="'fa-building' | fonticon"
            ></label>
            </GridLayout>
          </StackLayout>
          <StackLayout class="stack">
            <Label class="record" text=" Afdeling"></Label>
            <GridLayout columns="*, auto">
            <TextField
              v-if="hourClick.DepartmentName"
              class="textfield"
              editable="false"
              :text="hourClick.DepartmentName"
            />
            <TextField v-else class="textfield" editable="false" text="-" />
            <label
              id="icon"
              col="1"
              class="fas"
              :text="'fa-sitemap' | fonticon"
            ></label>
            </GridLayout>
          </StackLayout>
      </StackLayout>
    </CardView>

    <Button class="backBtn" @tap="onTap">Terug</Button>
  </StackLayout>
</template>

<script>
import dates from "../../constants/dates";

export default {
  props: ["hourClick"],
  methods: {
    convertDateToString: date => {
      const d = new Date(date);
      return `${dates.days[d.getDay()]} ${d.getDate()} ${
        dates.months[d.getMonth()]
      } ${d.getFullYear()}`;
    },
    onTap() {
      console.log("Terug knop aangeklikt");
      this.$emit("backClicked", "true");
    }
  },
  computed: {
    convertedStartTime: function() {
      return this.hourClick.StartTime.substring(0, 5);
    },
    convertedEndTime: function() {
      if (!this.hourClick.EndTime) {
        return "Nog niet uitgeklokt";
      }

      return this.hourClick.EndTime.substring(0, 5);
    }
  }
};
</script>

<style scoped>

.backBtn {
    padding: 20;
  width: 91%;
  background-color: #dddddd;
  color: #b3676a6c;
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

.head {
  font-size: 24px;
  text-align: left;
  margin: 10px;
  margin-bottom: 20px;
  color: #676a6c;
}

.record {
  color: #dddddd;
}

.card-body {
  width: 95%;
  text-align: left;
}
.stack {
  margin-bottom: 30px;
  width: 95%;
  border-width: 0 0 1 0;
  border-color: #b3676a6c;
}

GridLayout {
    height: 25dip
}

TextField {
  border-width: 0 0 0 0;
  background-color: transparent;
  border-color: transparent;
  /* color: #676A6C; */
  padding-bottom: 5;
  padding: 0px;
  padding-top: 0;
  font-size: 16px;
}
.card {
  text-align: center;
  background-color: #fff;
  color: #676a6c;
  width: 90%;
  padding: 20px;
  margin: 20px 10px;
}
</style>
