<template>
  <div class="game-view">
    <div class="game-card-wrapper">
      <div class="game-content">
        <div class="game-img">
          <img src="@/assets/jeu_ex.png" alt="Image du jeu" />
        </div>
        <div class="game-details">
          <div class="game-title-row">
            <h2 class="game-title">Risk</h2>
            <div class="action-right">
              <div class="assets">
                <img src="@/assets/empty_etoile.svg" alt="Star" class="heart-icon" />
                <img src="@/assets/empty_coeur.svg" alt="Like" class="heart-icon" />
              </div>
            </div>
          </div>
          <p class="genre text-shadow">Genre : Plateau, construction</p>
          <p class="infos text-shadow">3-7 joueurs</p>
          <p class="infos text-shadow">Année de publication : 2010</p>
          <p class="infos text-shadow">Classement du jeu : ?</p>
          <p class="infos text-shadow">Note moyenne du jeu : ?</p>
          <p class="infos text-shadow">Age minimum : 10</p>
        </div>
      </div>

      <p class="game-description text-shadow">
        Dans Risk, chaque joueur incarne un général en quête de domination mondiale. Armées en main, ils s’affrontent pour conquérir des territoires sur une carte du monde, en utilisant stratégie, alliances temporaires et jets de dés.
        Le but ? Éliminer ses adversaires et contrôler tous les continents. À chaque tour, les joueurs renforcent leurs positions, lancent des offensives et déplacent leurs troupes. Mais attention : une attaque mal calculée peut tout faire basculer.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameView"
}
</script>

<style scoped>
.game-view {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-card-wrapper {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 2rem;
  border-radius: 20px;
  width: 90%;
  max-width: 1000px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.game-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
}

.game-img {
  flex: 1 1 250px;
  max-width: 300px;
}

.game-img img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.game-details {
  flex: 2 1 300px;
  display: flex;
  flex-direction: column;
}

.game-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.game-title {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
}

.action-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.assets {
  display: flex;
  align-items: center;
  gap: 8px;
}

.heart-icon {
  width: 40px;
  height: 40px;
}

.genre,
.infos,
.game-description,
.game-title {
  color: #333;
}

.genre {
  font-size: 19px;
  margin: 4px 0 2px 0;
}

.infos {
  font-size: 14px;
  margin: 4px 0 2px 0;
}

.game-description {
  font-size: 16px;
  text-align: justify;
  margin-top: 0;
}

.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

/* Responsive : image au-dessus du texte si petit écran */
@media (max-width: 768px) {
  .game-content {
    flex-direction: column;
    align-items: center;
  }

  .game-details {
    align-items: center;
  }

  .game-title-row {
    flex-direction: column;
  }
}
</style>
