<template>
  <ScrollView>
    <StackLayout orientation="vertical">
      <card-view class="card" elevation="10" radius="5">
        <GridLayout rows="auto, auto" class="form">
          <GridLayout row="0">
            <Label
                    id="checkIcon"
                    class="fa"
                    :text="'fa-check-circle' | fonticon"
            />
          </GridLayout>
          <GridLayout row="1">
            <Label class="checkInText" :text="`Je bent om ${time} ingeklokt`" />
          </GridLayout>
        </GridLayout>
      </card-view>
    </StackLayout>
  </ScrollView>
</template>

<script>
  export default {
    props: ["time", "token"],
    created() {
      this.$store.dispatch("checkIn/fetchAllWorkedHours", this.token);
      setTimeout(() => {
        this.$emit("onCheckInIsConfirmed");
      }, 3000);
    }
  };
</script>

<style scoped>
  .card {
    margin-top: 25px;
    margin-bottom: 40px;
    width: 90%;
  }

  label.checkInText {
    color: #676a6c;
    font-size: 17px;
    text-align: center;
    padding: 50;
  }

  label.fa {
    color: #6aca6b;
    font-size: 250px;
    text-align: center;
    padding: 0 20;
  }
</style>
