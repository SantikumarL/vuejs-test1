<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ counter.count }}</h1>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <UserForm/>
    <ol>
      <li v-for="user in userStore.users" :key="user.uid">
        {{ user.title
        }}<button @click="userStore.deleteUser(user.uid)">X</button>
      </li>
    </ol>
  </div>
</template>

<script>
import { onMounted } from "vue";
import axios from "axios";
import { useCounterStore } from "@/stores/counter";
import { useUserStore } from "@/stores/user";
import UserForm from "@/components/UserForm";
export default {
  name: "HelloWorld",
  components: {
    UserForm: UserForm,
  },
  props: {
    msg: String,
  },
  setup() {
    const counter = useCounterStore();
    const userStore = useUserStore();

    onMounted(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(function (response) {
          response.data.forEach((data) => {
            userStore.addUser({
              uid: data["id"],
              title: data["title"],
            });
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    });
    const increment = () => {
      counter.increment();
    };
    const decrement = () => {
      counter.decrement();
    };

    return {
      counter,
      increment,
      decrement,
      userStore,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
