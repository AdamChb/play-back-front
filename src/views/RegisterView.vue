<template>
  <section class="auth-page">
    <div class="auth-panel">
      <h2 class="auth-title">Inscription</h2>
      <form @submit.prevent="submitForm" class="auth-form">
        <label for="username" class="auth-label">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          v-model="username"
          name="username"
          placeholder="Ex : ajdmabuerdcjk"
          class="auth-input"
          required
        />

        <label for="email" class="auth-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          name="email"
          placeholder="Ex : ajdmab@gmail.com"
          class="auth-input"
          required
        />

        <label for="password" class="auth-label">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          name="password"
          placeholder="•••••••••••••"
          class="auth-input"
          required
        />

        <label for="confirmPassword" class="auth-label"
          >Confirmer le mot de passe</label
        >
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          name="confirmPassword"
          placeholder="•••••••••••••"
          class="auth-input"
          required
        />

        <button type="submit" class="auth-btn">Inscription</button>
      </form>
      <p class="auth-foot">
        Vous avez déjà un compte ?
        <router-link to="/login" class="connexion">Connexion</router-link>
      </p>
    </div>
  </section>
</template>

<style scoped>
.auth-page {
  background-image: url(@/assets/background.jpeg);
  background-size: cover;
  color: #333;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  height: 100vh;
}
.auth-panel {
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  padding: 20px 40px;
  width: 30vw;
}
.auth-title {
  margin-bottom: 20px;
  font-size: 24px;
}
.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-label {
  color: #333;
  margin-bottom: 5px;
}

.auth-input {
  font-size: 14px;
  padding: 10px;
  border: 2px solid grey;
  border-radius: 10px;
  margin-bottom: 15px;
}

.auth-btn {
  background-color: #89b0ae;
  color: #fff;
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 25%;
  font-size: 16px;
}

.connexion {
  color: #89b0ae;
  text-decoration: none;
}
</style>

<script>
import router from "@/router";

export default {
  name: "RegisterView",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    submitForm() {
      // Validate the form
      if (this.password !== this.confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }
      // Simulate a successful registration
      alert("Inscription réussie !");
      router.push("/login");
    },
  },
};
</script>
