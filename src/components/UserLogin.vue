<template>
  <div>
    <h2>Вход в систему</h2>
    <form @submit.prevent="loginUser">
      <!-- Input fields for login -->
      <div>
        <label for="email">Электронная почта пользователя:</label>
        <input type="email" id="email" v-model="email" required :class="{ 'error': emailError }">
        <div v-if="emailError" class="error">Введите корректный адрес электронной почты</div>
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required :class="{ 'error': passwordError }">
        <div v-if="passwordError" class="error">Введите пароль</div>
      </div>
      <!-- Error message -->
      <div v-if="error" class="error">{{ error }}</div>
      <!-- Login button -->
      <button type="submit">Войти</button>
    </form>
    <!-- Back button -->
    <button @click="goBack">На главную страницу</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      error: ''
    };
  },
  methods: {
    loginUser() {
      // Проверяем валидность введенных данных
      this.emailError = !this.validateEmail(this.email);
      this.passwordError = !this.password;

      if (!this.emailError && !this.passwordError) {
        // Подготавливаем данные для отправки на сервер
        const userData = {
          email: this.email,
          password: this.password
        };

        // Отправляем запрос на сервер для аутентификации пользователя
        // В данном случае это просто выводим сообщение в консоль
        console.log('Login form submitted with data:', userData);

        // Переход на другую страницу (например, на домашнюю страницу) после успешной аутентификации
        // Здесь необходимо реализовать навигацию с помощью маршрутизатора Vue Router
        // В данном примере просто очищаем поля формы
        this.email = '';
        this.password = '';
      } else {
        // Выводим сообщение об ошибке ввода данных
        this.error = 'Пожалуйста, исправьте ошибки в форме входа';
      }
    },
    goBack() {
      // Переходим на главную страницу
      // Здесь необходимо реализовать навигацию с помощью маршрутизатора Vue Router
      console.log('Navigate back to home screen');

      // Пример перехода на главную страницу с использованием маршрутизатора Vue Router
      this.$router.push('/');
    },
    validateEmail(email) {
      // Реализуйте функцию для проверки валидности email
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }
};
</script>

<style>
/* Add styles for login form here */
.error {
  color: red;
}
</style>
