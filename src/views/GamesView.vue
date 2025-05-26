<template>
  <div class="games-view">
    <h1 class="title">Jeux</h1>

    <div class="content-wrapper">
      <div class="search-container">
        <Searchbar @search="search" />
      </div>

      <div class="card-container">
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
import Searchbar from "@/components/Searchbar.vue";

export default {
  name: "GamesView",
  components: {
    GameCard,
    Searchbar,
  },
  data() {
    return {
      games: [
        {
          id: 1,
          title: "Carcassonne",
          image:
            "https://cf.geekdo-images.com/okM0dq_bEXnbyQTOvHfwRA__original/img/aVZEXAI-cUtuunNfPhjeHlS4fwQ=/0x0/filters:format(png)/pic6544250.png",
        },
        {
          id: 2,
          title: "Catan",
          image:
            "https://cf.geekdo-images.com/okM0dq_bEXnbyQTOvHfwRA__original/img/aVZEXAI-cUtuunNfPhjeHlS4fwQ=/0x0/filters:format(png)/pic6544250.png",
        },
        {
          id: 3,
          title: "Dixit",
          image:
            "https://cf.geekdo-images.com/okM0dq_bEXnbyQTOvHfwRA__original/img/aVZEXAI-cUtuunNfPhjeHlS4fwQ=/0x0/filters:format(png)/pic6544250.png",
        },
        {
          id: 4,
          title: "Monopoly",
          image:
            "https://cf.geekdo-images.com/okM0dq_bEXnbyQTOvHfwRA__original/img/aVZEXAI-cUtuunNfPhjeHlS4fwQ=/0x0/filters:format(png)/pic6544250.png",
        },
      ],
    };
  },
  methods: {
    search(query) {
      fetch("https://play-back.api.arcktis.fr/api/games/search?name=" + query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.games = data; // Mettre à jour la liste des jeux avec les résultats de la recherche
        })
        .catch((error) => {
          console.error("Erreur lors de la recherche de jeux:", error);
        });
    },
  },
};
</script>

<style scoped>
.games-view {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* centrer verticalement */
  /* supprime padding: 2rem pour qu'il corresponde à Events */
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
