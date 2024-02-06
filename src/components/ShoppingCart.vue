<template>
  <div class="shopping-cart">
    <h2>Корзина</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      Корзина пуста
    </div>
    <div v-else>
      <div class="cart-item" v-for="(item, index) in cartItems" :key="index">
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>Цена: {{ item.price }} руб.</p>
          <p>Количество: {{ item.quantity }}</p>
        </div>
        <div class="item-controls">
          <button @click="incrementItem(index)">+</button>
          <button @click="decrementItem(index)">-</button>
          <button @click="removeItem(index)">Удалить</button>
        </div>
      </div>
      <button @click="checkout" class="checkout-button">Оформить заказ</button>
    </div>
    <button @click="goBack" class="back-button">Назад</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [
        { id: 1, name: 'Товар 1', price: 100, quantity: 2 },
        { id: 2, name: 'Товар 2', price: 200, quantity: 1 },
        { id: 3, name: 'Товар 3', price: 150, quantity: 3 }
      ]
    };
  },
  methods: {
    incrementItem(index) {
      this.cartItems[index].quantity++;
    },
    decrementItem(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
    },
    checkout() {
      // Логика оформления заказа
      // Переход на экран с заказами
      this.$router.push('/orders');
    },
    goBack() {
      // Переход на домашний экран
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.shopping-cart {
  max-width: 800px;
  margin: 0 auto;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.item-info {
  flex: 1;
}

.item-controls button {
  margin-left: 10px;
}

.checkout-button {
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #45a049;
}

.back-button {
  margin-top: 20px;
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #da190b;
}

.empty-cart {
  margin-top: 20px;
  font-style: italic;
  color: #777;
}
</style>
