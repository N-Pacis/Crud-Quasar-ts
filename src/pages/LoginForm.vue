<template>
  <q-page class="column items-center">
    <div class="q-mt-xl">
      <h3 class="app-title text-weight-bold">Employee Management System</h3>
    </div>
    <q-form @submit="onSubmit" class="inputs-container">
      <div class="q-mb-sm">
        <q-input outlined label="Email" v-model="username" lazy-rules label-color="grey-5"
          :rules="[(val) => (val && val.length > 0) || 'Please input your email',]" />
      </div>
      <div class="q-mb-sm">
        <q-input outlined label="Password" v-model="password" :type="isPwd ? 'password' : 'text'" label-color="grey-5"
          :rules="[(val) => (val && val.length > 0) || 'Please input your password']">
          <template v-slot:append>
            <q-icon :name="
              isPwd
                ? 'img:icons/visibility-off.svg'
                : 'img:icons/visibility.svg'
            " class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
      <div class="submit-button-container">
        <q-btn unelevated size="lg" class="full-width login-btn" type="submit" no-caps>
          <div class="login-btn-label">{{isLoading ? 'Wait...' : 'Sign in'}}</div>
        </q-btn>
      </div>
      <div class="row justify-end q-mt-sm">
        <div
          class="login-label cursor-pointer"
          v-on:click="goToRegister"
        >
          Don't have an account? Register.
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue';
import {
  useUserStore
} from 'stores/user';
import {
  useQuasar
} from 'quasar';
import {
  api
} from 'boot/axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginForm',
  components: {},
  setup() {
    const $q = useQuasar();
    const userStore = useUserStore();
    const router = useRouter();


    const username = ref(userStore.username);

    const password = ref('');

    const isPwd = ref(true);

    const isLoading = ref(false);

    return {
      userStore,
      username,
      password,
      isPwd,
      isLoading,
      onSubmit() {
        const verifyNotiDimiss = $q.notify({
          type: 'info',
          message: 'Verifying....',
        });
        const params = new URLSearchParams();
        params.append('Email', username.value);
        params.append('Password', password.value);
        api
          .post('login', params, {
            baseURL: process.env.API_BASE_URL
          })
          .then(async (response) => {
            isLoading.value = true
            verifyNotiDimiss();
            userStore.set_access_token(
              response.data.access_token,
              username.value
            );
            api.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${response.data.access_token}`;
            $q.notify({
              type: 'positive',
              message: 'Login success! Redirecting to home page',
              timeout: 10,
            });
            router.push('/employees')
            isLoading.value = false;
          })
          .catch(() => {
            isLoading.value = true;

            verifyNotiDimiss();
            $q.notify({
              type: 'negative',
              message: 'Username or password do not match',
            });
            isLoading.value = false;
          });
      },
      goToRegister() {
        router.push('/register');
      }
    };
  },
});
</script>

<style lang="scss">
.inputs-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 2px 2px 10px #ccc;
  padding: 3% 5%;
  width: 43%;
}

.login-btn {
  background-color: $primary;
  color: white;
}

.app-title {
  color: $primary;
}
</style>
