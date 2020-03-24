<template>
  <Page>
    <ActionBar>
      <Label text="Settings"></Label>
    </ActionBar>

    <StackLayout>
      <card-view class="card" elevation="10" radius="5">
        <StackLayout aria-orientation="vertical">
          <StackLayout id="stack" orientation="horizontal">
            <Label id="label" text="Inloggen met vingerafdruk" width="80%"></Label>
            <Switch id="switch" :checked="useFingerprint" width="20%" v-on:tap="onCheckChanged" />
          </StackLayout>
          <button class="logOutBtn" v-on:tap="onLogout()">Uitloggen</button>
        </StackLayout>
      </card-view>
    </StackLayout>
  </Page>
</template>

<script>
import LoginPage from "../login/LoginPage";
import axios from "axios";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { getString, setString } from "tns-core-modules/application-settings";

export default {
  data() {
    return {
      domains: []
    };
  },
  methods: {
    onCheckChanged() {
      if (getString("usetouch") === "true") {
        setString("usetouch", "false");
      } else {
        setString("usetouch", "true");
      }
    },
    onLogout() {
      this.$store.dispatch("auth/logoutUser");
      axios
        .get("https://nostrapersoneelsapi.herokuapp.com/api/company/domains")
        .then(
          res => {
            res.data.result.forEach(domain => {
              this.domains.push(domain.Domain);
            });

            this.$navigateTo(LoginPage, {
              clearHistory: true,
              transition: {
                name: "fade",
                duration: 400
              },
              props: {
                domains: this.domains
              }
            });
          },
          error => {
            dialogs.alert({
              title: "Error",
              message: "Kon geen verbinding maken met API",
              okButtonText: "Ok!"
            });
          }
        );
    }
  },
  computed: {
    useFingerprint: function() {
      if (getString("usetouch") === "true") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #34444e;
  color: #fff;
  font-size: 20px;
}
#label {
  padding-left: 20dip;
  padding-top: 20dip;
}
#switch {
  color: #00a0d1;
  margin-right: 20dip;
  margin-top: 20dip;
  background-color: #34444e;
}

#touchid {
  margin: 20dip;
}
.head {
  font-size: 24px;
  text-align: left;
  margin: 10px;
  margin-bottom: 5px;
  color: #676a6c;
}

.form {
  background-color: white;
  border-radius: 10px;
  padding: 40px;
}

.card {
  width: 95%;
  margin: 25px 20px;
  padding: 20;
}

.locationLabel {
  color: #676a6c;
  font-size: 15px;
  padding-left: 9px;
}

.logOutBtn {
  margin-top: 20dip;
  background-color: #da534f;
  color: #fff;
}
</style>
