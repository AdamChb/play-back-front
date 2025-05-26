<template>
  <div class="cafe-view">
    <div class="content-wrapper">
      <img src="@/assets/menu.png" alt="Menu du Café" class="menu-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CafeView"
}
</script>

<style scoped>
.cafe-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0; /* ✅ Ajoute de l’espace au-dessus et en dessous */
}

.content-wrapper {
  width: 90%;
  max-width: 1000px;
  background-color: rgba(255, 255, 255, 0.4); /* ✅ Plus blanc encore */
  backdrop-filter: blur(16px);               /* ✅ Flou un peu plus prononcé */
  -webkit-backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.menu-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
</style>
