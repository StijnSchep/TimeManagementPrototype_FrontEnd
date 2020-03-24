<template>
  <ScrollView>
    <StackLayout orientation="vertical">
      <card-view class="card" elevation="10" radius="5">
        <GridLayout rows="auto, auto" class="form">
          <GridLayout row="0">
            <Label id="checkIcon" class="fa" :text="'fa-circle' | fonticon" />
            <Label class="fas" :text="'fa-utensils' | fonticon" />
          </GridLayout>
          <GridLayout row="1">
            <Label class="checkInText">{{ msg }}</Label>
          </GridLayout>
        </GridLayout>
      </card-view>
    </StackLayout>
  </ScrollView>
</template>

<script>
export default {
  props: ["msg"],
  created() {
    setTimeout(() => {
      this.$emit("onPauseConfirmed");
    }, 4000);
  }
};
</script>

<style scoped>
.card {
  margin-top: 25dip;
  margin-bottom: 40dip;
  width: 90%;
}

label.checkInText {
  color: #676a6c;
  font-size: 15px;
  text-align: center;
  padding: 50;
}

label.fas {
  color: #dddddd;
  font-size: 110dip;
  text-align: center;
  margin-top: 50dip;
}

label.fa {
  color: #dddddd;
  font-size: 200dip;
  text-align: center;
  padding: 0 20;
}
</style>
