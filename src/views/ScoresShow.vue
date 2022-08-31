<script>
import axios from "axios";
import Embed from "flat-embed";

export default {
  data: function () {
    return {
      newScoreParams: {},
      score: {},
      embed: {},
    };
  },
  created: function () {
    axios.get("/scores/" + this.$route.params.id).then((response) => {
      console.log("scores show", response);
      this.initializeScore(response.data);
      this.score = response.data;
    });
  },
  methods: {
    toEdit: function () {
      this.$router.push("`/scores/${score.id}/edit`");
    },
    destroyScore: function (score) {
      axios.delete("/scores/" + score.id).then((response) => {
        console.log("scores destroy", response);
        this.$router.push("/scores");
      });
    },
    // eslint-disable-next-line no-unused-vars
    initializeScore: function (score) {
      const container = document.getElementById("embed-container");
      this.embed = new Embed(container, {
        width: "100%",
        height: "600",
        score: score.score,
        embedParams: {
          appId: "62fa6b1916a2480012017172",
          controlsPosition: "bottom",
        },
      });
    },
  },
};
</script>

<template>
  <div class="scores-show">
    <h2>{{ score.title }}</h2>
    <p>Composer: {{ score.composer }}</p>
    <!-- <p>Score's Flat ID: {{ score.score }}</p> -->
    <router-link v-bind:to="`/scores/${score.id}/edit`"
      ><button
        class="btn btn-outline-primary"
        style="
          --bs-btn-padding-y: 0.25rem;
          --bs-btn-padding-x: 0.5rem;
          --bs-btn-font-size: 1rem;
          margin-right: 10px;
        "
      >
        Edit Score
      </button></router-link
    >
    <button
      class="btn btn-outline-primary"
      style="
        --bs-btn-padding-y: 0.25rem;
        --bs-btn-padding-x: 0.5rem;
        --bs-btn-font-size: 1rem;
        margin-right: 10px;
      "
      v-on:click="destroyScore(score)"
    >
      Destroy Score
    </button>
    <!-- <button v-on:click="submit" href="/ScoresEdit.vue"></button>
    class="btn btn-outline-primary" style=" --bs-btn-padding-y: 0.25rem;
    --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 1rem; " -->
    <router-link to="/scores"
      ><button
        class="btn btn-outline-primary"
        style="
          --bs-btn-padding-y: 0.25rem;
          --bs-btn-padding-x: 0.5rem;
          --bs-btn-font-size: 1rem;
        "
      >
        Back to All Scores
      </button></router-link
    >
  </div>
  <div id="embed-container"></div>
</template>
