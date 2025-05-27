<template>
  <div class="events-view">
    <h1 class="title">Évènements</h1>

    <div class="content-wrapper">
      <div class="search-container">
        <Searchbar @search="search" />
      </div>

      <div class="card-container">
        <EventCard
          v-for="event in events"
          :eventId="event.ID_evenement"
          :date="event.date"
          :title="event.title"
          :time="event.time"
          :players="event.players"
          :games="event.games"
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
  components: {
    EventCard,
    Searchbar,
  },
  data() {
    return {
      events: [],
    };
  },
  async created() {
    try {
      const response = await fetch(
        "https://play-back.api.arcktis.fr/api/events/next"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      this.events = data; // Update events with fetched data
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  },
  methods: {
    search(query) {
      // Implement search functionality here
      // This is a placeholder for the search logic
      console.log("Searching for:", query);
      fetch(
        "https://play-back.api.arcktis.fr/api/events/search?name=" + query,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.events = data; // Update events based on search results
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
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
