<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>

<template>
  <div class="login">
    <form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Email:</label>
        <input
          class="form-control form-control-sm"
          type="email"
          placeholder="Example@example.com"
          aria-label=".form-control-sm"
          v-model="newSessionParams.email"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          class="form-control form-control-sm"
          type="password"
          placeholder="Type in your incredibly unique password"
          aria-label=".form-control-sm"
          v-model="newSessionParams.password"
        />
      </div>
      <button
        class="btn btn-outline-primary"
        style="
          --bs-btn-padding-y: 0.25rem;
          --bs-btn-padding-x: 0.5rem;
          --bs-btn-font-size: 1.33rem;
          margin-top: 20px;
        "
        type="submit"
        value="Submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>
<style>
.login {
  font-size: medium;
  font-style: normal;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  width: 50%;
  text-align: center;
  align-content: center;
  margin: auto;
  padding: 20px;
}
</style>
