import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Intercepteur global pour détecter un token expiré (401)
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const response = await originalFetch(...args);

  if (response.status === 401 || response.status === 403) {
    console.warn("Token expiré ou accès interdit, déconnexion automatique.");
    localStorage.removeItem("token");
    router.push("/login");
  }

  return response;
};

createApp(App).use(router).mount('#app');
