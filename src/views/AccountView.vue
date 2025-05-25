<template>
  <div class="account-view">
    <!-- Mon compte -->
    <div class="account-section">
      <h2 class="section-title">
        <img src="@/assets/compte.svg" class="icon" />
        Mon compte
      </h2>
      <div class="account-form">
        <input type="text" placeholder="CurrentUsername" />
        <input type="password" placeholder="********" />
        <div class="account-actions">
          <button class="btn">Changer nom d'utilisateur</button>
          <button class="btn">Changer mot de passe</button>
        </div>
      </div>
    </div>

    <!-- Mes évènements -->
    <div class="event-section">
      <h3 class="section-title">Mes évènements <span class="count">32</span></h3>
      <div class="card-scroll-wrapper">
        <div class="scroll-arrow left" @click="scrollLeft('eventsRow')">
          <span>&#8249;</span>
        </div>
        <div class="card-row" ref="eventsRow">
          <EventCard class="event-card" />
          <EventCard class="event-card" />
          <EventCard class="event-card" />
          <EventCard class="event-card" />
          <EventCard class="event-card" />
          <EventCard class="event-card" />
          <EventCard class="event-card" />
        </div>
        <div class="scroll-arrow right" @click="scrollRight('eventsRow')">
          <span>&#8250;</span>
        </div>
      </div>
    </div>

    <!-- Mes anciens évènements -->
    <div class="event-section">
      <h3 class="section-title">Mes anciens évènements <span class="count">32</span></h3>
      <div class="card-scroll-wrapper">
        <div class="scroll-arrow left" @click="scrollLeft('oldEventsRow')">
          <span>&#8249;</span>
        </div>
        <div class="card-row" ref="oldEventsRow">
          <EventCard class="event-card" />
          <EventCard class="event-card" />
          <EventCard class="event-card" />
        </div>
        <div class="scroll-arrow right" @click="scrollRight('oldEventsRow')">
          <span>&#8250;</span>
        </div>
      </div>
    </div>

    <!-- Mes jeux favoris -->
    <div class="game-section">
      <h3 class="section-title">
        Mes jeux favoris
        <img src="@/assets/empty_coeur.svg" class="icon" />
        <span class="count">32</span>
      </h3>
      <div class="card-scroll-wrapper">
        <div class="scroll-arrow left" @click="scrollLeft('favoritesRow')">
          <span>&#8249;</span>
        </div>
        <div class="card-row" ref="favoritesRow">
          <GameCard class="game-card" />
          <GameCard class="game-card" />
          <GameCard class="game-card" />
          <GameCard class="game-card" />
          <GameCard class="game-card" />
          <GameCard class="game-card" />
        </div>
        <div class="scroll-arrow right" @click="scrollRight('favoritesRow')">
          <span>&#8250;</span>
        </div>
      </div>
    </div>

    <!-- Mes jeux à tester -->
    <div class="game-section">
      <h3 class="section-title">
        Mes jeux à tester
        <img src="@/assets/empty_star.svg" class="icon" />
        <span class="count">32</span>
      </h3>
      <div class="card-scroll-wrapper">
        <div class="scroll-arrow left" @click="scrollLeft('toTestRow')">
          <span>&#8249;</span>
        </div>
        <div class="card-row" ref="toTestRow">
          <GameCard class="game-card" />
          <GameCard class="game-card" />
          <GameCard class="game-card" />
        </div>
        <div class="scroll-arrow right" @click="scrollRight('toTestRow')">
          <span>&#8250;</span>
        </div>
      </div>
    </div>

    <!-- Mes jeux essayés -->
    <div class="game-section">
      <h3 class="section-title">
        Mes jeux essayés
        <img src="@/assets/verifier.svg" class="icon" />
        <span class="count">32</span>
      </h3>
      <div class="card-scroll-wrapper">
        <div class="scroll-arrow left" @click="scrollLeft('testedRow')">
          <span>&#8249;</span>
        </div>
        <div class="card-row" ref="testedRow">
          <GameCard class="game-card" />
          <GameCard class="game-card" />
          <GameCard class="game-card" />
        </div>
        <div class="scroll-arrow right" @click="scrollRight('testedRow')">
          <span>&#8250;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import GameCard from '@/components/GameCard.vue'

export default {
  name: 'AccountView',
  components: {
    EventCard,
    GameCard
  },
  methods: {
    scrollRight(refName) {
      const container = this.$refs[refName];
      if (container && container.scrollBy) {
        // Trouve la largeur d’une carte + son espace
        const card = container.querySelector('.event-card, .game-card');
        const scrollAmount = card ? card.offsetWidth + 24 : 250;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    },
    scrollLeft(refName) {
    const container = this.$refs[refName];
    if (container && container.scrollBy) {
      const card = container.querySelector('.event-card, .game-card');
      const scrollAmount = card ? card.offsetWidth + 24 : 250;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
  }
}
</script>

<style scoped>
.account-view {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3F424D;
}

.count {
  background-color: #e0f0ff;
  color: #3F424D;
  border-radius: 10px;
  padding: 0.2rem 0.6rem;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.icon {
  width: 20px;
  height: 20px;
}

.account-section {
  width: 100%;
  max-width: 1200px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.account-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.account-form input {
  padding: 0.7rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.account-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #b5e3d8;
  color: #2d4037;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}

.event-section,
.game-section {
  width: 100%;
  max-width: 1200px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-scroll-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.card-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 1rem;
}

.card-row::-webkit-scrollbar {
  display: none;
}

.scroll-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-40%);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #3F424D;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}


.scroll-arrow:hover {
  background-color: #e6e6e6;
}

.scroll-arrow.left {
  left: 0;
}

.scroll-arrow.right {
  right: 0;
}

.card-row ::v-deep(.event-card) {
  flex: 0 0 auto;
  width: 300px; /* adapte à la taille réelle de tes cartes */
}

.card-row ::v-deep(.game-card) {
  flex: 0 0 auto;
  width: 220px; /* adapte à la taille réelle de tes cartes */
}
</style>
