<template>
  <div class="home">
    <HelloWorld msg="Test"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'GameView',
  components: {
    HelloWorld
  }
}
</script>
