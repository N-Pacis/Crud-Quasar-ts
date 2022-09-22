import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { useUserStore } from 'stores/user';

const api = axios.create({ baseURL: process.env.API_BASE_URL });

const user = useUserStore();

if (user.access_token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`;
}

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});
export { api };
