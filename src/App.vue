<template>
  <Layout>
    <div>
      <div style="margin: 1rem 0">
        <PiniaLogo />
      </div>
      <h2>你好 {{ user.name }}</h2>
      <form @submit.prevent="addItemToCart">
        <input type="text" v-model="itemName" />
        <button>添加购物车</button>
      </form>

      <form @submit.prevent="buy">
        <ul>
          <li v-for="item in cart.items" :key="item.name">
            {{ item.name }} {{ item.amount }}
            <button @click="cart.removeItem(item.name)" type="button">X</button>
          </li>
        </ul>

        <button :disabled="!user.name">购买</button>
        <button :disabled="!cart.items.length" type="button" @click="clearCart">
          清空购物车
        </button>
      </form>
      <p>
        <button @click="user.login('Admin', 'Admin')">Admin登录</button>
        <button @click="user.login('User', 'User')">普通用户登录</button>
        <button @click="user.logout">退出</button>
      </p>
    </div>
  </Layout>
</template>
<script lang="ts">
  import Layout from "./layouts/default.vue";
  import PiniaLogo from "./components/PiniaLogo.vue";
  import { defineComponent, ref } from "vue";
  import { useUserStore } from "./stores/user";
  import { useCartStore } from "./stores/cart";

  export default defineComponent({
    components: { Layout, PiniaLogo },

    setup() {
      const user = useUserStore();
      const cart = useCartStore();

      const itemName = ref("");

      function addItemToCart() {
        if (!itemName.value) return;
        cart.addItem(itemName.value);
        itemName.value = "";
      }

      function clearCart() {
        if (window.confirm("你确定要清空购物车吗?")) {
          cart.rawItems = [];
        }
      }

      async function buy() {
        const n = await cart.purchaseItems();
        console.log(`购买了 ${n} 件商品`);
        cart.rawItems = [];
      }

      window.stores = { user, cart };
      return {
        itemName,
        addItemToCart,
        cart,
        user,
        buy,
        clearCart,
      };
    },
  });
</script>

<style scoped>
  img {
    width: 200px;
  }
  button,
  input {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
