<template>
  <div class="user-orders">
    <h2>Оформленные заказы</h2>
    <div v-if="orders.length === 0">
      <p>У вас пока нет оформленных заказов.</p>
    </div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="order-item">
        <h3>Заказ №{{ order.id }}</h3>
        <p>Список товаров: {{ order.products.join(', ') }}</p>
        <p>Общая стоимость заказа: {{ order.order_price }}</p>
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
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.error('Токен пользователя отсутствует.');
        return;
      }

      const url = "https://jurapro.bhuser.ru/api-shop/order";
      try {
        const response = await fetch(url, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          this.orders = data.data;
        } else {
          console.error("Ошибка получения списка оформленных заказов");
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    },
    goBack() {
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

.order-item {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.order-item h3 {
  margin-top: 0;
}

.back-button {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.back-button:hover {
  background-color: #5a6268;
}
</style>
