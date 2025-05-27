<template>
  <section class="preview-view">
    <div class="container">
      <div class="header">
        <h1>Nos prochains événements</h1>
        <router-link to="/events">
          <button class="events-btn">Voir tous les évènements</button>
        </router-link>
      </div>

      <div class="events">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :eventId="event.id"
          :date="event.date"
          :title="event.title"
          :time="event.time"
          :players="event.players"
          :games="event.games"
          :size="size"
        />
      </div>
    </div>
  </section>
</template>

<script>
import EventCard from "./EventCard.vue";
export default {
  name: "Preview",
  components: { EventCard },
  data() {
    return {
      size: "large",
      events: [],
    };
  },
  async created() {
    fetch("https://play-back.api.arcktis.fr/api/events/next")
      .then((response) => response.json())
      .then((data) => {
        data.slice(0, 2).forEach((event) => {
          event.jeux = fetch(
            `https://play-back.api.arcktis.fr/api/events/games/${event.ID_evenement}`
          )
            .then((res) => res.json())
            .then((games) =>
              games.map((game) => ({
                id: Number(game.ID_jeu),
                title: game.nom,
                image: game.image,
              }))
            );
          this.events.push({
            id: event.ID_evenement,
            title: event.nom_session,
            date: event.date_heure.split("T")[0],
            time: event.date_heure.split("T")[1].slice(0, 5),
            players: event.nb_part_max,
            games: event.jeux,
          });
        });
      })
      .catch((error) => console.error("Error fetching events:", error));
  },
};
</script>

<style scoped>
.preview-view {
  background-color: #bee3db;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 75%;
}

.header {
  display: flex;
  width: 100%;
  padding-bottom: 1em;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
}

h1 {
  font-size: 3em;
  margin: 0;
  margin-bottom: 0.5em;
  color: #3f424d;
}

.events-btn {
  text-decoration: none;
  align-self: flex-start;
  border: 3px solid #3f424d;
  padding: 0.3em 0.6em;
  margin-bottom: 0.5em;
  text-align: center;
  border-radius: 0.4em;
  color: #3f424d;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(3px);
  transition: 0.3s;
  animation: fadeInLeft ease 1.5s;
  font-size: 1.5em;
}

.events {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2em;
}
</style>
