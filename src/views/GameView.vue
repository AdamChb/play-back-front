<script>
export default {
  name: "GameCard",
  props: {
    game: Object,
    isLoggedIn: Boolean,
  },
  data() {
    return {
      game: {
        Id_jeu: 0,
        nom: "",
        description: "",
        annee_creation: 0,
        min_joueur: 0,
        max_joueur: 0,
        min_age: 0,
        rang: 0,
        note: 0,
        image: "",
      },
      isAdmin: false,
      hasLiked: false,
      hasFavorited: false
    };
  },
  methods: {
    toggleLike() {
      this.hasLiked = !this.hasLiked
    },
    toggleFavori() {
      this.hasFavorited = !this.hasFavorited
    }
  }
}
  /*
  COPIER COLLER DE HYBREAD

  async beforeMount() {
    const token = localStorage.getItem("token");
    let user;
    if (token) {
      user = JSON.parse(atob(token.split(".")[1]));
    } else {
      user = { id: 0};
    }

    this.isAdmin = user.admin;

    const ID_Book = this.$route.query.id;

    const response = await fetch(`http://localhost:3000/api/books/book/${user.id}/${ID_Book}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    this.book = data[0];
    console.log(this.book)
  },
  methods: {
    async deleteBook() {
      const ID_Book = this.$route.query.id;

      const response = await fetch(`http://localhost:3000/api/admin/deletebook/${ID_Book}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        this.$router.push("/homepageloggedin");
      }
    },
    async changeBook() {
      const ID_Book = this.$route.query.id;
      
      const response = await fetch(`http://localhost:3000/api/admin/modifybook/${ID_Book}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          ID_Book: this.book.ID_Book,
          Name_Book: document.querySelector("input[id=Name_Book]").value,
          Author: document.querySelector("input[id=Author]").value,
          ID_Category: document.querySelector("select[id=genre]").value,
          Stock: Number(document.querySelector("input[id=Stock]").value),
          ISBN: document.querySelector("input[id=ISBN]").value,
          Summary: document.querySelector("textarea[id=Summary]").value,
        }),
      });

      if (response.ok) {
        this.$router.push("/homepageloggedin");
      }
    },

    async toLike() {
      if (!this.isLoggedIn) {
        alert("You need to be logged in to like a recipe!");
        return;
      }

      this.book.Has_Liked = !this.book.Has_Liked;
      this.book.Total_Likes += 1;
      
      const response = await fetch("http://localhost:3000/api/auth/likebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          bookId: this.book.Id_Book,
        }),
      });

      if (!response.ok) {
        this.book.Has_Liked = !this.book.Has_Liked;
        this.book.Total_Likes -= 1;
      }
    },
    async unLike() {
      if (!this.isLoggedIn) {
        alert("You need to be logged in to like a recipe!");
        return;
      }

      this.book.Has_Liked = !this.book.Has_Liked;
      this.book.Total_Likes -= 1;

      const response = await fetch("http://localhost:3000/api/auth/unlikeBook", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          bookId: this.book.Id_Book,
        }),
      });

      if (!response.ok) {
        this.book.Has_Liked = !this.book.Has_Liked;
        this.book.Total_Likes += 1;
      }
    },
  },
};
</script>
*/

<template>
  <div class="background">
    <div id="game-view">
      <div class="bb-container">
        <div class="buttons">
          <!-- Button to bring the user to the last page -->
          <router-link to="/games" style="text-decoration: none">
            <div class="cta-button">
              <img src="@/assets/back-arrow.svg" alt="arrow icon" />
              Return
            </div>
          </router-link>

          <div class="admin-button" v-if="isAdmin">
            <button class="cta-button" @click="">Supprimer un jeu</button>
            <button class="cta-button" @click="">Modifier un jeu</button>
          </div>
        </div>

        <!-- Div contenant les infos pour un jeu -->
        <div class="jeu-container">
          <!-- Image jeu-->
          <div class="image_container">
            <img src="@/assets/jeu_ex.png" alt="Image du jeu" />
            //<img :src="game.image" alt="Image du jeu" class="game-image" />
          </div>

          <div class="game-info">
            <div class="game-header">
              <div v-if="!isAdmin" class="game-title">{{ game.title }}</div>
              <input v-else class="game-title-input" :value="game.title" @input="e => game.title = e.target.value" />

              <div class="icons">
                <img :src="hasLiked ? '/assets/coeur.svg' : '/assets/empty_coeur.svg'" class="icon" @click="toggleLike" alt="like" />
                <img :src="hasFavorited ? '/assets/etoile.svg' : '/assets/empty_etoile.svg'" class="icon" @click="toggleFavori" alt="favori" />
              </div>
            </div>

            <div class="game-stats">
              <div>Note moyenne : {{ game.note || '–' }}</div>
              <div>Classement : {{ game.ranking || '–' }}</div>
            </div>

            <div v-if="!isAdmin" class="game-description">{{ game.description }}</div>
            <textarea
              v-else
              class="game-description-input"
              :value="game.description"
              @input="e => game.description = e.target.value"
            ></textarea>
          </div>
        </div>
      </div>>
    </div>
  </div>
</template>

<!-- Style of the page -->
<style scoped>
.bb-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.cta-button {
  box-sizing: border-box;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4em 1em 0.4em 0.7em;
  text-align: center;
  border-radius: 0.4em;
  color: white;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.3s;
  margin-bottom: 1em;
  animation: fadeInLeft ease 1s;
}
.cta-button:hover {
  transform: scale(1.04);
  transition: 0.3s;
}

.cta-button img {
  width: 20px;
  margin-right: 10px;
}

.admin-button {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1em;
}

button.cta-button {
  cursor: pointer;
  font-size: 1em;
}

.background {
  background-image: url("../assets/bg.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  height: 93vh;
  width: 100%;
  display: flex;
  justify-content: center;
}

.jeu_container{
  border: 1px solid #ccc;
  border-radius: 16px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  color: #3F424D;
  max-width: 400px;
}

.image-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.game-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.game-info {
  padding: 16px;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.game-title {
  font-size: 1.2em;
  font-weight: bold;
}

.game-title-input {
  font-size: 1.2em;
  font-weight: bold;
  width: 70%;
  color: #3F424D;
}

.icons {
  display: flex;
  gap: 8px;
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.game-stats {
  margin-bottom: 12px;
}

.game-description {
  white-space: pre-wrap;
}

.game-description-input {
  width: 100%;
  min-height: 100px;
  color: #3F424D;
}

/* Responsive */
@media (max-width: 768px) {
  .book-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .book-image img {
    width: 150px;
  }

  .book-info {
    margin-left: 0;
    margin-top: 20px;
  }
  #book-view{
    padding-top: 8em;
    display: block;
  }
  .background {
    height: auto;
  }
}


</style>