import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: LocalStorage.getItem('username') || null,
    access_token: LocalStorage.getItem('access_token') || ''
  }),
  getters: {
    getCommonHeaders: (state) => {
      return {
        headers: {
          Authorization: `Bearer ${state.access_token}`,
          accept: 'application/json'
        }
      }
    },
    isAuthenticated: (state) => (state.access_token ? true : false)
  },
  actions: {
    set_access_token(
      access_token:string,
      username: string | null
    ){
      this.access_token =access_token;
      this.username=username;
      LocalStorage.set('access_token',access_token);
      LocalStorage.set('username',username);
    }
  },
});
