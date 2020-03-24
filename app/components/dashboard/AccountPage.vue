<template>
  <Page>
    <ActionBar>
      <Label text="Account"></Label>
    </ActionBar>
    <ScrollView>
      <StackLayout horizontalAlignment="center">
        <CardView class="picture">
          <StackLayout>
            <Label class="head" :text="' Pasfoto'"></Label>
            <!-- if image from db is null -->
            <Image
              v-if="employee.Photo && employee.Photo.data"
              stretch="fill"
              class="image"
              :src="photo()"
            />
            <Label
              v-else
              class="fas"
              :text="'fa-user-circle' | fonticon"
            ></Label>
          </StackLayout>
        </CardView>
        <CardView class="card">
          <StackLayout class="card-body">
            <Label class="head" text=" Personalia"></Label>
            <StackLayout class="stack">
              <Label class="record" text=" Roepnaam"></Label>
              <TextField
                v-if="employee.Nickname"
                class="textfield"
                editable="false"
                :text="employee.Nickname"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Naam"></Label>
              <TextField
                v-if="employee.Firstname"
                class="textfield"
                editable="false"
                :text="employee.Firstname"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Tussenvoegsel"></Label>
              <TextField
                v-if="employee.Infix"
                class="textfield"
                editable="false"
                :text="employee.Infix"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Achternaam"></Label>
              <TextField
                v-if="employee.Lastname"
                class="textfield"
                editable="false"
                :text="employee.Lastname"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
          </StackLayout>
        </CardView>
        <CardView class="card">
          <StackLayout class="card-body">
            <Label class="head" :text="' Contactgegevens'"></Label>
            <StackLayout class="stack">
              <Label class="record" text=" Postcode"></Label>
              <TextField
                v-if="employee.Postalcode"
                class="textfield"
                editable="false"
                :text="employee.Postalcode"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Huisnummer"></Label>
              <TextField
                v-if="employee.HouseNumber"
                class="textfield"
                editable="false"
                :text="employee.HouseNumber"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Toevoeging"></Label>
              <TextField
                v-if="employee.HouseNumberAddition"
                class="textfield"
                editable="false"
                :text="employee.HouseNumberAddition"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Plaats"></Label>
              <TextField
                v-if="employee.City"
                class="textfield"
                editable="false"
                :text="employee.City"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Telefoonnummer"></Label>
              <TextField
                v-if="employee.PhoneNumber"
                class="textfield"
                editable="false"
                :text="employee.PhoneNumber"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Mobiel"></Label>
              <TextField
                v-if="employee.MobileNumber"
                class="textfield"
                editable="false"
                :text="employee.MobileNumber"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" E-mail"></Label>
              <TextField
                v-if="employee.EmailAddress"
                class="textfield"
                editable="false"
                :text="employee.EmailAddress"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
          </StackLayout>
        </CardView>
        <CardView class="card">
          <StackLayout class="card-body">
            <Label class="head" :text="' Eigenschappen'"></Label>
            <StackLayout class="stack">
              <Label class="record" text=" Geslacht"></Label>
              <TextField
                v-if="employee.Gender"
                class="textfield"
                editable="false"
                :text="employee.Gender"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Geboortedatum"></Label>
              <TextField
                v-if="employee.BirthDate"
                class="textfield"
                editable="false"
                :text="
                  employee.BirthDate.getDate() +
                    '-' +
                    (employee.BirthDate.getMonth() + 1) +
                    '-' +
                    employee.BirthDate.getFullYear()
                "
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Geboorteplaats"></Label>
              <TextField
                v-if="employee.BirthPlace"
                class="textfield"
                editable="false"
                :text="employee.BirthPlace"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Geboorteland"></Label>
              <TextField
                v-if="employee.Motherland"
                class="textfield"
                editable="false"
                :text="employee.Motherland"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Nationaliteit"></Label>
              <TextField
                v-if="employee.Nationality"
                class="textfield"
                editable="false"
                :text="employee.Nationality"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
            <StackLayout class="stack">
              <Label class="record" text=" Burgelijke staat"></Label>
              <TextField
                v-if="employee.MaritalStatus"
                class="textfield"
                editable="false"
                :text="employee.MaritalStatus"
              />
              <TextField v-else class="textfield" editable="false" text="-" />
            </StackLayout>
          </StackLayout>
        </CardView>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
const test = require("base64-arraybuffer");

export default {
  props: ["token"],
  data: () => {
    return {
      employee: {}
    };
  },
  methods: {
    photo() {
      var photo =
        "data:image/jpg;base64," + test.encode(this.employee.Photo.data);

      return photo;
    }
  },
  created() {
    this.$store.dispatch("account/fetchEmployee", this.token);
    this.$store.subscribe((mutation, state) => {
        if ( mutation.type === 'account/setEmployee') {
          this.employee = state.account.employee;
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

.fas {
  font-size: 250px;
  color: #dddddd;
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
  height: 100%;
  background-color: #fff;
  color: #676a6c;
  width: 90%;
  padding: 20px;
  margin: 20px 10px;
}
.image {
  border-radius: 200%;
  height: 270dip;
  width: 270dip;
  margin: 20dip;
}

.picture {
  text-align: center;
  height: 100%;
  background-color: #fff;
  color: #676a6c;
  width: 90%;
  padding-bottom: 1000px;
  margin-top: 70px;
  margin: 20px 10px;
}
</style>
