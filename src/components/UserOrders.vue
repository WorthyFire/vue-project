<template>
  <div class="user-orders">
    <h2>Оформленные заказы</h2>
    <div v-if="orders.length === 0" class="empty-orders">
      Нет оформленных заказов
    </div>
    <div v-else>
      <div class="order" v-for="(order, index) in orders" :key="index">
        <h3>Заказ #{{ order.id }}</h3>
        <p>Дата оформления: {{ order.date }}</p>
        <p>Сумма заказа: {{ order.total }} руб.</p>
        <ul>
          <li v-for="(item, i) in order.items" :key="i">
            {{ item.name }} - {{ item.quantity }} шт.
          </li>
        </ul>
      </div>
    </div>
    <button @click="goBack" class="back-button">Назад</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: []
    };
  },
  created() {
    // Загружаем список заказов из localStorage при создании компонента
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    }
  },
  methods: {
    goBack() {
      // Переход на домашний экран
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.user-orders {
  max-width: 800px;
  margin: 0 auto;
}

.order {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
}

.order h3 {
  margin-top: 0;
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

.empty-orders {
  margin-top: 20px;
  font-style: italic;
  color: #777;
}
</style>
