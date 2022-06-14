import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => {
    return { users: [] };
  },

  actions: {
    addUser(user) {
      this.users.push(user);
    },
    deleteUser(uid) {
      if (confirm("Are you sure?")) {
        this.users = this.users.filter((user) => {
          return user.uid !== uid;
        });
      }
    }
  }
});
