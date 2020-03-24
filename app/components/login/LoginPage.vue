<template>
  <Page actionBarHidden="true" xmlns:dd="nativescript-drop-down">
    <ScrollView>
      <StackLayout>
        <Image src="~/assets/images/nos-managementapp-logo.png" class="login-logo" />

        <GridLayout rows="auto" class="container">
          <StackLayout
            row="0"
            class="form"
            v-bind:class="{ fadeBackground: isProcessing }"
          >
            <Label text="Gebruikersnaam" v-bind:class="{ isFaded: isProcessing }"/>
            <GridLayout columns="*, auto" v-bind:class="{ isFaded: isProcessing }">
              <TextField
                automationText="username"
                col="0"
                v-model="user.username"
                hint="Type something"
                returnKeyType="next"
                :isEnabled="!isProcessing"
              />
              <Label col="1" class="fas" :text="'fa-user' | fonticon" />
            </GridLayout>

            <Label text="Wachtwoord" v-bind:class="{ isFaded: isProcessing }" />
            <GridLayout columns="*, auto" v-bind:class="{ isFaded: isProcessing }">
              <TextField
                automationText="password"
                col="0"
                v-model="user.password"
                hint="Type something"
                returnKeyType="next"
                :isEnabled="!isProcessing"
                secure
              />
              <Label col="1" class="fas" :text="'fa-unlock' | fonticon" />
            </GridLayout>

            <StackLayout
              v-bind:class="{ isFaded: isProcessing }"
              orientation="horizontal"
              class="horContainer"
            >
              <StackLayout class="account-name">
                <Label text="Accountnaam" />
                <TextField
                  automationText="accountname"
                  v-model="user.accountname"
                  hint="Type something"
                  returnKeyType="next"
                  :isEnabled="!isProcessing"
                />
              </StackLayout>

              <StackLayout class="domain-name">
                <Label text="Domeinnaam" />

                <DropDown
                  automationText="selection"
                  hint="Domein"
                  :items="domains"
                  :isEnabled="!isProcessing"
                  itemsPadding="15px"
                  v-on:selectedIndexChanged="domainChanged"
                />
              </StackLayout>
            </StackLayout>

            <Button
              v-on:tap="onButtonTap"
              :isEnabled="!isProcessing"
              class="loginBtn"
              v-bind:class="{ isFaded: isProcessing }"
            >Inloggen</Button>
          </StackLayout>
          <ActivityIndicator rowspan="0" v-bind:busy="isProcessing"></ActivityIndicator>
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import WelcomeScreen from "./WelcomeScreen";
import * as dialogs from "tns-core-modules/ui/dialogs";

export default {
  data() {
    return {
      isProcessing: false,
      user: {
        username: "",
        password: "",
        accountname: "",
        domain: ""
      }
    };
  },
  props: ["domains"],
  methods: {
    onButtonTap() {
      if (!this.user.username) {
        dialogs.alert({
          title: "Error",
          message: "Vul uw gebruikersnaam in!",
          okButtonText: "Ok!"
        });
        return;
      }

      if (!this.user.password) {
        dialogs.alert({
          title: "Error",
          message: "Vul uw wachtwoord in!",
          okButtonText: "Ok!"
        });
        return;
      }

      if (!this.user.accountname) {
        dialogs.alert({
          title: "Error",
          message: "Vul uw accountnaam in!",
          okButtonText: "Ok!"
        });
        return;
      }

      if (!this.user.domain) {
        dialogs.alert({
          title: "Error",
          message: "Selecteer uw domein!",
          okButtonText: "Ok!"
        });
        return;
      }
      this.login();
    },
    login() {
      this.isProcessing = true;
      this.$store.dispatch("auth/loginUser", this.user);
    },
    domainChanged(args) {
      this.user.domain = this.domains[args.newIndex];
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "auth/setToken") {
        this.$navigateTo(WelcomeScreen, {
          clearHistory: true,
          transition: {
            name: "fade",
            duration: 200
          },
          props: {
            employee: state.auth.user,
            token: state.auth.token
          }
        });
      }

      if (mutation.type === "auth/setIsProcessing") {
        this.isProcessing = state.auth.isProcessing;
      }
    });
  }
};
</script>

<style scoped>
ActivityIndicator {
  width: 100px;
  color: #00a0d1;
}

Page {
  background-image: url("~/assets/images/SplashScreen.jpg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}

.login-logo {
  margin: 60px;
  margin-top: 90px;
}

.form {
  background-color: white;
  border-radius: 10px;
  margin: 60px;
  padding: 50px;
}

.isFaded {
  opacity: 0.75;
}

.fadeBackground {
  background-color: #bfffffff;
}

GridLayout {
  margin-bottom: 30px;
  border-width: 0 0 1 0;
  border-color: #b3676a6c;
}

label {
  color: #dddddd;
  font-size: 13px;
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
  border-width: 0 0 0 0;
  placeholder-color: #b3676a6c;
  background-color: transparent;
  border-color: transparent;
  color: #676a6c;
  padding-bottom: 5;
  padding-left: 0;
  padding-top: 0;
  font-size: 16px;
}

DropDown {
  margin: 0;
  font-size: 16px;
}

button {
  background-color: #00a0d1;
  color: white;
}

.horContainer {
  width: 100%;
}

.horContainer StackLayout {
  width: 50%;
}

.account-name {
  margin-right: 15px;
}

.domain-name {
  margin-left: 15px;
}

.account-name,
.domain-name {
  border-width: 0 0 1 0;
  border-color: #b3676a6c;
}

.account-name,
.domain-name {
  margin-bottom: 30px;
}
</style>