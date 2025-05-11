<template>
    <div class="event-card">
      <div class="event-header">
        <div class="calendar-block">
          <div class="calendar">
            <img src="@/assets/calendrier.svg" alt="Calendrier" class="calendar-asset" />
            <div class="calendar-text">
              <div class="month">June</div>
              <div class="day">27</div>
            </div>
          </div>
          <div class="time">18h - 23h</div>
        </div>
        <div class="event-info">
          <h2 class="event-title">Session jeux de plateau</h2>
          <div class="participants">
            <img src="@/assets/utilisateur.svg" alt="Utilisateurs" class="user-icon"/>
            <span>40</span>
          </div>
        </div>
      </div>
      <p class="games">Jeux : Carcassone, Risk, Catan, Mysterium</p>
      <button class="register-btn">S’inscrire</button>
    </div>
  </template>
  
  
<script>
  export default {
    name: 'EventCard'
  }
</script>
  
<style scoped>
  .event-card {
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 15px;
    width: 300px;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
  width: 50px; 
  }

  .calendar {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0; 
  display: flex;
  align-items: center;
  justify-content: center;
}
  
  .calendar-asset {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .calendar-text {
    position: absolute;
    top: 3px;
    left: 0;
    right: 0;
    text-align: center;
    color: #3F424D;
    font-weight: bold;
  }
  
  .calendar-text .month {
    font-size: 8px;
  }
  
  .calendar-text .day {
    margin-top: 3px;
    font-size: 18px;
  }

  .time {
  font-size: 8px;
  color: #3F424D;
  text-align: center;
  }

  .event-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
  }
  
  .event-title {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
  
  .participants {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
  }

  .user-icon {
  width: 16px;
  height: 16px;
  }
  
  .games {
    font-size: 15px;
    margin: 5px 0;
  }
  
  .register-btn {
    align-self: flex-start;
    border: 2px solid #3F424D;
    padding: 0.5em 1em;
    text-align: center;
    border-radius: 0.4em;
    color: #3F424D;
    backdrop-filter: blur(3px);
    background-color: rgba(255, 255, 255, 0.3);
    transition: 0.3s;
    animation: fadeInLeft ease 1.5s;
    margin-top: 2em;
  }
  
  .register-btn:hover {
    transform: scale(1.04);
    transition: 0.3s;
  }
</style>
  