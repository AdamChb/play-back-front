<template>
  <div class="event-view">
    <!-- état de chargement / erreur -->
    <div v-if="loading"  class="loader">Chargement…</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- contenu une fois les données prêtes -->
    <div v-else class="event-card-wrapper">
      <div class="event-header">
        <div class="calendar-block">
          <div class="calendar">
            <img src="@/assets/calendrier.svg" alt="Calendrier" class="calendar-asset" />
            <div class="calendar-text">
              <div class="month">{{ month }}</div>
              <div class="day">{{ day }}</div>
            </div>
          </div>
          <div class="time">{{ event.startTime }} - {{ event.endTime }}</div>
        </div>

        <div class="event-details">
          <div class="event-title-row">
            <h2 class="event-title">{{ event.title }}</h2>
            <div class="action-right">
              <div class="event-participants">
                <img src="@/assets/utilisateur.svg" alt="Utilisateurs" class="user-icon" />
                <span>{{ event.participants.current }}/{{ event.participants.max }}</span>
              </div>
              <button
                class="register-btn"
                @click="toggleEnroll"
              >
                {{ enrolled ? "Se désinscrire" : "S’inscrire" }}
              </button>
            </div>
          </div>
          <p class="event-meta">Difficulté : {{ event.difficulty }}</p>
        </div>
      </div>

      <p class="event-description">{{ event.description }}</p>

      <h3 class="games-title">Jeux proposés</h3>
      <div class="games-container">
        <GameCard
          v-for="game in games"
          :key="game.id"
          :id="game.id"
          :title="game.title"
          :image="game.image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";

export default {
  name: "EventView",
  components: { GameCard },

  data() {
    return {
      loading: true,
      error: null,

      event:   null,   // objet formaté pour l’affichage
      games:   [],     // jeux associés
      enrolled: false  // l’utilisateur est-il déjà inscrit ?
    };
  },

  /* ------------------------------------------------------------------
      CHARGEMENT INITIAL
  ------------------------------------------------------------------ */
  async created() {
    const id   = this.$route.params.id;
    const base = "https://play-back.api.arcktis.fr/api/events";

    try {
      /* 1. évènement + jeux en parallèle */
      const [evRes, gamesRes] = await Promise.all([
        fetch(`${base}/get/${id}`),
        fetch(`${base}/games/${id}`)
      ]);
      if (!evRes.ok || !gamesRes.ok) throw new Error();

      const rawEv   = await evRes.json();
      const rawGame = await gamesRes.json();

      /* formatage */
      const start = new Date(rawEv.date_heure);
      const end   = new Date(start.getTime() + rawEv.duree * 60_000);

      this.event = {
        id: rawEv.ID_evenement,
        title: rawEv.nom_session,
        dateISO: start.toISOString().slice(0, 10),
        startTime: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        endTime  : end  .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        difficulty: rawEv.difficulte,
        participants: {
          current: rawEv.nb_participants ?? 0,   // ajouter l’alias côté SQL si besoin
          max    : rawEv.nb_part_max
        },
        description: rawEv.description
      };

      this.games = rawGame.map(g => ({
        id:    g.ID_jeu,
        title: g.nom_jeu   || g.titre,
        image: g.image_url || g.image || ""
      }));

      /* 2. état d’inscription actuel (si connecté) */
      const token = localStorage.getItem("token");
      if (token) {
        const attendRes = await fetch(`${base}/attendance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ eventId: id, userId: 0 }) // userId lu côté back
        });
        if (attendRes.ok) {
          const { enrolled } = await attendRes.json();
          this.enrolled = enrolled;
        }
      }
    } catch (e) {
      console.error(e);
      this.error = "Impossible de charger cet évènement.";
    } finally {
      this.loading = false;
    }
  },

  /* ------------------------------------------------------------------
      MÉTHODES
  ------------------------------------------------------------------ */
  methods: {
    /** Inscrire ou désinscrire l’utilisateur, puis mettre à jour le compteur */
    async toggleEnroll() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vous devez être connecté pour vous inscrire !");
        return;
      }

      try {
        const res = await fetch(
          `https://play-back.api.arcktis.fr/api/events/enroll/${this.event.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();

        /* mise à jour locale du compteur */
        if (data.enrolled && !this.enrolled)       this.event.participants.current++;
        if (!data.enrolled &&  this.enrolled)      this.event.participants.current--;
        this.enrolled = data.enrolled;

        alert(data.message);
      } catch (e) {
        console.error(e);
        alert("Erreur lors de l’inscription, réessayez plus tard.");
      }
    }
  },

  /* ------------------------------------------------------------------
      COMPUTED
  ------------------------------------------------------------------ */
  computed: {
    day()   { return this.event ? new Date(this.event.dateISO).getDate() : ""; },
    month() { return this.event
                  ? new Date(this.event.dateISO).toLocaleString("fr-FR", { month: "long" })
                  : ""; }
  }
};
</script>

<style scoped>
.event-view {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.event-card-wrapper {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 2rem;
  border-radius: 20px;
  width: 90%;
  max-width: 1000px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.event-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.calendar-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
}

.calendar {
  position: relative;
  width: 50px;
  height: 50px;
}

.calendar-asset {
  width: 100%;
  height: 100%;
}

.calendar-text {
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  text-align: center;
  color: #3f424d;
  font-weight: bold;
}

.calendar-text .month {
  font-size: 10px;
}

.calendar-text .day {
  font-size: 20px;
  margin-top: 2px;
}

.time {
  font-size: 10px;
  color: #3f424d;
  margin-top: 5px;
  text-align: center;
}

.event-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.event-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.event-title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.action-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.event-participants {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-icon {
  width: 20px;
  height: 20px;
}

.register-btn {
  border: 2px solid #3f424d;
  padding: 0.5em 1em;
  text-align: center;
  border-radius: 0.4em;
  color: #3f424d;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(3px);
  transition: 0.3s;
  font-size: 14px;
}

.register-btn:hover {
  transform: scale(1.04);
  transition: 0.3s;
}

.event-meta {
  font-size: 14px;
  color: #333;
  margin: 4px 0 2px 0;
}

.event-description {
  font-size: 16px;
  margin: 1.5rem 0;
  color: #333;
}

.games-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.games-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: start;
}
</style>
