<template>
  <!-- la carte entière est cliquable -->
  <div class="event-card"
       :class="sizeClass"
       @click="emitCardClick">

    <!-- ───── En-tête : calendrier, titre, participants ───── -->
    <div class="event-header">
      <div class="calendar-block">
        <div class="calendar" :class="sizeClass">
          <img src="@/assets/calendrier.svg" alt="Calendrier"
               class="calendar-asset" />
          <div class="calendar-text" :class="sizeClass">
            <div class="month" :class="sizeClass">{{ month }}</div>
            <div class="day"   :class="sizeClass">{{ day   }}</div>
          </div>
        </div>
        <div class="time" :class="sizeClass">{{ time }}</div>
      </div>

      <div class="event-info">
        <h2 class="event-title" :class="sizeClass">{{ title }}</h2>
        <div class="participants" :class="sizeClass">
          <img src="@/assets/utilisateur.svg" alt="Utilisateurs"
               class="user-icon" :class="sizeClass" />
          <span>{{ nb_participants }}</span>
        </div>
      </div>
    </div>

    <!-- ───── Bouton inscription ───── -->
    <button class="register-btn"
            :class="sizeClass"
            @click.stop.prevent="handleRegisterClick">
      S’inscrire
    </button>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  emits: ["card-click"],               // ⚑ événement remonté vers le parent

  props: {
    eventId: { type: Number, required: true },

    /* options d’affichage */
    size:     { type: String, default: "medium" },  // "medium" | "large"
    date:     { type: String, default: "2024-05-27 18:00:00" },
    duration: { type: Number, default: 60 },

    /* données affichées */
    title:           { type: String, default: "Session jeux de plateau" },
    nb_participants: { type: Number, default: 40 },
  },

  computed: {
    /* classe utilitaire */
    sizeClass() { return { medium: this.size === "medium", large: this.size === "large" }; },

    /* calendrier */
    month() {
      const m = ["Janvier","Février","Mars","Avril","Mai","Juin",
                 "Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
      return m[new Date(this.date).getMonth()];
    },
    day() { return new Date(this.date).getDate(); },

    time() {
      const pad = (n) => n.toString().padStart(2, "0");
      const start = new Date(this.date);
      const end   = new Date(start.getTime() + this.duration * 60_000);
      return `${pad(start.getHours())}H${pad(start.getMinutes())} - `
           + `${pad(end.getHours())}H${pad(end.getMinutes())}`;
    },
  },

  methods: {
    /* remonte l’id au parent */
    emitCardClick() { this.$emit("card-click", this.eventId); },

    /* inscription */
    async handleRegisterClick() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vous devez être connecté pour vous inscrire !");
        return;
      }
      try {
        const res = await fetch(
          `https://play-back.api.arcktis.fr/api/events/enroll/${this.eventId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        alert(data.message || "Inscription réussie !");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de l’inscription, réessayez plus tard.");
      }
    },
  },
};
</script>

<style scoped>
/* Dimensions de la carte */
.event-card           { background:#fff; border-radius:15px; box-shadow:0 4px 12px rgba(0,0,0,.1); font-family:Arial, sans-serif; display:flex; flex-direction:column; gap:10px; cursor:pointer; }
.event-card.medium    { width:20%;  min-width:200px; padding:15px; }
.event-card.large     { width:41%;  min-width:250px; padding:25px; }

/* En-tête */
.event-header { display:flex; gap:15px; }
.calendar-block.medium { width:40px; }   .calendar-block.large { width:70px; }
.calendar.medium { width:40px; height:40px; } .calendar.large { width:70px; height:70px; }

.calendar           { position:relative; display:flex; align-items:center; justify-content:center; }
.calendar-asset     { width:100%; height:100%; object-fit:contain; }
.calendar-text      { position:absolute; text-align:center; color:#3f424d; font-weight:bold; }
.calendar-text.medium .month { font-size:8px;  } .calendar-text.large .month { font-size:12px; }
.calendar-text.medium .day   { font-size:18px; margin-top:3px; }
.calendar-text.large  .day   { font-size:35px; margin-top:5px; }

.time.medium { font-size:8px;  color:#3f424d; text-align:center; }
.time.large  { font-size:12px; color:#3f424d; text-align:center; }

.event-info          { display:flex; flex-direction:column; margin-top:5px; gap:2px; }
.event-title.medium  { font-size:18px; margin:0; }
.event-title.large   { font-size:30px; margin:0; font-weight:bold; }

.participants        { display:flex; align-items:center; gap:5px; }
.participants.medium { font-size:14px; }   .participants.large { font-size:20px; }
.user-icon.medium    { width:16px; height:16px; } .user-icon.large { width:20px; height:20px; }

/* Bouton */
.register-btn        { align-self:flex-start; border:2px solid #3f424d; border-radius:0.4em;
                       background:rgba(255,255,255,.3); backdrop-filter:blur(3px);
                       padding:.5em 1em; color:#3f424d; transition:.3s; }
.register-btn.medium { width:20%; min-width:100px; font-size:14px; }
.register-btn.large  { width:30%; min-width:150px; font-size:20px; }
.register-btn:hover  { transform:scale(1.04); }
</style>
