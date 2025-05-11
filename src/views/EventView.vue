<template>
  <div class="event-view">
    <h1>Test du composant GameCard</h1>
    <GameCard />
  </div>
</template>


<script>
import GameCard from '@/components/GameCard.vue'

export default {
  name: "EventView",
  components: {
    GameCard
  }
}
</script>
