<script>
export default {
  name: "GameCard",
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
};
/*
  methods: {
    async toLike(game) {
      if (!this.isLoggedIn) {
        alert("Vous devez être connecté pour aimer un jeu!");
        return;
      }

      //Faudra modifier le lien
      const response = await fetch("http://localhost:3000/api/auth/likebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          gameId: game.Id_Game,
        }),
      });

      if (!response.ok) {
        book.Has_Liked = !book.Has_Liked;
        book.Total_Likes -= 1;
      }
    },
    async unLike(game) {
      if (!this.isLoggedIn) {
        alert("Vous devez être connecté pour aimer un jeu!");
        return;
      }

      book.Has_Liked = !book.Has_Liked;
      book.Total_Likes -= 1;

      const response = await fetch("http://localhost:3000/api/auth/unlikeBook", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          bookId: book.Id_Book,
        }),
      });

      if (!response.ok) {
        book.Has_Liked = !book.Has_Liked;
        book.Total_Likes += 1;
      }
    },

    goTo(bookId) {
      this.$router.push({ name: "BookView", query: { id: bookId } });
    }
  },
  */
</script>

<template>
  <div class="game-card">
    <div class="image-container">
      <img :src="this.image" alt="Jeu" />
    </div>
    <p class="game-title">{{ this.title }}</p>
    <div class="icons">
      <img src="@/assets/coeur.svg" alt="Like" class="icon" />
      <img src="@/assets/etoile.svg" alt="Favori" class="icon" />
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
