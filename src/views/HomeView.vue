<template>
  <div class="home-container">
    <!-- Кнопки регистрации и авторизации -->
    <div class="auth-buttons" v-if="!isLoggedIn">
      <router-link to="/registration" class="auth-button">Регистрация</router-link>
      <router-link to="/login" class="auth-button">Авторизация</router-link>
    </div>
    <!-- Никнейм и кнопка выхода -->
    <div v-else class="user-info">
      <p>Имя пользователя:{{ username }}</p>

      <button @click="logout" class="logout-button">Выход</button>
    </div>
    <h1>Каталог товаров</h1>
    <!-- Список товаров из каталога -->
    <div class="product" v-for="product in products" :key="product.id">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <!-- Показывать кнопку "Добавить в корзину" только для авторизованных пользователей-клиентов -->
      <button v-if="isClient && isLoggedIn" @click="addToCart(product)" class="add-to-cart-button">Добавить в корзину</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      // Список товаров из каталога
      products: [
        { id: 1, name: 'Товар 1', description: 'Описание товара 1' },
        { id: 2, name: 'Товар 2', description: 'Описание товара 2' },
        { id: 3, name: 'Товар 3', description: 'Описание товара 3' },
      ],
      // Статус авторизации пользователя
      isLoggedIn: false,
      // Роль пользователя (для демонстрации)
      role: 'client', // Может быть 'client', 'admin' и т.д.
      // Никнейм пользователя
      username: ''
    };
  },
  computed: {
    // Проверка роли пользователя на клиента
    isClient() {
      return this.role === 'client';
    }
  },
  methods: {
    // Добавление товара в корзину (для демонстрации)
    addToCart(product) {
      console.log('Добавлен товар в корзину:', product);
    },
    // Выход из аккаунта
    logout() {
      this.isLoggedIn = false;
      this.username = '';
      console.log('Выход из аккаунта');
    }
  },
  created() {
    // Проверяем, авторизован ли пользователь
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      this.isLoggedIn = true;
      this.username = userData.username;
    }
  }
};
</script>

<style>
/* Стили для визуализации */
.auth-buttons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.auth-button {
  margin-left: 10px;
  text-decoration: none;
  color: #007bff;
}

.auth-button:hover {
  text-decoration: underline;
}

.user-info {
  display: flex;
  align-items: center;
}

.logout-button {
  margin-left: 10px;
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #da190b;
}

.product {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
}

.product h3 {
  margin-top: 0;
}

.add-to-cart-button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart-button:hover {
  background-color: #45a049;
}
</style>
