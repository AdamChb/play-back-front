<template>
  <div class="events-view">
    <h1 class="title">Évènements</h1>

    <div class="content-wrapper">
      <div class="search-container">
        <Searchbar @search="search" />
      </div>

      <div class="card-container">
        <!-- écoute card-click et appelle openEvent -->
        <EventCard
          v-for="ev in events"
          :key="ev.ID_evenement"
          :eventId="ev.ID_evenement"
          :title="ev.nom_session"
          :date="ev.date_heure"
          :nb_participants="ev.nb_part_max"
          :duration="ev.duree"
          @card-click="openEvent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import Searchbar from "@/components/Searchbar.vue";

export default {
  name: "EventsView",
  components: { EventCard, Searchbar },

  data() {
    return { events: [] };
  },

  /* chargement initial ------------------------------------------------ */
  async created() {
    try {
      const res  = await fetch("https://play-back.api.arcktis.fr/api/events/next");
      if (!res.ok) throw new Error("Network response was not ok");
      this.events = await res.json();
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  },

  methods: {
    /* navigation quand on clique sur la carte ------------------------ */
    openEvent(id) {
      this.$router.push({ name: "EventView", params: { id } });
    },

    /* recherche ------------------------------------------------------ */
    async search(query) {
      try {
        const res = await fetch(
          `https://play-back.api.arcktis.fr/api/events/search?event=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error();
        this.events = await res.json();
      } catch (err) {
        console.error("Error searching events:", err);
      }
    },
  },
};
</script>

<style scoped>
.events-view {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}

.content-wrapper {
  width: 80%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.7);
}

.search-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
