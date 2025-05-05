<template>
  <div>
    <Accueil />
    <About />
    <Preview />
  </div>
</template>

<script>
import Accueil from '@/components/Accueil.vue';
import About from '@/components/About.vue';
import Preview from '@/components/Preview.vue';

export default {
  name: 'HomeView',
  components: {
    Accueil, About, Preview
  },
};
</script>
