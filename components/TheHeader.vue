<template>
  <div>
    <!-- ヘッダー（ナビゲーションバー） -->
    <v-app-bar app outlined color="#fff" class="elevation-2">
      <!-- ヘッダータイトル -->
      <router-link to="/" style="text-decoration: none">
        <v-icon color="blue-grey lighten-1">
          とうきょう図書館Map
        </v-icon>
      </router-link>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>
