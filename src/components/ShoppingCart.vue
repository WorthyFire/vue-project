<template>
  <div class="cart-view">
    <h2>Корзина</h2>
    <div v-if="cartItems.length === 0">
      <p>Ваша корзина пуста.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <p>Цена: {{ item.price }}</p>
        <div class="quantity-controls">
          <button @click="increaseQuantity(item)">+</button>
          <span>{{ item.quantity }}</span>
          <button @click="decreaseQuantity(item)">-</button>
        </div>
        <button @click="removeFromCart(item)">Удалить из корзины</button>
      </div>
      <button @click="checkout" v-if="cartItems.length > 0">Оформить заказ</button>
    </div>
    <button @click="goBack">Назад</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: []
    };
  },
  created() {
    this.fetchCartItems();
  },
  methods: {
    async fetchCartItems() {
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.error('Токен пользователя отсутствует.');
        return;
      }

      const url = "https://jurapro.bhuser.ru/api-shop/cart";
      try {
        const response = await fetch(url, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          this.cartItems = data.data;
        } else {
          console.error("Ошибка получения списка товаров в корзине");
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    },
    async removeFromCart(item) {
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.error('Токен пользователя отсутствует.');
        return;
      }

      const url = `https://jurapro.bhuser.ru/api-shop/cart/${item.id}`;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
          console.log("Товар успешно удален из корзины");
        } else {
          console.error("Ошибка удаления товара из корзины:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка удаления товара из корзины:", error);
      }
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.cart-view {
  max-width: 800px;
  margin: 0 auto;
}

.cart-item {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.cart-item h3 {
  margin-top: 0;
}

.quantity-controls button {
  background-color: #4CAF50;
  color: white;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-controls button:hover {
  background-color: #45a049;
}

.button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #da190b;
}
</style>
