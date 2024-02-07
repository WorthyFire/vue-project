<template>
  <div class="home-container">
    <!-- Кнопки регистрации и авторизации -->
    <div class="auth-buttons" v-if="!isLoggedIn">
      <router-link to="/registration" class="auth-button">Регистрация</router-link>
      <router-link to="/login" class="auth-button">Авторизация</router-link>
    </div>
    <!-- Никнейм и кнопка выхода -->
    <div v-else class="user-info">
      <p>Имя пользователя: {{ username }}</p>
      <button @click="logout" class="logout-button">Выход</button>
      <!-- Кнопка перехода в корзину -->
      <router-link v-if="isLoggedIn" to="/cart" class="cart-button">Корзина</router-link>
    </div>
    <h1>Каталог товаров</h1>
    <!-- Список товаров из каталога -->
    <div class="product" v-for="product in products" :key="product.id">
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <img :src="product.image" alt="Product" class="product-image">
        <p class="product-price">Цена: {{ product.price }} руб.</p>
      </div>
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
        {id: 1, name: 'Пирожок', description: 'Вкусный пирожок', image: '', price: 100},
        {id: 2, name: 'Пицца', description: 'Вкусная пицца', image: '', price: 200},
        {id: 3, name: 'Суши', description: 'Вкусные суши', image: '', price: 300},
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
      // Создаем копию товара для корзины
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1 // При добавлении в корзину количество товара устанавливаем равным 1
      };

      // Загружаем корзину из localStorage
      let cartItems = localStorage.getItem('cartItems');
      cartItems = cartItems ? JSON.parse(cartItems) : [];

      // Проверяем, есть ли уже такой товар в корзине
      const existingItemIndex = cartItems.findIndex(item => item.id === cartItem.id);

      if (existingItemIndex !== -1) {
        // Если товар уже есть в корзине, увеличиваем его количество
        cartItems[existingItemIndex].quantity++;
      } else {
        // Иначе добавляем новый товар в корзину
        cartItems.push(cartItem);
      }

      // Сохраняем корзину в localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      console.log('Добавлен товар в корзину:', cartItem);
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

<style scoped>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-info {
  flex: 1;
}

.product h3 {
  margin-top: 0;
}

.product-image {
  max-width: 100px;
  max-height: 100px;
  margin-right: 20px;
}

.product-price {
  font-weight: bold;
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
