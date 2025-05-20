<template>
    <div class="games-view">
      <h1 class="title">Jeux</h1>
  
      <div class="content-wrapper">
        <div class="search-container">
          <Searchbar />
        </div>
  
        <div class="card-container">
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
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
  