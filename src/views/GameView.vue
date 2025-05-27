<template>
  <div class="game-view" v-if="game">
    <div class="game-card-wrapper">
      <div class="game-content">
        <div class="game-img">
          <img :src="game.image" :alt="'Image du jeu ' + game.title" />
        </div>
        <div class="game-details">
          <div class="game-title-row">
            <h2 class="game-title">{{ game.title }}</h2>
            <div class="action-right">
              <div class="assets">
                <img
                  v-if="!a_tester"
                  src="@/assets/empty_etoile.svg"
                  alt="Star"
                  class="heart-icon"
                  @click="updateStatus('à tester')"
                />

                <img
                  v-else
                  src="@/assets/etoile.svg"
                  alt="Star"
                  class="heart-icon"
                />

                <img
                  v-if="!aime"
                  src="@/assets/empty_coeur.svg"
                  alt="Like"
                  class="heart-icon"
                  @click="updateStatus('aimé')"
                />
                <img
                  v-else
                  src="@/assets/coeur.svg"
                  alt="Like"
                  class="heart-icon"
                />
              </div>
            </div>
          </div>
          <p class="genre text-shadow">Genre : {{ game.genre }}</p>
          <p class="infos text-shadow">{{ game.nb_joueurs }}</p>
          <p class="infos text-shadow">
            Année de publication : {{ game.annee }}
          </p>
          <p class="infos text-shadow">
            Classement du jeu : {{ game.classement || "?" }}
          </p>
          <p class="infos text-shadow">
            Note moyenne du jeu : {{ game.note || "?" }}
          </p>
          <p class="infos text-shadow">Age minimum : {{ game.age_min }}</p>
        </div>
      </div>

      <p class="game-description text-shadow">
        {{ game.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameView",
  data() {
    return {
      game: null,
      aime: false,
      a_tester: false,
    };
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
    const id = this.$route.params.id;
    try {
      const res = await fetch(
        `https://play-back.api.arcktis.fr/api/games/${id}`
      );
      const data = await res.json();

      this.game = {
        id: Number(data.ID_jeu),
        title: data.nom,
        image: data.image,
        genre: data.genre || "Non spécifié",
        nb_joueurs: `${data.min_joueur} - ${data.max_joueur} joueurs`,
        annee: data.annee_creation,
        classement: data.rang || "?",
        note: data.note || "?",
        age_min: data.min_age,
        description: data.description,
      };

      const token = localStorage.getItem("token");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      // Vérification du statut de l'utilisateur
      if (token && tokenExpiration > Date.now()) {
        const response = await fetch(
          "https://play-back.api.arcktis.fr/api/games/user/" + id,
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

<style scoped>
.game-view {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-card-wrapper {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 2rem;
  border-radius: 20px;
  width: 90%;
  max-width: 1000px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.game-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
}

.game-img {
  flex: 1 1 250px;
  max-width: 300px;
}

.game-img img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.game-details {
  flex: 2 1 300px;
  display: flex;
  flex-direction: column;
}

.game-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.game-title {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
}

.action-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.assets {
  display: flex;
  align-items: center;
  gap: 8px;
}

.assets img {
  cursor: pointer;
}

.heart-icon {
  width: 40px;
  height: 40px;
}

.genre,
.infos,
.game-description,
.game-title {
  color: #333;
}

.genre {
  font-size: 19px;
  margin: 4px 0 2px 0;
}

.infos {
  font-size: 14px;
  margin: 4px 0 2px 0;
}

.game-description {
  font-size: 16px;
  text-align: justify;
  margin-top: 0;
}

.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .game-content {
    flex-direction: column;
    align-items: center;
  }

  .game-details {
    align-items: center;
  }

  .game-title-row {
    flex-direction: column;
  }
}
</style>
