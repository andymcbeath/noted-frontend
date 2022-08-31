<script>
import axios from "axios";
// import Embed from "flat-embed";

export default {
  data: function () {
    return {
      newScoreParams: {},
      errors: [],
    };
  },
  created: function () {},
  methods: {
    createScore: function () {
      axios
        .post("/scores", this.newScoreParams)
        .then((response) => {
          console.log("score create", response);
          this.$router.push("/scores");
        })
        .catch((error) => {
          console.log("scores create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
<!-- <div id="embed-container"></div>
<script src="https://prod.flat-cdn.com/embed-js/v1.4.1/embed.min.js"></script>
<script>
var container = document.getElementById("embed-container");
var embed = new Flat.Embed(container, {
  score: "<score-id-you-want-to-load>",
  embedParams: {
    appId: "<your-app-id>",
    controlsPosition: "bottom",
  },
});
</script> -->

<template>
  <div class="scores-new">
    <h1>New Score</h1>
    <form v-on:submit.prevent="createScore()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Title:
      <input type="text" v-model="newScoreParams.title" />
      Composer:
      <input type="text" v-model="newScoreParams.composer" />
      Score's Flat ID#:
      <input type="text" v-model="newScoreParams.score" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>
