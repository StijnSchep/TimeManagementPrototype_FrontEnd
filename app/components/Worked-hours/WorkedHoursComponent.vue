<template>
  <card-view class="hourCard" elevation="10" radius="5" @tap="onTap">
    <FlexBoxLayout style="padding: 10 10;">
      <StackLayout orientation="vertical" width="90%">
        <StackLayout orientation="horizontal" class="cardLine">
          <label id="icon1" col="1" class="fa" :text="'fa-calendar-alt' | fonticon"></label>
          <label id="date" col="2" :text="convertDateToString(hour.Date)"></label>
        </StackLayout>
        <StackLayout orientation="horizontal" class="cardLine">
          <label id="icon1" col="1" class="fa" :text="'fa-check-circle' | fonticon"></label>
          <label id="workedHours" col="2" :text="convertedStartTime + ' - ' + convertedEndTime"></label>
        </StackLayout>
        <StackLayout orientation="horizontal" class="cardLine">
          <label id="icon" col="1" class="fas" :text="'fa-coffee' | fonticon"></label>
          <label id="pause" col="2" :text="hour.Pause"></label>
        </StackLayout>
        <StackLayout orientation="horizontal" class="cardLine">
          <label id="icon1" col="1" class="fas" :text="'fa-equals' | fonticon"></label>
          <label v-if="hour.Worked != null" id="worked" col="2" :text="hour.Worked"></label>
          <label v-else id="worked" col="2" text="nog niet uitgeklokt"></label>
        </StackLayout>
        <!-- <StackLayout orientation="horizontal" class="cardLine">
          <label id="icon" col="1" class="fas" :text="'fa-building' | fonticon"></label>
          <label id="branchName" col="2" :text="hour.BranchName"></label>
        </StackLayout>
        <StackLayout orientation="horizontal" class="cardLine">
          <label id="icon" col="1" class="fas" :text="'fa-sitemap' | fonticon"></label>
          <label id="departmentName" col="2" :text="hour.DepartmentName"></label>
        </StackLayout>-->
      </StackLayout>
      <FlexBoxLayout
        flexDirection="column-reverse"
        justifyContent="space-around"
        width="10%"
        style="margin-right: 5px;"
      >
        <Label alignSelf="flex-end" class="fas right-angle" :text="'fa-angle-right' | fonticon"></Label>
      </FlexBoxLayout>
    </FlexBoxLayout>
  </card-view>
</template>


<script>
import dates from "../../constants/dates";

export default {
  props: ["hour"],
  data() {
    return {};
  },
  methods: {
    convertDateToString: date => {
      const d = new Date(date);
      return `${dates.days[d.getDay()]} ${d.getDate()} ${
        dates.months[d.getMonth()]
      } ${d.getFullYear()}`;
    },
    onTap() {
      console.log("Details aangeklikt")
      this.$emit('detailsClicked', this.hour);
    }
  },
  computed: {
    convertedStartTime: function() {
      return this.hour.StartTime.substring(0, 5);
    },
    convertedEndTime: function() {
      if (!this.hour.EndTime) {
        return "Nog niet uitgeklokt";
      }

      return this.hour.EndTime.substring(0, 5);
    }
  }
};
</script>


<style scoped>
.hourCard {
  font-size: 15px;
  height: auto;
  background-color: #fff;
  color: #676a6c;
  width: 90%;
  margin: 5 10;
  padding: 20 10;
}

.hourCard #icon {
  color: #dddddd;
  margin-top: 3dip;
  font-size: 15dip;
}
.hourCard #icon1 {
  color: #dddddd;
  margin-top: 3dip;
  font-size: 15dip;
  margin-left: 1dip;
}

#date {
  padding-left: 20px;
}

#workedHours {
  padding-left: 17.5px;
}

#departmentName {
  padding-left: 15px;
}

#branchName {
  padding-left: 23px;
}

#pause {
  padding-left: 13fpx;
}
#worked {
  padding-left: 22.5px;
}

.cardLine {
  margin: 5 5;
}
.right-angle {
  color: #00a0d1;
  font-size: 35px;
  float: right;
}
</style>
