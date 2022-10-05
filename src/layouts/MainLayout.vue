<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white header-container column justify-center">
      <q-toolbar class="text-grey-9">
        <q-btn
          v-if="showDrawerButton"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="title">
          {{title}}
        </q-toolbar-title>
        <q-separator inset vertical spaced />
        <q-btn
          class="q-mr-sm q-ml-md"
          flat
          dense
          round
          aria-label="Profile"
          icon="img:icons/menu-down.svg"
        >
          <q-menu fit :offset="[0,20]">
            <q-list style="min-width: 250px">
              <q-item
                clickable
                v-close-clopup
              >
                <div class="row items-center">
                  <q-icon
                    class="q-mr-md"
                    name="img:icons/sign-out.svg"
                    size="20px"
                  />
                  <q-item-section class="menu-item text-black">
                    Sign Out
                  </q-item-section>
                </div>
              </q-item>
            </q-list>
          </q-menu>

        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      ref="drawer"
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
    >
      <div class="navigation-slides-container full-height">
        <div class="column justify-between full-height no-wrap navigation-box">
          <q-list>
            <template v-for="(route,index) in routes" :key="index">
              <NavLink
              :icon="route.icon"
              :name="route.name"
              :path="route.path"
              />
            </template>
          </q-list>
        </div>
      </div>

    </q-drawer>
    <q-page-container>

      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import NavLink from 'src/components/NavLink.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    NavLink
  },

  props: ['title'],

  setup() {
    const leftDrawerOpen = ref(false);
    const drawer = ref(null);

    const showDrawerButton = ref(true);

    const routes = ref([
      {
        icon: '',
        name: 'Employees',
        path: '/employees'
      },
      {
        icon: '',
        name: 'System Logs',
        path: '/logs'
      }
    ])

    function evaluateDrawerButton() {
      if (window.innerWidth > drawer.value.breakpoint){
        showDrawerButton.value = false;
      }
      else showDrawerButton.value = true;
    }

    onMounted(() => {
      evaluateDrawerButton();
      window.addEventListener('resize', evaluateDrawerButton);
    }),

    onUnmounted(() => {
      window.removeEventListener('resize', evaluateDrawerButton);
    })

    return {
      leftDrawerOpen,
      routes,
      drawer,
      showDrawerButton,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    };
  }
});
</script>
<style scoped lang="scss">
@import 'src/css/mixins';

.left-top-title {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 22px;
  color: #202020;
  text-align: left;
  margin: 0px;
}

.title-container {
  margin-top: 4px;
  height: 75px;
}

.title {
  margin-left: v-bind("showDrawerButton ? '0px' : '43px'");
}

.header-container {
  height: 75px;
  border-bottom: 1px solid #ebebeb;
}

.username {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.2px;
  margin: 0;
}

.role {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.2px;
  margin: 0;
}

.avatar {
  height: 50px;
  width: 50px;
  background: #ebebeb;
  border-radius: 32.5px;
}

.avatar-initials {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0.818182px;
}

.user-info {
  height: 40px;
}

.menu-item {
  @include user-menu-item;
}

.navigation-slides-container {
  display: flex;

  overflow-x: hidden;
}

.navigation-box {
  flex-shrink: 0;
  width: 250px;
  transition: all 0.5s;
  background-color: rgb(251, 251, 251);
  border-right: 1px solid #ebebeb;
}

.transform-to-left {
  transform: translateX(-250px);
}
.left-drawer{
  background-color: #ebebeb;
  display: none;
}
</style>
