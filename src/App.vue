<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
      flashMessage: "Hello, welcome to Noted!",
    };
  },
  methods: {
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
      this.flashMessage = localStorage.getItem("flashMessage");
      localStorage.removeItem("flashMessage");
    },
  },
};
</script>
<template>
  <nav class="navbar sticky-top navbar-expand-sm navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="./assets/noteImage.png"
          alt=""
          width="30"
          height="30"
          class="d-inline-block align-text-top"
        />
        Noted
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a
              v-if="!isLoggedIn"
              class="nav-link active"
              aria-current="page"
              href="/signup"
              >Sign Up</a
            >
          </li>
          <li class="nav-item">
            <a v-if="isLoggedIn" class="nav-link active" href="/scores"
              >All Scores</a
            >
          </li>
          <li class="nav-item">
            <a
              v-if="!isLoggedIn"
              class="nav-link active"
              aria-current="page"
              href="/login"
              >Log In</a
            >
          </li>
          <li class="nav-item">
            <a
              v-if="isLoggedIn"
              class="nav-link active"
              aria-current="page"
              href="/logout"
              >Log Out</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/signup">Signup</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/logout">Logout</router-link> |
    <router-link to="/scores">All Scores</router-link> |
    <router-link to="/scores/new">New Score</router-link>
  </nav>
  <router-view /> -->
  <router-view />
</template>
<div v-if="flashMessage" class="alert alert-info">
  {{ flashMessage }}
</div>
<style>
.home2 {
  background-image: url("~@/assets/LogoForNoted.png");
  background-size: 30%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
  background-position-y: 100px;
  background-position-y: 350px;
}
.navbar {
  font-size: large;
  font-style: bold;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  background-color: #0a69c2;
}
/* body {
  /* background-image: url(./assets/noteImage.png);
  background-size: 45%;
  height: 75%;
  background-repeat: no-repeat;
  background-position: center;
  background-position-y: 100px; */

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
