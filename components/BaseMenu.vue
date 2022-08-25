<template>
  <div>
    <!-- メニュー表の中身 -->
    <v-navigation-drawer :value="value" @input="$emit('input', $event)" app fixed>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
