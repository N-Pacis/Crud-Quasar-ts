<template>
  <router-link :to="props.path">
    <div class="full-width">
      <div class="navi_wrapper row items-center">
        <div v-if="isActive" class="active_bar"></div>
        <div v-if="!isActive" class="active_bar_filler"></div>
        <span class="col-8 navi_text" :class="{ navi_text_active: isActive }">
          {{ props.name }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  icon: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: '/'
  }
})

const route = useRoute();

const isActive = computed(() => route.path == props.path);

</script>
<style scoped>
.navi_wrapper {
  height: 54px;
  margin: 14px 7px 14px 0px;
  border-radius: 0px 10px 10px 0px;
  background: v-bind("isActive ? 'linear-gradient(90deg, rgba(162, 200, 243, 0.2) 0%, rgba(116, 158, 237, 0) 100%)' : ''"
    );
}

.navi_text {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin: 0;
  text-align: center;
  color: #202020;
}

.navi_text_active {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  background-clip: text;
  background-image: linear-gradient(180deg, #4593f3 0%, #1f58ae 100%);
}

.active_bar {
  width: 9px;
  height: 54px;
  background: linear-gradient(180deg, #257ce6 0%, #7c98c3 100%);
}

.active_bar_filler {
  width: 9px;
  height: 54px;
}
</style>
