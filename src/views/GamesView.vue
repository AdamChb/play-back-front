<template>
  <div class="games-view">
    <h1 class="title">Jeux</h1>

    <div class="content-wrapper">
      <div class="search-container">
        <Searchbar @search="search" />
      </div>

      <div class="card-container">
        <router-link
          v-for="game in games"
          :key="game.id"
          :to="`/game/${game.id}`"
          class="game_link"
        >
          <GameCard
            :id="game.id"
            :title="game.title"
            :image="game.image"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";
import Searchbar from "@/components/Searchbar.vue";

export default {
  name: "GamesView",
  components: {
    GameCard,
    Searchbar,
  },
  data() {
    return {
      games: [],
    };
  },
  methods: {
    async fetchGames() {
      try {
        const res = await fetch("https://play-back.api.arcktis.fr/api/games/all");
        const data = await res.json();

        this.games = data.map((game) => ({
          id: Number(game.ID_jeu),
          title: game.nom,
          image: game.image,
        }));
      } catch (error) {
        console.error("Erreur lors du chargement des jeux :", error);
      }
    },
    async search(query) {
      try {
        const res = await fetch("https://play-back.api.arcktis.fr/api/games/search?name=" + query);
        const data = await res.json();

        this.games = data.map((game) => ({
          id: Number(game.ID_jeu),
          title: game.nom,
          image: game.image,
        }));
      } catch (error) {
        console.error("Erreur lors de la recherche de jeux :", error);
      }
    },
  },
  mounted() {
    this.fetchGames();
  },
};
</script>

<style scoped>
.games-view {
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

.game_link {
  text-decoration: none;
  color: inherit;
}
</style>