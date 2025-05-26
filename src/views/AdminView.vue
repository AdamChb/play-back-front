<template>
  <div class="container">
    <div class="admin-view">
      <h1 class="title">Gestion des utilisateurs</h1>

      <div class="content-wrapper">
        <div class="search-container">
          <div class="search-section">
            <Searchbar @search="search" />
          </div>
          <div class="add-user">
            <img src="@/assets/add.svg" alt="Ajouter un utilisateur" />
            <span>Add</span>
          </div>
        </div>

        <div class="card-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th class="info-column">Nom d'utilisateur</th>
                <th class="info-column">Rôle</th>
                <th class="icon-column"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="users.id">
                <td>{{ user.name }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <img src="@/assets/pinceau.svg" alt="Editer" class="icon" />
                  <img
                    src="@/assets/poubelle.svg"
                    alt="Supprimer"
                    class="icon"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="info-user">
          <h2 class="name">{{ actualUser.name }}</h2>
          <h3 class="email">{{ actualUser.email }}</h3>
          <p class="role">{{ actualUser.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Searchbar from "@/components/Searchbar.vue";
export default {
  name: "AdminView",
  components: {
    Searchbar,
  },
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Alice Dupont",
          role: "Administrateur",
        },
        {
          id: 2,
          name: "Bob Martin",
          role: "Employé",
        },
        {
          id: 3,
          name: "Charlie Leblanc",
          role: "Client",
        },
      ],
      actualUser: {
        id: null,
        name: "Nom d'utilisateur",
        email: "Email",
        role: "Rôle",
      },
    };
  },
  methods: {
    search(query) {
      // Implement search functionality here
      console.log("Searching for:", query);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.admin-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 80%;
  align-self: center;
}
.title {
  font-size: 3em;
  font-weight: 800;
  color: white;
  margin-bottom: 20px;
}
.content-wrapper {
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  gap: 2em;
}

.search-container {
  display: flex;
  justify-content: space-between;
  width: 60%;
}

.search-section {
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
}

.add-user {
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  background-color: #ffffff;
  width: 150px;
  border: 2px solid #3f424d;
  border-radius: 10px;
  color: #3f424d;
  font-size: 1.2em;
}

.add-user img {
  width: 15px;
  height: 15px;
}

.card-container {
  display: flex;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.admin-table {
  width: 100%;
  border: 5px solid #3f424d;
  border-collapse: collapse;
  margin-top: 20px;
}

.info-column {
  width: 45%;
}

.icon-column {
  width: 10%;
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 10px;
}

.admin-table th {
  background-color: #89b0ae;
  color: white;
  padding: 12px;
  text-align: left;
}

.admin-table tr:nth-child(even) {
  background-color: #ffffff;
}

.admin-table tr:nth-child(odd) {
  background-color: #bee3db;
}

.admin-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  color: #000000;
}

.info-user {
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  color: #000000;
  padding: 2em;
  border-radius: 10px;
}
</style>
