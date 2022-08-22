<template>
  <v-app dark>
    <Header />
    <v-main style="background-color: #fff">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from '../components/TheHeader.vue'

export default {
  components: { Header },
  name: 'DefaultLayout',
  data () {
  }
}
</script>
