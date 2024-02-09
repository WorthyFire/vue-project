<template>
  <div class="product-catalog">
    <h2>Каталог товаров</h2>
    <div v-if="!isAuthenticated">
      <router-link to="/login">Войти</router-link> /
      <router-link to="/registration">Зарегистрироваться</router-link>
    </div>
    <div v-else>
      <button v-if="isAuthenticated" @click="logout" class="logout-button">Выход</button>
      <router-link v-if="isAuthenticated" to="/cart">Корзина</router-link>
      <router-link v-if="isAuthenticated" to="/orders">Оформленные заказы</router-link>
    </div>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Цена: {{ product.price }}</p>
        <button v-if="isAuthenticated" @click="addToCart(product)">Добавить в корзину</button>
      </div>
    </div>
    <!-- Всплывающее окно -->
    <div class="popup" v-if="showPopup">
      Товар добавлен в корзину
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      isClient: false,
      cartItems: [], // список товаров в корзине
      showPopup: false // переменная для отображения всплывающего окна
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      const url = "https://jurapro.bhuser.ru/api-shop/products";

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          this.products = data.data;
        } else {
          console.error("Ошибка получения списка товаров");
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    },
    async addToCart(product) {
      const productId = product.id;
      const url = `https://jurapro.bhuser.ru/api-shop/cart/${productId}`;
      const token = localStorage.getItem('userToken');
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const existingItemIndex = this.cartItems.findIndex(item => item.id === product.id);
          if (existingItemIndex !== -1 && this.isSameProduct(this.cartItems[existingItemIndex], product)) {
            this.cartItems[existingItemIndex].quantity++;
          } else {
            // Если товара нет в корзине или их характеристики не совпадают, добавляем его
            this.cartItems.push({...product, quantity: 1});
          }
          const data = await response.json();
          console.log(data.data.message);

          // Показываем всплывающее окно
          this.showPopup = true;
          // Устанавливаем таймер для скрытия всплывающего окна через 3 секунды
          setTimeout(() => {
            this.showPopup = false;
          }, 3000);
        } else {
          console.error("Ошибка добавления товара в корзину:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка добавления товара в корзину:", error);
      }
    },
    isSameProduct(item1, item2) {
      // Функция для проверки идентичности товаров
      return item1.id === item2.id && item1.name === item2.name && item1.description === item2.description && item1.price === item2.price;
    },
    logout() {
      // Удаление токена аутентификации из localStorage или другого места хранения
      localStorage.removeItem('userToken');
      this.$router.push('/login');
    }
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('userToken');
    }
  }
};
</script>

<style scoped>
.product-catalog {
  max-width: 800px;
  margin: 0 auto;
}

.logout-button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #da190b;
}

.product-list {
  margin-top: 20px;
}

.product-item {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.product-item h3 {
  margin-top: 0;
}

.product-item button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.product-item button:hover {
  background-color: #45a049;
}

/* Стили для всплывающего окна */
.popup {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 999;
}

</style>
