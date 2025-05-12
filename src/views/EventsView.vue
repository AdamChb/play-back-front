<template>
    <div class="events-view">
      <h1 class="title">Évènements</h1>
  
      <div class="content-wrapper">
        <div class="search-container">
          <Searchbar />
        </div>
  
        <div class="card-container">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import EventCard from '@/components/EventCard.vue'
  import Searchbar from '@/components/Searchbar.vue'
  
  export default {
    name: 'EventsView',
    components: {
      EventCard,
      Searchbar
    }
  }
  </script>
  
  <style scoped>
  .events-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-image: url('@/assets/background.jpeg');
    background-size: cover;
    background-position: center;
    min-height: 80vh;
  }
  
  .title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: white;
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
  