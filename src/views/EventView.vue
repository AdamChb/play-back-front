<template>
  <div class="event-view">
    <div class="event-card-wrapper">
      <div class="event-header">
        <div class="calendar-block">
          <div class="calendar">
            <img
              src="@/assets/calendrier.svg"
              alt="Calendrier"
              class="calendar-asset"
            />
            <div class="calendar-text">
              <div class="month">{{ month }}</div>
              <div class="day">{{ day }}</div>
            </div>
          </div>
          <div class="time">{{ event.startTime }} - {{ event.endTime }}</div>
        </div>

        <div class="event-details">
          <div class="event-title-row">
            <h2 class="event-title">{{ event.title }}</h2>
            <div class="action-right">
              <div class="event-participants">
                <img
                  src="@/assets/utilisateur.svg"
                  alt="Utilisateurs"
                  class="user-icon"
                />
                <span>{{ event.participants.current }}/{{ event.participants.max }}</span>
              </div>
              <button class="register-btn">S’inscrire</button>
            </div>
          </div>
          <p class="event-meta">Difficulté : {{ event.difficulty }}</p>
        </div>
      </div>

      <p class="event-description">
        {{ event.description }}
      </p>

      <h3 class="games-title">Jeux proposés</h3>
      <div class="games-container">
        <GameCard
          v-for="game in games"
          :key="game.id"
          :id="game.id"
          :title="game.title"
          :image="game.image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";

export default {
  name: "EventView",
  components: {
    GameCard,
  },
  data() {
    return {
      event: {
        title: "Session jeux de plateau",
        date: "2024-06-27",
        startTime: "18h",
        endTime: "23h",
        difficulty: "Débutants",
        participants: {
          current: 24,
          max: 40,
        },
        description:
          "Rejoins-nous pour une soirée conviviale autour des jeux de plateau ! Que tu sois stratège confirmé ou simple curieux, viens partager un bon moment, relever des défis, et découvrir de nouveaux jeux dans une ambiance détendue et chaleureuse.",
      },
      games: [
        {
          id: 1,
          title: "Carcassonne",
          image:
            "https://cf.geekdo-images.com/okM0dq_bEXnbyQTOvHfwRA__original/img/aVZEXAI-cUtuunNfPhjeHlS4fwQ=/0x0/filters:format(png)/pic6544250.png",
        },
        {
          id: 2,
          title: "Catan",
          image:
            "https://cf.geekdo-images.com/okM0dq_bEXnbyQTOvHfwRA__original/img/aVZEXAI-cUtuunNfPhjeHlS4fwQ=/0x0/filters:format(png)/pic6544250.png",
        },
        {
          id: 3,
          title: "Dixit",
          image:
            "https://cf.geekdo-images.com/okM0dq_bEXnbyQTOvHfwRA__original/img/aVZEXAI-cUtuunNfPhjeHlS4fwQ=/0x0/filters:format(png)/pic6544250.png",
        },
        {
          id: 4,
          title: "Monopoly",
          image:
            "https://cf.geekdo-images.com/okM0dq_bEXnbyQTOvHfwRA__original/img/aVZEXAI-cUtuunNfPhjeHlS4fwQ=/0x0/filters:format(png)/pic6544250.png",
        },
      ],
    };
  },
  computed: {
    day() {
      return new Date(this.event.date).getDate();
    },
    month() {
      return new Date(this.event.date).toLocaleString("default", {
        month: "long",
      });
    },
  },
};
</script>

<style scoped>
.event-view {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.event-card-wrapper {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 2rem;
  border-radius: 20px;
  width: 90%;
  max-width: 1000px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.event-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.calendar-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
}

.calendar {
  position: relative;
  width: 50px;
  height: 50px;
}

.calendar-asset {
  width: 100%;
  height: 100%;
}

.calendar-text {
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  text-align: center;
  color: #3f424d;
  font-weight: bold;
}

.calendar-text .month {
  font-size: 10px;
}

.calendar-text .day {
  font-size: 20px;
  margin-top: 2px;
}

.time {
  font-size: 10px;
  color: #3f424d;
  margin-top: 5px;
  text-align: center;
}

.event-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.event-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.event-title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.action-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.event-participants {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-icon {
  width: 20px;
  height: 20px;
}

.register-btn {
  border: 2px solid #3f424d;
  padding: 0.5em 1em;
  text-align: center;
  border-radius: 0.4em;
  color: #3f424d;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(3px);
  transition: 0.3s;
  font-size: 14px;
}

.register-btn:hover {
  transform: scale(1.04);
  transition: 0.3s;
}

.event-meta {
  font-size: 14px;
  color: #333;
  margin: 4px 0 2px 0;
}

.event-description {
  font-size: 16px;
  margin: 1.5rem 0;
  color: #333;
}

.games-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.games-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: start;
}
</style>
