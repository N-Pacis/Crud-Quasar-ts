import { route } from 'quasar/wrappers';
import { useUserStore } from 'src/stores/user';
import { includes } from 'lodash';
import { markRaw } from 'vue';

import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({store}) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to)=>{
    const user = useUserStore();
    if((!user.isAuthenticated) && (!includes(publicPaths,to.path))){
      return '/login';
    }

    if(user.isAuthenticated && to.path == '/login'){
      return '/employees'
    }
  })

  store.use((context) => {
    context.store.$router = markRaw(Router);
  });

  return Router;
});

const publicPaths: string[] = [
  '/login',
  '/register'
];
