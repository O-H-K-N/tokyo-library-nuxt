<template>
  <v-app
    style="color: #455a64; font-family: 'Tsukushi A Round Gothic', '筑紫A丸ゴシック', 'Hiragino Maru Gothic ProN W4', 'ヒラギノ丸ゴ ProN W4';"
  >
    <Header />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Header from '../components/TheHeader.vue';

export default {
  name: 'DefaultLayout',
  components: { Header },
};
</script>
