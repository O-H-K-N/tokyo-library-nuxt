<template>
  <v-app dark>
    <Header />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Header from '../components/TheHeader.vue'

export default {
  components: { Header },
  name: 'DefaultLayout'
}
</script>
