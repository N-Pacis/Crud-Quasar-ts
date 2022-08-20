<template>
  <q-page class="column items-center">
    <div class="q-mt-xl">
      <h3 class="app-title text-weight-bold">Employee Management System</h3>
    </div>
    <q-form @submit="onSubmit" class="inputs-container">
      <div class="q-mb-sm">
        <q-input outlined label="Names" v-model="names" lazy-rules label-color="grey-5"
          :rules="[(val) => (val && val.length > 0) || 'Please input your names',]" />
      </div>
      <div class="q-mb-sm">
        <q-input outlined label="Phone Number" placeholder="07xxxxxxxx" type="number" v-model="phone" lazy-rules label-color="grey-5"
          :rules="[(val) => (val && val.length == 10) || 'Please input your valid phone number',]" />
      </div>
      <div class="q-mb-sm">
        <q-input outlined label="National ID" type="number" v-model="nationalId" lazy-rules label-color="grey-5"
          :rules="[(val) => (val && val.length == 16) || 'Please input your valid national ID',]" />
      </div>
      <div class="q-mb-sm">
        <q-input outlined label="Date Of Birth" type="date" v-model="dob" lazy-rules label-color="grey-5"
          :rules="[(val) => (val && val.length == 10) || 'Please input your phone number',]" />
      </div>
      <div class="q-mb-sm">
        <q-input outlined label="Email" v-model="username" type="email" lazy-rules label-color="grey-5"
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
      <div class="column submit-button-container">
        <q-btn unelevated size="lg" class="full-width login-btn" type="submit" no-caps>
          <div class="login-btn-label">{{isLoading ? 'Wait...' : 'Sign up'}}</div>
        </q-btn>
      </div>
      <div class="row justify-end q-mt-sm">
        <div
          class="login-label cursor-pointer"
          v-on:click="goToLogin"
        >
          Already have an account? Login.
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

    const router = useRouter();


    const username = ref('');

    const password = ref('');

    const names = ref('');

    const dob = ref('');

    const phone = ref('')

    const nationalId = ref('')

    const isPwd = ref(true);

    const isLoading = ref(false);

    return {
      username,
      password,
      names,
      dob,
      nationalId,
      isLoading,
      phone,
      isPwd,
      onSubmit() {
        const verifyNotiDimiss = $q.notify({
          type: 'info',
          message: 'Verifying....',
        });
        const params = new URLSearchParams();
        params.append('Name', names.value);
        params.append('Phone', phone.value);
        params.append('DateOfBirth', dob.value);
        params.append('NationalId', nationalId.value);
        params.append('Email', username.value);
        params.append('Password', password.value);
        api
          .post('register', params, {
            baseURL: process.env.API_BASE_URL
          })
          .then(async (response) => {
            isLoading.value=true
            verifyNotiDimiss();
            $q.notify({
              type: 'positive',
              message: response.data.message,
              timeout: 10,
            });
            isLoading.value=false
          })
          .catch((err) => {
            isLoading.value=true
            verifyNotiDimiss();
            $q.notify({
              type: 'negative',
              message:
              err.response.data.message
            });
            isLoading.value=false
          });
      },
      goToLogin() {
        router.push('/');
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
