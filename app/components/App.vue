<template>
  <Page class="body" actionBarHidden="true">
    <Image src="~/assets/images/nos-managementapp-logo.png" class="logo" />
  </Page>
</template>

<script>
import Dashboard from "./dashboard/Dashboard";
import LoginPage from "./login/LoginPage";
import axios from "axios";
import { getString } from "tns-core-modules/application-settings";
import * as dialogs from "tns-core-modules/ui/dialogs";
import {
  FingerprintAuth
} from "nativescript-fingerprint-auth";

var fingerprintAuth = new FingerprintAuth();

export default {
  components: {
    Dashboard
  },
  data() {
    return {
      domains: []
    };
  },
  methods: {
    goToLogin() {
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
    goToDashboard() {
      this.$navigateTo(Dashboard, {
        clearHistory: true,
        transition: {
          name: "fade",
          duration: 400
        }
      });
    }
  },
  mounted() {
    var usefingerprint = getString("usetouch");

    if (getString("store") && getString("store") != "") {
      fingerprintAuth.available().then(function(avail) {
        if (avail.any && avail.touch && usefingerprint === "true") {
          fingerprintAuth
            .verifyFingerprint({
              message: "Scan vingerafdruk",
              useCustomAndroidUI: false
            })
            .then(enteredPassword => {
              if (enteredPassword === undefined) {
                this.$store.commit("auth/load");
                setTimeout(() => {
                  this.goToDashboard();
                }, 2000);
              } else {
                this.$store.commit("auth/load");
                setTimeout(() => {
                  this.goToDashboard();
                }, 2000);
              }
            })
            .catch(err => {
              this.$store.commit("auth/load");
              setTimeout(() => {
                this.goToDashboard();
              }, 2000);
            });
        } else {
          this.$store.commit("auth/load");
          setTimeout(() => {
            this.goToDashboard();
          }, 2000);
        }
      });
      this.$store.commit("auth/load");
      setTimeout(() => {
        this.goToDashboard();
      }, 2000);
    } else {
      axios
        .get("https://nostrapersoneelsapi.herokuapp.com/api/company/domains")
        .then(
          res => {
            res.data.result.forEach(domain => {
              this.domains.push(domain.Domain);
            });

            setTimeout(() => {
              this.goToLogin();
            }, 1500);
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
  }
};
</script>

<style scoped>
.body {
  background-image: url("~/assets/images/SplashScreen.jpg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}

.logo {
  margin: 50px;
}
</style>
