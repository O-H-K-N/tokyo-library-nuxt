<template>
  <v-card class="pa-2">
    <h2 class="d-flex align-center justify-center">
      評価スコア入力確認
    </h2>
    <v-card-subtitle class="pa-0 d-flex align-center justify-center" style="color: slategray">
      以下で登録してよろしいですか？
    </v-card-subtitle>
    <v-container width="300px">
      <v-card-title class="pa-0">
        居心地の良さ：{{ scores.comfort }}
      </v-card-title>
      <v-card-title class="pa-0">
        綺麗さ：{{ scores.clean }}
      </v-card-title>
      <v-card-title class="pa-0">
        デスク環境：{{ scores.desk }}
      </v-card-title>
      <v-card-title class="pa-0">
        混みやすさ：{{ scores.crowd }}
      </v-card-title>
      <v-card-title class="pa-0">
        静けさ：{{ scores.silent }}
      </v-card-title>
      <v-card-actions class="justify-end">
        <v-btn color="error" outlined class="mr-2" type="button" @click="cancel">
          いいえ
        </v-btn>
        <v-btn color="info" outlined class="mr-2" type="button" @click="send">
          はい
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    scores: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 親側でスコア登録の処理が走る
    send() {
      this.$emit('send-score', this.scores)
    },
    // 親側でスコア登録キャンセルの処理が走る
    cancel() {
      this.$emit('cancel-score');
    }
  },
};
</script>
