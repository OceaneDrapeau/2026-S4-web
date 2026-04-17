<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped>
@font-face {
  font-family: "WinkySans";
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local(WinkySans), url("/fonts/WinkySans/WinkySans-VariableFont_wght.ttf") format("truetype");
}

@font-face {
  font-family: "InriaSans";
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local(InriaSans), url("/fonts/InriaSans/InriaSans-Regular.ttf") format("truetype");
}

body {
  background-color: #EEE9E9;
  color: #5A051A;
}

body, html {
  height: 100%;
  margin: 0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: #d20000; */
  overflow: hidden  ;
}

</style>
