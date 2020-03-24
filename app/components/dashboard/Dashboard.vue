<template>
  <Page actionBarHidden="true">
    <BottomNavigation>
      <TabStrip style="border-top: 1px solid black;">
        <TabStripItem>
          <Label col="1" class="fas" :text="'fa-home' | fonticon" />
        </TabStripItem>
        <TabStripItem>
          <Label col="1" class="fa" :text="'fa-clock' | fonticon" />
        </TabStripItem>
        <TabStripItem>
          <Label col="1" class="fa" :text="'fa-calendar-alt' | fonticon" />
        </TabStripItem>
        <TabStripItem>
          <Label col="1" class="fas" :text="'fa-user-circle' | fonticon" />
        </TabStripItem>
        <TabStripItem>
          <Label col="1" class="fas" :text="'fa-cog' | fonticon" />
        </TabStripItem>
      </TabStrip>

      <TabContentItem>
        <Frame>
          <HomeComponent :token="token" />
        </Frame>
      </TabContentItem>

      <TabContentItem>
        <Frame>
          <HoursComponent :token="token" />
        </Frame>
      </TabContentItem>

      <TabContentItem>
        <Frame>
          <CalendarComponent :token="token" />
        </Frame>
      </TabContentItem>

      <TabContentItem>
        <Frame>
          <AccountComponent :token="token" />
        </Frame>
      </TabContentItem>

      <TabContentItem>
        <Frame>
          <SettingComponent :token="token" />
        </Frame>
      </TabContentItem>
    </BottomNavigation>
  </Page>
</template>

<script>
import AccountComponent from "./AccountPage";
import CalendarComponent from "./CalendarPage";
import HoursComponent from "./HoursPage";
import HomeComponent from "./HomePage";
import SettingComponent from "./SettingPage";
import * as application from "tns-core-modules/application";

export default {
  components: {
    HomeComponent,
    HoursComponent,
    CalendarComponent,
    AccountComponent,
    SettingComponent
  },
  created() {
    this.$store.dispatch("checkIn/fetchAllWorkedHours", this.token);
  },
  computed: {
    token() {
      return this.$store.state.auth.token;
    }
  }
};

if ( application.android ) {
  application.android.on(
          application.AndroidApplication.activityBackPressedEvent,
          args => {
            args.cancel = true;
          }
  );
}
</script>

<style scoped>
TabStripItem {
  font-size: 25px;
  color: #dddddd;
}
TabStripItem:active {
  color: #00a0d1;
}
</style>
