<template>
    <section class="welcome">
        <div class="overlay">
            <h1 class="titre">
                Retrouvez tous <br/>vos rendez-vous jeux !
            </h1>
            <router-link to="/events"><button class="events-btn">Nos événements</button></router-link>
        </div>
    </section>
</template>

<script scoped>
    export default {
        name: 'Welcome'
    }
</script>

<style>
.welcome{
    background-image: url(@/assets/background.jpeg);
    background-size: cover;
    background-position: center;
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.overlay{
    padding: 2em;
    text-align: center;
    border-radius: 0.5em;
}

.titre{
    text-align: center;
    color: white;
    font-size: 4.9em;
    font-weight: bold;
    margin-bottom: 1em;
}
.events-btn {
    text-decoration: none;
    align-self: flex-start;
    border: 3px solid white;
    padding: 0.3em 0.6em;
    text-align: center;
    border-radius: 0.4em;
    color: white;
    backdrop-filter: blur(3px);
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
    transition: 0.3s;
    animation: fadeInLeft ease 1.5s;
    font-size: 1.5em;
  }
  
  .events-btn:hover {
    transform: scale(1.04);
    transition: 0.3s;
  }
</style>