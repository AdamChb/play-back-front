<template>
  <footer class="footer">
    <div class="footer-content">
      <router-link to="/" class="logo">
        <img src="../assets/logo.svg" alt="Logo" class="logo-img" />
        <span class="logo-text">PlayBack</span>
      </router-link>
      <p>© 2025 Adam CHABA – Doryan DENIS – Eva MAROT – Sacha PORTAL</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  width: 100%;
  background-color: #3f424d;
  color: #bee3db;
  padding: 20px 0;
  text-align: center;
}

.logo-img {
  width: 50px;
  height: 50px;
}

.logo {
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #bee3db;
  font-weight: bold;
}

.logo-text {
  font-size: 24px;
}
</style>
