<template>
  <section class="auth-page">
    <div class="auth-panel">
      <h2 class="auth-title">Connexion</h2>
      <form @submit.prevent="submitForm" class="auth-form">
        <label for="email" class="auth-label">Email</label>
        <input
          type="text"
          id="email"
          v-model="email"
          name="email"
          placeholder="Ex : ajdmabuerdcjk"
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

        <button type="submit" class="auth-btn" @click="connexion">
          Connexion
        </button>
      </form>
      <p class="auth-foot">
        Vous n’avez pas encore de compte ?
        <router-link to="/register" class="inscription"
          >Inscription</router-link
        >
      </p>
    </div>
  </section>
</template>

<style scoped>
.auth-page {
  color: #333;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  height: 80vh;
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
  min-width: 100px;
  font-size: 16px;
}

.inscription {
  color: #89b0ae;
  text-decoration: none;
}

@media (max-width: 768px) {
  .auth-panel {
    width: 80vw;
  }
}
</style>

<script>
import router from "@/router";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      // Handle login logic here
      fetch("https://play-back.api.arcktis.fr/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Login failed");
          }
          return response.json();
        })
        .then((data) => {
          // Store the token in local storage
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.user.role);
          localStorage.setItem(
            "tokenExpiration",
            new Date().getTime() + 3600000
          ); // 1 hour expiration
          router.push("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>
