<script>
export default {
  name: "GameCard",
  data() {
    return {
      a_tester: false,
      aime: false,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://cf.geekdo-images.com/okM0dq_bEXnbyQTOvHfwRA__original/img/aVZEXAI-cUtuunNfPhjeHlS4fwQ=/0x0/filters:format(png)/pic6544250.png",
    },
  },
  methods: {
    updateStatus(status) {
      const token = localStorage.getItem("token");
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      if (!token || tokenExpiration < Date.now()) {
        alert("Vous devez être connecté pour aimer un jeu !");
        return;
      }
      fetch("https://play-back.api.arcktis.fr/api/games/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_game: this.game.id,
          status: status,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour du statut");
          }
          return response.json();
        })
        .then((data) => {
          if (status === "aimé") {
            this.aime = true;
          }
          if (status === "à tester") {
            this.a_tester = true;
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour du statut :", error);
        });
    },
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      // Vérification du statut de l'utilisateur
      if (token && tokenExpiration > Date.now()) {
        const response = await fetch(
          "https://play-back.api.arcktis.fr/api/games/user/" + this.id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const statutData = await response.json();
          if (!Array.isArray(statutData)) {
            if (statutData.statut === "aimé") {
              this.aime = true;
            }
            if (statutData.statut === "à tester") {
              this.a_tester = true;
            }
          } else {
            for (const statut of statutData) {
              if (statut.statut === "aimé") {
                this.aime = true;
              }
              if (statut.statut === "à tester") {
                this.a_tester = true;
              }
            }
          }
        } else {
          console.error("Erreur lors de la récupération du statut utilisateur");
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement du jeu:", error);
    }
  },
};
</script>

<template>
  <div class="game-card">
    <div class="image-container">
      <img :src="this.image" alt="Jeu" />
    </div>
    <p class="game-title">{{ this.title }}</p>
    <div class="icons">
      <img
        v-if="!a_tester"
        src="@/assets/empty_etoile.svg"
        alt="Star"
        class="icon"
        @click="updateStatus('à tester')"
      />

      <img v-else src="@/assets/etoile.svg" alt="Star" class="icon" />

      <img
        v-if="!aime"
        src="@/assets/empty_coeur.svg"
        alt="Like"
        class="icon"
        @click="updateStatus('aimé')"
      />
      <img v-else src="@/assets/coeur.svg" alt="Like" class="icon" />
    </div>
  </div>
</template>

<!-- Style of the page -->
<style scoped>
.game-card {
  width: 150px;
  text-align: center;
  font-family: Arial, sans-serif;
  margin: 10px;
}

.image-container {
  width: 100%;
  aspect-ratio: 1 / 1; /* carré */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.game-title {
  margin: 8px 0;
  font-size: 16px;
  font-weight: bold;
}

.icons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
