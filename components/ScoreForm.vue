<template>
  <v-card class="pa-2">
    <h2 class="d-flex align-center justify-center">
      {{ marker.title }}の評価入力
    </h2>
    <v-form width="300px">
      <v-container width="300px">
        <v-card-subtitle class="pa-0" style="color: slategray">
          居心地の良さ
        </v-card-subtitle>
        <v-rating
          v-model="eval.comfort"
          class="ms-3"
          background-color="grey"
          color="warning"
          dense
          hover
          length="5"
          size="30"
        />
        <v-card-subtitle class="pa-0" style="color: slategray">
          綺麗さ
        </v-card-subtitle>
        <v-rating
          v-model="eval.clean"
          class="ms-3"
          background-color="grey"
          color="warning"
          dense
          hover
          length="5"
          size="30"
        />
        <v-card-subtitle class="pa-0" style="color: slategray">
          デスク環境
        </v-card-subtitle>
        <v-rating
          v-model="eval.desk"
          class="ms-3"
          background-color="grey"
          color="warning"
          dense
          hover
          length="5"
          size="30"
        />
        <v-card-subtitle class="pa-0" style="color: slategray">
          混みやすさ
        </v-card-subtitle>
        <v-rating
          v-model="eval.crowd"
          class="ms-3"
          background-color="grey"
          color="warning"
          dense
          hover
          length="5"
          size="30"
        />
        <v-card-subtitle class="pa-0" style="color: slategray">
          静けさ
        </v-card-subtitle>
        <v-rating
          v-model="eval.silent"
          class="ms-3"
          background-color="grey"
          color="warning"
          dense
          hover
          length="5"
          size="30"
        />
        <v-card-actions class="justify-end">
          <v-btn color="info" outlined class="mr-2" type="button" @click="confirm">
            確認
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    marker: {
      type: Object,
      required: true,
    },
    scores: {
      type: Object,
      required: true,
    }
  },
  computed: {
    eval: {
      get() {
        return this.scores;
      },
    }
  },
  methods: {
    confirm() {
      this.$emit('open-score-confirm', this.eval)
    },
  },
};
</script>
