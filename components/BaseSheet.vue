<template>
  <v-card class="mx-auto">
    <v-card-title class="font-weight-black">
      {{ marker.title }}
    </v-card-title>
    <v-card-subtitle class="pb-2">
      {{ marker.address }}
    </v-card-subtitle>
    <v-card-subtitle class="pb-0">
      開演時間
    </v-card-subtitle>
    <v-card-subtitle v-if="marker.opening_details === null" class="ms-5 pb-1">
      {{ marker.open }} ~ {{ marker.close }}
    </v-card-subtitle>
    <v-card-subtitle v-else class="ms-5 pb-1">
      {{ marker.open }} ~ {{ marker.close }} ({{ marker.opening_details }})
    </v-card-subtitle>
    <v-card-subtitle class="pb-0">
      席数
    </v-card-subtitle>
    <v-card-subtitle class="ms-5 pb-1">
      {{ marker.seats }}席
    </v-card-subtitle>
    <v-card-subtitle class="pb-0">
      休日
    </v-card-subtitle>
    <v-card-subtitle v-if="marker.close_date_second === null" class="ms-5 pb-1">
      {{ marker.close_date_first }}
    </v-card-subtitle>
    <v-card-subtitle v-else class="ms-5 pb-1">
      {{ marker.close_date_first }}、{{ marker.close_date_second }}
    </v-card-subtitle>
    <v-card-subtitle
      v-if="marker.services && marker.services.length"
      class="pb-0"
    >
      サービス
    </v-card-subtitle>
    <v-card-subtitle
      v-for="(s, index) in marker.services"
      :key="index"
      class="ms-5 pb-1"
    >
      {{ s.body }}
    </v-card-subtitle>
    <v-divider />
    <div class="text-center">
      <v-btn class="my-3" depressed outlined color="error" @click="resetSheet">
        close
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    marker: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // シートを非表示
    resetSheet() {
      this.$emit('reset-sheet');
    },
  },
};
</script>
