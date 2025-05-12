<template>
  <div id="app">
    <div class="background"></div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: { Header, Footer },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");

#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  position: relative;
  min-height: 100vh;
  z-index: 0;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/background.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -2; /* sous tous les autres éléments */

  /* ✅ overlay sombre */
}

.background::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35); /* ✅ ajustable */
  z-index: -1;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
