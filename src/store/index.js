import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
	state: {
		isLoggedIn: false,
		token: "",
	}, mutations: {
		async login(state, token) {
			if (state.isLoggedIn) return;
			let ret = await axios.get("https://dnhs-contest.nlog.dev/api/teacher/check", {
				headers: {
					"Content-Type": "application/json",
					Authorization: token
				},
			});
			if (ret.data.result !== 0) {
				alert("토큰을 확인하세요.");
				localStorage.clear();
				location.reload();
				return;
			}

			localStorage.setItem("token", token);

			state.isLoggedIn = true;
			state.token = token;
		}
	},
	actions: {},
	getters: {
		isLoggedIn(state) {
			return state.isLoggedIn;
		},
		token(state) {
			return state.token;
		},
	},
	modules: {}
})
