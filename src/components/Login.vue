<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <p style="margin-bottom: 2rem;">기기 인증</p>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <label class="login-label">
        <input v-model="token" placeholder="토큰을 입력하세요..." autocomplete="false" type="password"/>
      </label>
      <button class="btn" @click="login">
        로그인
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      token: "",
    }
  },
  methods: {
    login() {
      this.$store.commit("login", this.token);
    },
  }
}
</script>

<style scoped>
.login-label {
  padding: .5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin-bottom: 1rem;
}
.login-label input {
  width: 100%;
}
</style>
