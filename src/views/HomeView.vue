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

export default {
  name: "HomeView",
  components: {
    Welcome,
    About,
    Preview,
  },
};
</script>
