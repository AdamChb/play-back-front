<template>
  <div class="create-event">
    <h1>Créer un évènement</h1>

    <!-- ---------- formulaire principal ---------- -->
    <form class="form" @submit.prevent="submitEvent">
      <div class="field">
        <label>Titre</label>
        <input v-model="form.title" required />
      </div>

      <div class="field">
        <label>Description</label>
        <textarea v-model="form.description" rows="4" required />
      </div>

      <div class="row">
        <div class="field">
          <label>Date & heure</label>
          <input type="datetime-local" v-model="form.date" required />
        </div>

        <div class="field">
          <label>Durée (min)</label>
          <input type="number" v-model.number="form.duration" min="30" required />
        </div>
      </div>

      <div class="row">
        <div class="field">
          <label>Lieu</label>
          <input v-model="form.location" required />
        </div>

        <div class="field">
          <label>Nb joueurs max</label>
          <input type="number" v-model.number="form.maxPlayers" min="2" required />
        </div>
      </div>

      <div class="field">
        <label>Difficulté</label>
        <select v-model="form.difficulty" required>
          <option value="Facile">Facile</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Difficile">Difficile</option>
        </select>
      </div>

      <!-- ---------- recherche & sélection de jeux ---------- -->
      <h2>Jeux présentés</h2>
      <Searchbar placeholder="Rechercher un jeu…" @search="searchGames" />

      <div class="games-search">
        <GameCard
          v-for="g in searchResults"
          :key="g.id"
          :id="g.id"
          :title="g.title"
          :image="g.image"
          @click.native.prevent="addGame(g)"
        />
        <p v-if="searchResults.length===0 && searchQuery">Aucun résultat</p>
      </div>

      <h3 v-if="selectedGames.length">Jeux sélectionnés :</h3>
      <div class="games-selected">
        <GameCard
          v-for="g in selectedGames"
          :key="g.id"
          :id="g.id"
          :title="g.title"
          :image="g.image"
          @click.native.prevent="removeGame(g.id)"
        />
      </div>

      <!-- ---------- bouton d’envoi ---------- -->
      <button class="submit" :disabled="loading">
        {{ loading ? "Création…" : "Créer l’évènement" }}
      </button>
    </form>
  </div>
</template>

<script>
import Searchbar  from "@/components/Searchbar.vue";
import GameCard   from "@/components/GameCard.vue";

export default {
  name: "CreateEventView",
  components: { Searchbar, GameCard },

  data() {
    return {
      loading: false,
      searchQuery: "",
      searchResults: [],
      selectedGames: [],
      form: {
        title: "",
        description: "",
        date: "",
        location: "",
        maxPlayers: 10,
        difficulty: "Facile",
        duration: 60,
      },
    };
  },

  created() {
    const token = localStorage.getItem("token");
    if (!token) this.$router.replace("/login");
  },

  methods: {
    /* --- jeux ---------------------------------------------------------------- */
    async searchGames(query) {
      this.searchQuery = query;
      if (!query) { this.searchResults = []; return; }
      try {
        const res  = await fetch(
          `https://play-back.api.arcktis.fr/api/games/search?name=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        this.searchResults = data.map(g => ({
          id:   Number(g.ID_jeu),
          title:g.nom,
          image:g.image,
        }));
      } catch (e) {
        console.error("Recherche jeux :", e);
      }
    },

    addGame(game) {
      if (this.selectedGames.find(g => g.id === game.id)) return;
      this.selectedGames.push(game);
    },

    removeGame(id) {
      this.selectedGames = this.selectedGames.filter(g => g.id !== id);
    },

    /* --- envoi ---------------------------------------------------------------- */
    async submitEvent() {
      const token = localStorage.getItem("token");
      if (!token) return alert("Connectez-vous.");

      this.loading = true;

      const body = {
        title:       this.form.title,
        description: this.form.description,
        date:        this.form.date,
        location:    this.form.location,
        maxPlayers:  this.form.maxPlayers,
        difficulty:  this.form.difficulty,
        duration:    this.form.duration,
        games:       this.selectedGames.map(g => g.id),
      };

      try {
        const res = await fetch(
          "https://play-back.api.arcktis.fr/api/events/create",
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`,
            },
            body:JSON.stringify(body),
          }
        );
        if (!res.ok) throw new Error(await res.text());
        alert("Évènement créé !");
        this.$router.push("/events");
      } catch (e) {
        console.error("Création évènement :", e);
        alert("Erreur lors de la création.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.create-event {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(6px);
  border-radius: 20px;
}

h1, h2, h3 { color:#3f424d; }

.form      { display:flex; flex-direction:column; gap:1rem; }
.row       { display:flex; gap:1rem; flex-wrap:wrap; }
.field     { flex:1; display:flex; flex-direction:column; gap:4px; }

.field input, .field textarea, .field select {
  padding:.5rem .7rem;
  border:1px solid #ccc;
  border-radius:8px;
  font-size:1rem;
}

.games-search, .games-selected {
  display:flex;
  gap:1rem;
  flex-wrap:wrap;
  margin-top:.5rem;
}

.submit {
  align-self:flex-start;
  padding:.6rem 1.4rem;
  background:#3f424d;
  color:#fff; border:none; border-radius:8px;
  cursor:pointer; transition:.2s;
}
.submit[disabled] { opacity:.6; cursor:default; }
.submit:not([disabled]):hover { transform:scale(1.05); }
</style>
