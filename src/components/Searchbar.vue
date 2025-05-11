<template>
  <div class="searchbar-container">
    <div class="searchbar">
      <div class="searchbar-input">
        <input
          type="text"
          :placeholder="placeholder"
          v-model="searchQuery"
          @input="onSearch"
        />
      </div>
      <div class="searchbar-icon">
        <img @click="onSearch" src="@/assets/loupe.svg" alt="recherche" />
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      placeholder: "Rechercher un événement...",
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
}

.searchbar {
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
  align-items: center;
  border: solid 2px #bee3db;
  border-radius: 10px;
  width: 80%;
}

.searchbar-input {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 20px;
  width: 100%;
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

.searchbar input {
  width: 70%;
  text-overflow: ellipsis;
  border: none;
}

.searchbar img {
  cursor: pointer;
  width: 20px;
  height: 20px;
}
</style>
