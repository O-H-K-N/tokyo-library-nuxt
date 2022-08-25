<template>
  <div>
    <!-- ヘッダー（ナビゲーションバー） -->
    <v-app-bar app outlined color="#fff" class="elevation-2">
      <!-- ヘッダータイトル -->
      <router-link to="/" style="text-decoration: none">
        <v-icon color="blue-grey lighten-1"> 東京都図書館Map </v-icon>
      </router-link>
      <v-spacer />
      <!-- メニューアイコン -->
      <v-btn color="blue-grey lighten-1" icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <Menu v-model="drawer" />
  </div>
</template>

<script>
import Menu from '../components/BaseMenu.vue';
export default {
  components: { Menu },
  name: 'TheHeader',
  data() {
    return {
      drawer: false,
    };
  },
}
</script>
