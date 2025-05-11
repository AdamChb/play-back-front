<template>
  <div class="event-view">
    <h1>Test du composant GameCard</h1>
    <GameCard />
    <h1>Test du composant EventCard</h1>
    <EventCard />
  </div>
</template>


<script>
import EventCard from '@/components/EventCard.vue';
import GameCard from '@/components/GameCard.vue'

export default {
  name: "EventView",
  components: {
    GameCard,
    EventCard
  }
}
</script>
