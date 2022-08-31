<script>
import axios from "axios";
export default {
  data: function () {
    return {
      scores: [],
      currentScore: {},
      titleFilter: "",
    };
  },
  created: function () {
    this.indexScores();
  },
  methods: {
    indexScores: function () {
      axios.get("/scores.json").then((response) => {
        this.scores = response.data;
        console.log("All Scores:", this.scores);
      });
    },
    filterScores: function () {
      return this.scores.filter((score) => {
        var lowerTitle = score.title.toLowerCase();
        var lowerTitleFilter = this.titleFilter.toLowerCase();
        return lowerTitle.includes(lowerTitleFilter);
      });
    },
  },
};
</script>

<template>
  <div class="scores-index">
    <h1>All Scores</h1>
    Search:
    <input v-model="titleFilter" list="titles" type="text" />
    <TransitionGroup name="list">
      <datalist id="titles">
        <option v-for="score in scores" v-bind:key="score.id">
          {{ score.title }}
        </option>
      </datalist>
      <div
        v-for="score in filterScores()"
        v-bind:key="score.id"
        v-on:click="currentScore = score"
        v-bind:class="{ selected: score === currentScore }"
      >
        <h2>{{ score.title }}</h2>
        <p>Composer: {{ score.composer }}</p>
        <router-link v-bind:to="`/scores/${score.id}`"
          ><button
            class="btn btn-outline-primary"
            style="
              --bs-btn-padding-y: 0.25rem;
              --bs-btn-padding-x: 0.5rem;
              --bs-btn-font-size: 1.12rem;
              margin-bottom: 10px;
            "
          >
            View and Hear Score
          </button></router-link
        >
      </div>
    </TransitionGroup>
  </div>
</template>

<style>
.scores-index {
  font-size: large;
  font-style: normal;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
#embed-container {
  width: 100%;
  height: 600px;
  margin-top: 40px;
}
</style>
