<template>
  <header class="header">
    <div class="pc_header">
      <nav class="navbar">
        <router-link to="/" class="logo">
          <img src="../assets/logo.svg" alt="Logo" class="logo-img" />
          <span class="logo-text">PlayBack</span>
        </router-link>
        <ul class="nav-links">
          <li><router-link to="/events" class="onglets">Événements</router-link></li>
          <li>
            <router-link to="/games" class="onglets">Jeux de société</router-link>
          </li>
          <li>
            <router-link to="/event" class="onglets">Notre café</router-link>
          </li>
          <li>
            <router-link v-if="!connected" to="/login" class="login-header"
              >Connexion</router-link
            >
            <router-link v-else to="/myaccount" class="login-header"
              >Mon compte</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
    <div class="mobile_header">
      <nav class="navbar mobile_navbar">
        <router-link to="/" class="logo">
          <img src="../assets/logo.svg" alt="Logo" class="logo-img" />
          <span class="logo-text">PlayBack</span>
        </router-link>
        <div id="burger" @click="toggleMenu">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </nav>
      <div class="toggle_mobile_header">
        <div class="line">
          <router-link to="/" class="onglets">Événements</router-link>
        </div>
        <div class="line">
          <router-link to="/  " class="onglets">Jeux de société</router-link>
        </div>
        <div class="line">
          <router-link to="/event" class="onglets">Notre café</router-link>
        </div>
        <div class="line">
          <router-link v-if="!connected" to="/login" class="login-header"
            >Connexion</router-link
          >
          <router-link v-else to="/myaccount" class="login-header"
            >Mon compte</router-link
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      connected: false,
    };
  },
  methods: {
    toggleMenu() {
      const toggleHeader = document.querySelector(".toggle_mobile_header");
      toggleHeader.style.display =
        toggleHeader.style.display === "none" ||
        toggleHeader.style.display === ""
          ? "flex"
          : "none";
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  margin: 0;
  padding: 0;

  background-color: #3f424d;
  font-size: 18px;
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
  justify-content: space-around;
  align-items: center;
  gap: 40px;
  max-width: 70%;
  width: fit-content;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #bee3db;
  font-weight: bold;
}

.logo-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.logo-text {
  font-size: 24px;
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

.mobile_header {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  background-color: #3f424d;
  padding: 20px 0 0 0;
  row-gap: 10px;
}

.mobile_navbar {
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

#burger {
  height: 31px;
  width: 36px;
  margin-right: 1em;
}

#burger div {
  height: 5px;
  width: 36px;
  margin-bottom: 8px;
  transition: 0.3s;
  background-color: #bee3db;
  border-radius: 2.5px;
}

.toggle_mobile_header {
  display: none;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #3f424d;
  padding: 20px 0 0 0;
}

.line {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #bee3db;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .pc_header {
    display: none;
  }
  .mobile_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
