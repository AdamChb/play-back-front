Parfait ! Je vais ajuster ton composant `Preview.vue` pour qu’il corresponde au design que tu as montré dans la capture d’écran (type Figma) :

### 🎯 Objectifs selon ton image :

1. **Centrage vertical du contenu** dans la section (titre + bouton + cartes).
2. **Espacement harmonieux entre les éléments.**
3. **Header et bouton sur la même ligne**, avec bon alignement.
4. **Deux cartes bien centrées**, avec un léger fond et ombre.
5. **Polices cohérentes et tailles ajustées.**

---

### ✅ Ton composant `Preview.vue` corrigé et stylisé :

```vue
<template>
  <section class="preview-view">
    <div class="container">
      <div class="header">
        <h1>Nos prochains événements</h1>
        <router-link to="/events">
          <button class="events-btn">Voir tous les évènements</button>
        </router-link>
      </div>

      <div class="events">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :date="event.date"
          :title="event.title"
          :time="event.time"
          :players="event.players"
          :games="event.games"
        />
      </div>
    </div>
  </section>
</template>

<script>
import EventCard from './EventCard.vue';
export default {
  components: { EventCard },
  data() {
    return {
      events: [
        {
          id: 1,
          date: '27',
          title: 'Session jeux de plateau',
          time: '19h - 23h',
          players: 40,
          games: ['Carcassone', 'Risk', 'Catan', 'Mysterium']
        },
        {
          id: 2,
          date: '28',
          title: 'Tournoi',
          time: '19h - 23h',
          players: 12,
          games: ['Dixit', 'Monopoly']
        }
      ]
    };
  }
};
</script>

<style scoped>
.preview-view {
    background-color: #BEE3DB;
    padding: 2em 1.5em;
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
  width: 100%;
  max-width: 1200px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;
    flex-wrap: wrap;
    gap: 1em;
}

h1 {
    font-size: 3em;
    color: #3F424D;
}

.events-btn {
    text-decoration: none;
    align-self: flex-start;
    border: 3px solid #3F424D;
    padding: 0.3em 0.6em;
    text-align: center;
    border-radius: 0.4em;
    color: #3F424D;
    backdrop-filter: blur(3px);
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
    transition: 0.3s;
    animation: fadeInLeft ease 1.5s;
    font-size: 1.5em;
}

.events {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    justify-content: center;
}
</style>