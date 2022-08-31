<script>
import axios from "axios";
import Embed from "flat-embed";

export default {
  data: function () {
    return {
      score: {},
      editScoreParams: {},
      errors: [],
      embed: {},
    };
  },
  created: function () {
    axios.get("/scores/" + this.$route.params.id).then((response) => {
      console.log("scores show", response);
      this.initializeScore(response.data);
      this.editScoreParams = this.score;
    });
  },
  methods: {
    updateScore: function () {
      axios
        .patch("/scores/" + this.$route.params.id, this.editScoreParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/scores");
        })
        .catch((error) => {
          console.log("scores update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    exportFile: function (buffer, mimeType, ext) {
      var blobUrl = window.URL.createObjectURL(
        new Blob([buffer], {
          type: mimeType,
        })
      );
      var a = document.createElement("a");
      a.href = blobUrl;
      a.download = "exported-score." + ext;
      document.body.appendChild(a);
      a.style = "display: none";
      a.click();
      a.remove();
    },
    exportXML: function () {
      document.getElementById("export-xml").addEventListener("click", () => {
        this.embed.getMusicXML({ compressed: true }).then((buffer) => {
          this.exportFile(
            buffer,
            "application/vnd.recordare.musicxml+xml",
            "mxl"
          );
        });
      });
    },
    exportPNG: function () {
      document.getElementById("export-png").addEventListener("click", () => {
        this.embed.getPNG().then((buffer) => {
          this.exportFile(buffer, "image/png", "png");
        });
      });
    },
    initializeScore: function (score) {
      console.log("calling initializeScore");
      const container = document.getElementById("embed-container");
      this.embed = new Embed(container, {
        width: "100%",
        height: "600px",
        score: score.score,
        embedParams: {
          mode: "edit",
          appId: "62fa6b1916a2480012017172",
          controlsPosition: "bottom",
        },
      });
    },
  },
};
</script>

<template>
  <div id="embed-container"></div>
  <button
    class="btn btn-outline-primary"
    style="
      --bs-btn-padding-y: 0.25rem;
      --bs-btn-padding-x: 0.5rem;
      --bs-btn-font-size: 1rem;
      margin-top: 10px;
      margin-right: 20px;
      margin-bottom: 20px;
    "
    id="export-xml"
    v-on:click="exportXML()"
  >
    Export to MusicXML
  </button>
  <button
    class="btn btn-outline-primary"
    style="
      --bs-btn-padding-y: 0.25rem;
      --bs-btn-padding-x: 0.5rem;
      --bs-btn-font-size: 1rem;
      margin-top: 10px;
      margin-bottom: 20px;
    "
    id="export-png"
    v-on:click="exportPNG()"
  >
    Export to MusicPNG
  </button>
  <div class="scores-edit">
    <h1>Update Score Info</h1>
    <form v-on:submit.prevent="updateScore(score)">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="title">
        <label>Title:</label>
        <input
          class="form-control form-control-md"
          type="text"
          placeholder="Insert the correct title"
          fd
          aria-label=".form-control-md"
          v-model="editScoreParams.title"
        />
      </div>
      <div class="composer">
        <label>Composer:</label>
        <input
          class="form-control form-control-md"
          type="text"
          placeholder="Write in the correct composer name"
          aria-label=".form-control-md"
          v-model="editScoreParams.composer"
        />
      </div>
      <!-- <div class="scoreId">
        <label>Flat Score ID #:</label>
        <input
          class="form-control form-control-sm"
          type="text"
          placeholder="Update the ID #"
          aria-label=".form-control-sm"
          v-model="editScoreParams.score"
        /> -->
      <!-- </div> -->
      <button
        class="btn btn-outline-primary"
        style="
          --bs-btn-padding-y: 0.25rem;
          --bs-btn-padding-x: 0.5rem;
          --bs-btn-font-size: 1.5rem;
          margin-top: 10px;
        "
        type="submit"
        value="Update"
      >
        Update
      </button>
    </form>
  </div>
</template>

<style>
.embed-container {
  width: 100%;
  height: 800;
  margin-top: 40px;
}
.title {
  font-size: x-large;
  font-style: normal;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  width: 50%;
  text-align: center;
  align-content: center;
  margin: auto;
  padding: 20px;
}
.composer {
  font-size: x-large;
  font-style: normal;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  width: 50%;
  text-align: center;
  align-content: center;
  margin: auto;
  padding: 20px;
}
</style>
