<template>
  <div>
    <Welcome />
    <About />
    <Preview />
  </div>
</template>

<script>
import Welcome from "@/components/Welcome.vue";
import About from "@/components/About.vue";
import Preview from "@/components/Preview.vue";
import Searchbar from "@/components/Searchbar.vue";

export default {
  name: "HomeView",
  components: {
    Welcome,
    About,
    Preview,
  },
};
</script>
