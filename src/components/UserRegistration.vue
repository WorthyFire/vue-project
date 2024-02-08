<template>
  <div class="registration-container">
    <h2>Регистрация пользователя</h2>
    <form @submit.prevent="registerUser" class="registration-form">
      <div class="form-group">
        <label for="fio">ФИО:</label>
        <input type="text" id="fio" v-model="fio" required>
      </div>
      <div class="form-group">
        <label for="email">Электронная почта:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit" class="register-button">Зарегистрироваться</button>
    </form>
    <button @click="goBack" class="back-button">На главную страницу</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fio: '',
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async registerUser() {
      const url = "https://jurapro.bhuser.ru/api-shop/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fio: this.fio,
          email: this.email,
          password: this.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userToken', data.data.user_token);
        this.$router.push('/'); // Перенаправляем пользователя на главную страницу
      } else {
        this.error = "Ошибка регистрации пользователя";
      }
    },
    goBack() {
      // Переход на главную страницу
      this.$router.push('/');
    }
  }
};
</script>

<style>
.registration-container {
  max-width: 400px;
  margin: 0 auto;
}

.registration-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
}

.register-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register-button:hover {
  background-color: #45a049;
}

.back-button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #da190b;
}

</style>
