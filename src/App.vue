<template>
  <div v-if="!loading"
       style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <span v-if="isLoggedIn" @click="logout" class="mdi mdi-logout-variant btn btn-logout"></span>
    <p style="font-weight: 800; font-size: 1.5rem; margin-bottom: 2rem;">동래고등학교 등교 확인</p>
      <Login v-if="!isLoggedIn"/>
    <div v-else class="container">
      <!-- <div>
        <p>학번</p>
        <p>이름</p>
        <p style="flex: 1;">등교 시간</p>
      </div> -->
      <div v-for="({num, name, time}) of list">
        <p>{{ num }}</p>
        <p>{{ name }}</p>
        <p v-if="time === -1" style="color: orangered;">미등교</p>
        <p v-else>{{ time.getFullYear() }}년 {{ time.getMonth() + 1 }}월 {{ time.getDate() }}일 / {{ time.getHours() }}시 {{ time.getMinutes() }}분</p>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./components/Login";
import axios from "axios";

export default {
  components: {Login},
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  watch: {
    isLoggedIn() {
      this.loading = false;
      axios.get("https://dnhs-contest.nlog.dev/api/teacher/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization: this.$store.getters.token,
        },
      }).then(ret => this.list = ret.data.result_data.map(ret => {
        if (ret.time !== -1) ret.time = new Date(ret.time);
        return ret;
      }));
    }
  },
  methods: {
    logout() {
      if (confirm("로그아웃하시겠습니까?")) {
        localStorage.clear();
        alert("로그아웃하였습니다.");
        location.reload();
      }
    },
  },
  data() {
    return {
      loading: true,
      list: [],
    };
  },
  created() {
    let token = localStorage.getItem("token");
    if (typeof token === "string") this.$store.commit("login", token);
    else this.loading = false;
  }
}
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css");
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@6.5.95/css/materialdesignicons.min.css");

* {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif !important;
  box-sizing: border-box;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

input {
  border: none;
}

input:focus {
  outline: none;
}

.btn {
  padding: .5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  background: none;
  transition: .3s;
}

.btn:hover {
  background: rgba(0, 0, 0, .05);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container > * {
  display: flex;
  justify-content: space-between;

  margin-bottom: 1rem;
  width: 100%;
}

.container > * > * {
  text-align: center;
  margin-right: 3rem;
}

.container > * > *:nth-last-child(1) {
  margin: 0;
}

.btn-logout {
  position: absolute;
  right: 1rem;
  top: 1rem;
  color: black;
  border: none;
  padding: 1rem;
}
</style>
