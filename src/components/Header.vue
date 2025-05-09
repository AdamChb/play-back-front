<template>
  <header class="header">
    <nav class="navbar">
      <router-link to="/" class="logo">
        <img src="../assets/logo.svg" alt="Logo" class="logo-img" />
        <span class="logo-text">PlayBack</span>
      </router-link>
      <ul class="nav-links">
        <li><router-link to="/" class="onglets">Événements</router-link></li>
        <li>
          <router-link to="/about" class="onglets">Jeux de société</router-link>
        </li>
        <li>
          <router-link to="/events" class="onglets">Notre café</router-link>
        </li>
        <li>
          <router-link to="/login" class="login-header">Connexion</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  width: 100%;
  margin: 0;
  padding: 0;

  background-color: #3f424d;
  font-size: 24px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  padding-left: 20px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 40px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #bee3db;
  font-weight: bold;
}

.logo-img {
  width: 70px;
  height: 70px;
  margin-right: 10px;
}

.logo-text {
  font-size: 30px;
  font-weight: bold;
}

ul {
  list-style: none;
  width: 60%;
  display: flex;
  justify-content: space-around;
  padding: 0;
  margin: 0;
}

.onglets {
  text-decoration: none;
  color: #bee3db;
}

.login-header {
  text-decoration: none;
  color: #000000;
  font-weight: bold;
  background-color: #bee3db;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
