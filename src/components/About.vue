<template>
  <section class="about-view">
    <div class="content">
      <div class="text">
        <h1>Découvrez notre café !</h1>
        <p class="infos">
          Bienvenue au café ludique <strong>PlayBack</strong> !
        </p>
        <p class="infos">
          Un lieu chaleureux et convivial où passionnés de jeux de société et
          curieux se retrouvent autour d’un bon café.
        </p>
        <p class="infos">
          Que ce soit pour découvrir de nouveaux jeux, participer à des soirées
          thématiques ou simplement partager un moment entre amis, notre café
          est l’endroit idéal pour allier détente, stratégie et rires.
        </p>
      </div>
      <div class="image">
        <img src="@/assets/cafe.png" alt="Café ludique" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Cafe",
};
</script>

<style scoped>
.about-view {
  padding: 3em 0;
  width: 100%;
  background-color: white;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  width: 75%;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.text {
  flex: 1 1 60%;
  font-size: 1.8em;
  line-height: 1.3;
  text-align: justify;
  margin-right: 1em;
  max-width: 680px;
}

.text h1 {
  font-size: 2em;
  color: #3f424d;
  margin-bottom: 1em;
}

.image {
  flex: 1 1 35%;
  text-align: end;
  margin-left: 1.5em;
}

.image img {
  width: 70%;
}

/* Responsive */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    text-align: center;
  }

  .text {
    padding-right: 0;
    margin-bottom: 2em;
  }

  .image {
    text-align: center;
  }

  .image img {
    max-width: 180px;
  }
}
</style>
