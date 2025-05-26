<template>
  <div class="searchbar-container">
    <div class="searchbar">
      <div class="searchbar-input">
        <input type="text" :placeholder="placeholder" v-model="searchQuery" />
      </div>
      <div class="searchbar-icon">
        <img @click="onSearch" src="@/assets/loupe.svg" alt="recherche" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placeholder: "Rechercher...",
      searchQuery: "",
    };
  },
  methods: {
    onSearch() {
      this.$emit("search", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.searchbar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.searchbar {
  display: flex;
  align-items: center;
  border: solid 2px #bee3db;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  background-color: transparent; /* Pas de fond blanc */
}

.searchbar-input {
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.searchbar input {
  width: 100%;
  border: none;
  background-color: transparent; /* Enlève le fond blanc */
  color: white;
  font-size: 1rem;
  outline: none;
}

.searchbar input::placeholder {
  color: white;
  opacity: 0.8; /* Facultatif : légère transparence pour un effet plus doux */
}

.searchbar-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  padding: 10px;
  background-color: #bee3db;
  border-radius: 0 10px 10px 0;
}

.searchbar img {
  cursor: pointer;
  width: 20px;
  height: 20px;
}
</style>
