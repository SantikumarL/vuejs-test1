<template>
  <div>
    <form @submit.prevent="saveUser">
      <input type="text" v-model="title" />
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { v4 as uid } from "uuid";
import { useUserStore } from "@/stores/user";
export default {
  props: {
    update: Function,
  },
  setup(props, { emit }) {
    const userStore = useUserStore();
    const title = ref("");
    const saveUser = () => {
      const userForm = {
        uid: uid(),
        title: title.value,
      };
      userStore.addUser(userForm);
      title.value = "";
    };

    return {
      title,
      saveUser,
    };
  },
};
</script>

<style>
</style>