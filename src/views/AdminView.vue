<template>
  <div class="container">
    <div class="admin-view">
      <h1 class="title">Gestion des utilisateurs</h1>

      <div class="content-wrapper">
        <div class="search-container">
          <div class="search-section">
            <Searchbar @search="search" />
          </div>
          <div class="add-user" @click="addUser">
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
                  <img
                    src="@/assets/pinceau.svg"
                    alt="Editer"
                    class="icon"
                    @click="editUser(user.id)"
                  />
                  <img
                    src="@/assets/poubelle.svg"
                    alt="Supprimer"
                    class="icon"
                    @click="deleteUser(user.id)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="section-add" class="info-user">
          <h2 class="name">Nom d'utilisateur</h2>
          <input
            v-if="actualUser.id"
            class="name-input"
            type="text"
            v-model="actualUser.name"
            placeholder="Ex : ajdmabuerdcjk"
          />
          <h3 class="email">Email</h3>
          <input
            v-if="actualUser.id"
            class="email-input"
            type="email"
            v-model="actualUser.email"
            placeholder="Ex : ajdmab@gmail.com"
          />
          <h3 class="password">Mot de passe</h3>
          <input
            v-if="actualUser.id === -1"
            class="email-input"
            type="password"
            v-model="actualUser.password"
            placeholder="•••••••••••••"
          />
          <input
            v-else-if="actualUser.id"
            class="email-input"
            type="password"
            v-model="actualUser.password"
            placeholder="•••••••••••••"
            disabled
          />
          <p class="role">Rôle</p>
          <select
            v-model="actualUser.role"
            v-if="actualUser.id"
            class="role-select"
          >
            <option value="Administrateur">Administrateur</option>
            <option value="Employé">Employé</option>
            <option value="Client">Client</option>
          </select>
          <button v-if="actualUser.id" class="save-btn" @click="saveUser()">
            Enregistrer
          </button>
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
      users: Object,
      actualUser: {
        id: null,
        name: "",
        email: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    search(query) {
      console.log("Searching for:", query);
      if (query.trim() === "") {
        this.getAllUsers();
        return;
      }
      fetch(
        "https://play-back.api.arcktis.fr/api/auth/search?string=" + query,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          return response.json();
        })
        .then((data) => {
          this.users = [];
          data.forEach((user) => {
            this.users.push({
              id: user.ID_utilisateur,
              name: user.pseudo,
              email: user.email,
              role: ["Administrateur", "Employé", "Client"][user.role_user],
            });
          });
        })
        .catch((error) => console.error("Error:", error));
    },
    addUser() {
      // Logic to add a new user
      document.getElementById("section-add").scrollIntoView({
        behavior: "smooth",
      });
      this.actualUser = {
        id: -1,
        name: "",
        email: "",
        password: "",
        role: "Client",
      };
    },
    editUser(userid) {
      // Logic to edit the selected user
      this.actualUser = this.users.find((user) => user.id === userid);
    },
    deleteUser(userId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
        fetch("https://play-back.api.arcktis.fr/api/auth/delete/" + userId, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id: userId }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete user");
            }
            this.users = this.users.filter((user) => user.id !== userId);
            if (this.actualUser.id === userId) {
              this.actualUser = {
                id: null,
                name: "",
                email: "",
                role: "Client",
              };
            }
          })
          .catch((error) => console.error("Error:", error));
      }
    },
    saveUser() {
      if (!this.actualUser.name || !this.actualUser.email) {
        alert("Veuillez remplir tous les champs.");
        return;
      }
      const role =
        this.actualUser.role === "Administrateur"
          ? 0
          : this.actualUser.role === "Employé"
          ? 1
          : 2;
      if (this.actualUser.id === -1) {
        fetch("https://play-back.api.arcktis.fr/api/auth/create", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pseudo: this.actualUser.name,
            email: this.actualUser.email,
            password: this.actualUser.password,
            role_user: role,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to create user");
            }
            return response.json();
          })
          .then((data) => {
            console.log("User created:", data);
            this.users.push({
              id: data.user.userId,
              name: this.actualUser.name,
              email: this.actualUser.email,
              role: ["Administrateur", "Employé", "Client"][role],
            });
            this.actualUser = { id: null, name: "", email: "", role: "Client" };
          })
          .catch((error) => console.error("Error:", error));
      } else {
        fetch(`https://play-back.api.arcktis.fr/api/auth/update`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: this.actualUser.id,
            pseudo: this.actualUser.name,
            email: this.actualUser.email,
            role: role,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update user");
            }
            return response.json();
          })
          .then((data) => {
            const index = this.users.findIndex(
              (user) => user.id === this.actualUser.id
            );
            if (index !== -1) {
              this.users[index] = {
                id: this.actualUser.id,
                name: this.actualUser.name,
                email: this.actualUser.email,
                role: ["Administrateur", "Employé", "Client"][role],
              };
            }
            this.actualUser = { id: null, name: "", email: "", role: "Client" };
          })
          .catch((error) => alert("Error:", error));
      }
    },
    getAllUsers() {
      fetch("https://play-back.api.arcktis.fr/api/auth/getAllUsers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          return response.json();
        })
        .then((data) => {
          this.users = [];
          data.forEach((user) => {
            this.users.push({
              id: user.ID_utilisateur,
              name: user.pseudo,
              email: user.email,
              role: ["Administrateur", "Employé", "Client"][user.role_user],
            });
          });
        })
        .catch((error) => console.error("Error:", error));
    },
  },
  mounted() {
    // Fetch initial user data from the API
    this.getAllUsers();
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

.name-input,
.email-input {
  width: 50%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #3f424d;
  border-radius: 10px;
}

.role-select {
  width: 50%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #3f424d;
  border-radius: 10px;
}

.save-btn {
  background-color: #89b0ae;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 25%;
  font-size: 16px;
}
</style>
