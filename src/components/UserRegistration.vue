<template>
  <div>
    <h2>Регистрация</h2>
    <form @submit.prevent="registerUser">
      <!-- Input fields for registration -->
      <div>
        <label for="username">Никнейм пользователя:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="email">Электронная поччта пользователя:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <!-- Error messages -->
      <div v-if="error" class="error">{{ error }}</div>
      <!-- Registration button -->
      <button type="submit">Регистрация</button>
    </form>
    <!-- Back button -->
    <button @click="goBack">На главную страницу</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    registerUser() {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      // Отправляем запрос на сервер для регистрации пользователя
      // В данном случае это просто выводим сообщение в консоль
      console.log('Registration form submitted with data:', userData);

      // После успешной регистрации можно выполнить какие-либо действия, например, переход на другую страницу
      // Здесь мы просто очищаем поля формы
      this.username = '';
      this.email = '';
      this.password = '';

      // Переход на другую страницу (например, на страницу входа в систему)
      // Здесь необходимо реализовать навигацию с помощью маршрутизатора Vue Router
    },

    goBack() {
      // Переходим на главную страницу
      // Здесь необходимо реализовать навигацию с помощью маршрутизатора Vue Router
      console.log('Перенаправлен на главный экран');

      // Пример перехода на главную страницу с использованием маршрутизатора Vue Router
      this.$router.push('/');
    },
  }
};
</script>

<style>
/* Add styles for registration form here */
</style>
