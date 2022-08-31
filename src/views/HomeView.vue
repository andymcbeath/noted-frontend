<script>
export default {
  data: function () {
    return {
      message: "Welcome to Noted!",
    };
  },
  created: function () {},
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <img src="~@/assets/LogoForNoted.png" />
  </div>
</template>
<style>
.home {
  font-size: medium;
  font-style: normal;
  font-family: "Gill Sans", "Gill Sans MT", "Calibri", "Trebuchet MS",
    sans-serif;
  width: 50%;
  text-align: center;
  align-content: center;
  margin: auto;
  padding: 20px;
}
</style>
