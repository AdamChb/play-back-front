<template>
  <div class="event-card" :class="{ medium: medium, large: large }">
    <div class="event-header">
      <div class="calendar-block">
        <div class="calendar" :class="{ medium: medium, large: large }">
          <img
            src="@/assets/calendrier.svg"
            alt="Calendrier"
            class="calendar-asset"
            :class="{ medium: medium, large: large }"
          />
          <div class="calendar-text" :class="{ medium: medium, large: large }">
            <div class="month" :class="{ medium: medium, large: large }">
              {{ month }}
            </div>
            <div class="day" :class="{ medium: medium, large: large }">{{ day }}</div>
          </div>
        </div>
        <div class="time" :class="{ medium: medium, large: large }">
          {{ time }}
        </div>
      </div>
      <div class="event-info">
        <h2 class="event-title" :class="{ medium: medium, large: large }">
          {{ title }}
        </h2>
        <div class="participants" :class="{ medium: medium, large: large }">
          <img
            src="@/assets/utilisateur.svg"
            alt="Utilisateurs"
            class="user-icon"
            :class="{ medium: medium, large: large }"
          />
          <span>{{ nb_participants }}</span>
        </div>
      </div>
    </div>
    <!-- <p class="games" :class="{ medium: medium, large: large }">
      Jeux : Carcassone, Risk, Catan, Mysterium
    </p> -->
    <button class="register-btn" :class="{ medium: medium, large: large }" @click="handleRegisterClick(eventId)">
      S’inscrire
    </button>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    eventId: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      default: "medium",
    },
    date: {
      type: String,
      default: "2024-05-27 18:00:00",
    },
    duration: {
      type: Number,
      default: 60,
    },
    title: {
      type: String,
      default: "Session jeux de plateau",
    },
    nb_participants: {
      type: Number,
      default: 40,
    },
    games: {
      type: Array,
      default: () => ["Carcassone", "Risk", "Catan", "Mysterium"],
    },
  },
  data() {
    return {
      medium: false,
      large: false,
    };
  },
  computed: {
    month() {
      const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
      ];
      const dateObj = new Date(this.date);
      return months[dateObj.getMonth()];
    },
    day() {
      const dateObj = new Date(this.date);
      return dateObj.getDate();
    },
    time() {
      const dateObj = new Date(this.date);
      const pad = (n) => n.toString().padStart(2, "0");
      const startH = pad(dateObj.getHours());
      const startM = pad(dateObj.getMinutes());
      // Calcul de l'heure de fin
      const endDate = new Date(dateObj.getTime() + (parseInt(this.duration) * 60000));
      const endH = pad(endDate.getHours());
      const endM = pad(endDate.getMinutes());
      return `${startH}H${startM} - ${endH}H${endM}`;
    }
  },
  methods: {
  handleRegisterClick(eventId) {
    console.log("Inscription à l'événement ID:", eventId);
    const isConnected = !!localStorage.getItem("token");
    if (!isConnected) {
      alert("Vous devez être connecté pour vous inscrire à un événement !");
      return;
    }
    fetch(`http://localhost:3000/api/events/enroll/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert(response.message || "Inscription réussie !");
        } else {
          alert("Erreur lors de l'inscription. Veuillez réessayer plus tard.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription :", error);
        alert("Une erreur est survenue. Veuillez réessayer plus tard.");
      });
  },
},
  beforeMount() {
    if (this.size === "medium") {
      this.medium = true;
    } else if (this.size === "large") {
      this.large = true;
    }
  },
};
</script>

<style scoped>
.event-card {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.event-card.medium {
  width: 20%;
  min-width: 200px;
  padding: 15px;
}

.event-card.large {
  width: 41%;
  min-width: 250px;
  padding: 25px;
}

.event-header {
  display: flex;
  gap: 15px;
}

.calendar-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.calendar-block.medium {
  width: 40px;
}

.calendar-block.large {
  width: 70px;
}

.calendar {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: contain;
}

.calendar.medium {
  width: 40px;
  height: 40px;
}

.calendar.large {
  width: 70px;
  height: 70px;
}

.calendar-asset {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.calendar-text {
  position: absolute;
  text-align: center;
  color: #3f424d;
  font-weight: bold;
}

.calendar-text.medium {
  top: 3px;
  left: 0;
  right: 0;
}

.calendar-text.large {
  top: 5px;
  left: 0;
  right: 0;
}

.calendar-text .month.medium {
  font-size: 8px;
}

.calendar-text .month.large {
  font-size: 12px;
}

.calendar-text .day.medium {
  margin-top: 3px;
  font-size: 18px;
}

.calendar-text .day.large {
  margin-top: 5px;
  font-size: 35px;
}

.time.medium {
  font-size: 8px;
  color: #3f424d;
  text-align: center;
}

.time.large {
  font-size: 12px;
  color: #3f424d;
  text-align: center;
}

.event-info {
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 5px;
  gap: 2px;
}

.event-title {
  font-weight: bold;
}

.event-title.medium {
  margin: 0;
  font-size: 18px;
}

.event-title.large {
  margin: 0;
  font-size: 30px;
  font-weight: bold;
}

.participants {
  display: flex;
  align-items: center;
  gap: 5px;
}

.participants.medium {
  gap: 5px;
  font-size: 14px;
}

.participants.large {
  font-size: 20px;
}

.user-icon.medium {
  width: 16px;
  height: 16px;
}

.user-icon.large {
  width: 20px;
  height: 20px;
}

.games.medium {
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 15px;
}

.games.large {
  margin-top: 20px;
  margin-bottom: 8px;
  font-size: 20px;
}

.register-btn {
  align-self: flex-start;
  border: 2px solid #3f424d;
  padding: 0.5em 1em;
  text-align: center;
  border-radius: 0.4em;
  color: #3f424d;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.3s;
  animation: fadeInLeft ease 1.5s;
}

.register-btn.medium {
  width: 20%;
  min-width: 100px;
  font-size: 14px;
}

.register-btn.large {
  width: 30%;
  min-width: 150px;
  font-size: 20px;
}

.register-btn:hover {
  transform: scale(1.04);
  transition: 0.3s;
}
</style>
