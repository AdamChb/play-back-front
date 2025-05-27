<template>
  <div class="account-view">
    <!-- Mon compte -->
    <div class="account-section">
      <h2 class="section-title">
        <img src="@/assets/compte.svg" class="icon" />
        Mon compte
      </h2>
      <div class="account-form">
        <input type="text" placeholder="CurrentUsername" />
        <input type="password" placeholder="********" />
        <div class="account-actions">
          <button class="btn">Changer nom d'utilisateur</button>
          <button class="btn">Changer mot de passe</button>
          <button class="btn logout-btn" @click="logout">Se déconnecter</button>
        </div>
      </div>
    </div>

    <!-- Mes évènements -->
    <div class="event-section">
      <h3 class="section-title">
        Mes évènements <span class="count">{{ upcomingEvents.length }}</span>
      </h3>
      <div class="card-scroll-wrapper">
        <div class="scroll-arrow left" @click="scrollLeft('eventsRow')">
          <span>&#8249;</span>
        </div>
        <div class="card-row" ref="eventsRow">
          <EventCard
            v-for="event in upcomingEvents"
            :eventId="event.ID_evenement"
            :title="event.nom_session"
            :date="event.date_heure"
            :nb_participants="event.nb_part_max"
            :duration="event.duree"
            class="event-card"
          />
        </div>
        <div class="scroll-arrow right" @click="scrollRight('eventsRow')">
          <span>&#8250;</span>
        </div>
      </div>
    </div>

    <!-- Mes anciens évènements -->
    <div class="event-section">
      <h3 class="section-title">
        Mes anciens évènements
        <span class="count">{{ pastEvents.length }}</span>
      </h3>
      <div class="card-scroll-wrapper">
        <div class="scroll-arrow left" @click="scrollLeft('oldEventsRow')">
          <span>&#8249;</span>
        </div>
        <div class="card-row" ref="oldEventsRow">
          <EventCard
            v-for="event in pastEvents"
            :eventId="event.ID_evenement"
            :title="event.nom_session"
            :date="event.date_heure"
            :nb_participants="event.nb_part_max"
            :duration="event.duree"
            class="event-card"
          />
        </div>
        <div class="scroll-arrow right" @click="scrollRight('oldEventsRow')">
          <span>&#8250;</span>
        </div>
      </div>
    </div>

    <!-- Mes jeux favoris -->
    <div class="game-section">
      <h3 class="section-title">
        Mes jeux favoris
        <img src="@/assets/empty_coeur.svg" class="icon" />
        <span class="count">{{ favoriteGames.length }}</span>
      </h3>
      <div class="card-scroll-wrapper">
        <div class="scroll-arrow left" @click="scrollLeft('favoritesRow')">
          <span>&#8249;</span>
        </div>
        <div class="card-row" ref="favoritesRow">
          <GameCard
            v-for="game in favoriteGames"
            :key="game.ID_jeu"
            :title="game.nom"
            :image="game.image"
            class="game-card"
          />
        </div>
        <div class="scroll-arrow right" @click="scrollRight('favoritesRow')">
          <span>&#8250;</span>
        </div>
      </div>
    </div>

    <!-- Mes jeux à tester -->
    <div class="game-section">
      <h3 class="section-title">
        Mes jeux à tester
        <img src="@/assets/empty_etoile.svg" class="icon" />
        <span class="count">{{ gamesToTest.length }}</span>
      </h3>
      <div class="card-scroll-wrapper">
        <div class="scroll-arrow left" @click="scrollLeft('toTestRow')">
          <span>&#8249;</span>
        </div>
        <div class="card-row" ref="toTestRow">
          <GameCard
            v-for="game in gamesToTest"
            :key="game.ID_jeu"
            :title="game.nom"
            :image="game.image"
            class="game-card"
          />
        </div>
        <div class="scroll-arrow right" @click="scrollRight('toTestRow')">
          <span>&#8250;</span>
        </div>
      </div>
    </div>

    <!-- Mes jeux essayés -->
    <div class="game-section">
      <h3 class="section-title">
        Mes jeux essayés
        <img src="@/assets/verifier.svg" class="icon" />
        <span class="count">{{ testedGames.length }}</span>
      </h3>
      <div class="card-scroll-wrapper">
        <div class="scroll-arrow left" @click="scrollLeft('testedRow')">
          <span>&#8249;</span>
        </div>
        <div class="card-row" ref="testedRow">
          <GameCard
            v-for="game in testedGames"
            :key="game.ID_jeu"
            :title="game.nom"
            :image="game.image"
            class="game-card"
          />
        </div>
        <div class="scroll-arrow right" @click="scrollRight('testedRow')">
          <span>&#8250;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import GameCard from "@/components/GameCard.vue";

export default {
  name: "AccountView",
  components: {
    EventCard,
    GameCard,
  },
  data() {
    return {
      upcomingEvents: [],
      pastEvents: [],
      favoriteGames: [],
      gamesToTest: [],
      testedGames: [],
    };
  },
  async created() {
    try {
      const res_user_next = await fetch("https://play-back.api.arcktis.fr/api/events/user/next", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        } 
      });

      const data_user_next = await res_user_next.json();
      this.upcomingEvents = data_user_next;
      console.log("Upcoming Events:", this.upcomingEvents);

      const res_user_past = await fetch("https://play-back.api.arcktis.fr/api/events/user/old", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      const data_user_past = await res_user_past.json();
      this.pastEvents = data_user_past;

      const res_user_games = await fetch("https://play-back.api.arcktis.fr/api/games/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })

      const data_user_games = await res_user_games.json();
      data_user_games.forEach(game => {
        switch (game.statut) {
          case "aimé":
            this.favoriteGames.push(game);
            break;
          case "à tester":
            this.gamesToTest.push(game);
            break;
          case "essayé":
            this.testedGames.push(game);
            break;
        }
      });
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  },
  methods: {
    scrollRight(refName) {
      const container = this.$refs[refName];
      const card = container?.querySelector(".event-card, .game-card");
      const scrollAmount = card ? card.offsetWidth + 24 : 250;
      container?.scrollBy({ left: scrollAmount, behavior: "smooth" });
    },
    scrollLeft(refName) {
      const container = this.$refs[refName];
      const card = container?.querySelector(".event-card, .game-card");
      const scrollAmount = card ? card.offsetWidth + 24 : 250;
      container?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.account-view {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3f424d;
}

.count {
  background-color: #e0f0ff;
  color: #3f424d;
  border-radius: 10px;
  padding: 0.2rem 0.6rem;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.icon {
  width: 20px;
  height: 20px;
}

.account-section {
  width: 100%;
  max-width: 1200px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.account-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.account-form input {
  padding: 0.7rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.account-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #b5e3d8;
  color: #2d4037;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}

.event-section,
.game-section {
  width: 100%;
  max-width: 1200px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-scroll-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.card-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 1rem;
}

.card-row::-webkit-scrollbar {
  display: none;
}

.scroll-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-40%);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #3f424d;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.logout-btn {
  background-color: #e57373;
  color: white;
}
.logout-btn:hover {
  background-color: #d32f2f;
}

.scroll-arrow:hover {
  background-color: #e6e6e6;
}

.scroll-arrow.left {
  left: 0;
}

.scroll-arrow.right {
  right: 0;
}

.card-row ::v-deep(.event-card) {
  flex: 0 0 auto;
  width: 300px; /* adapte à la taille réelle de tes cartes */
}

.card-row ::v-deep(.game-card) {
  flex: 0 0 auto;
  width: 220px; /* adapte à la taille réelle de tes cartes */
}
</style>
