<template>
  <v-card class="mx-auto" max-height="300px">
    <v-card-text class="pb-0">
      <v-container fluid>
        <v-card-title class="font-weight-black px-0 pb-0">
          自治体
        </v-card-title>
        <v-row>
          <v-col
            v-for="(a, index) in administrations"
            :key="index"
            cols="12"
            sm="4"
            md="4"
          >
            <v-checkbox
              v-model="administrationGroup"
              :label="a.name"
              :value="a.id"
              color="green"
              hide-details
              @click="sortAdministration()"
            />
          </v-col>
        </v-row>
        <v-divider class="mt-5" />
        <v-radio-group v-model="radioGroup" class="mt-0">
          <v-card-title class="font-weight-black px-0 pb-0">
            利用サービス
          </v-card-title>
          <v-col v-for="(s, index) in services" :key="index" class="px-0">
            <v-radio
              :label="s.body"
              :value="s.id"
              color="green"
              hide-details
              @click="sortService(s)"
            />
          </v-col>
        </v-radio-group>
      </v-container>
    </v-card-text>
    <v-divider />
    <div class="text-center">
      <v-btn class="my-3" depressed outlined color="indigo" @click="clear">
        clear
      </v-btn>
      <v-btn class="my-3" depressed outlined color="error" @click="resetSheet">
        close
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      // 取得した自治体を格納
      administrations: [],
      // 取得したサービスを格納
      services: [],
      // 詳細検索で取得した図書館を格納
      libraries: [],
      administrationGroup: [],
      radioGroup: 0,
    };
  },
  mounted() {
    this.getAdministrations();
    this.getServices();
  },
  methods: {
    // チェックボタンとして表示される自治体をすべて取得
    getAdministrations() {
      this.$axios.get('/administrations').then((res) => {
        this.administrations = res.data.administrations;
      });
    },
    // ラジオボタンとして表示されるサービスをすべて取得
    getServices() {
      this.$axios.get('/services').then((res) => {
        this.services = res.data.services;
      });
    },
    // 選択された自治体で図書館を取得
    sortAdministration() {
      // サービスを踏まえた詳細検索
      if (this.radioGroup !== 0) {
        // 選択した自治体が複数の場合
        if (this.administrationGroup.length > 1) {
          this.$axios
            .get(
              `/administrations/${this.administrationGroup[0]}?ids=${this.administrationGroup}&serviceId=${this.radioGroup}`
            )
            .then((res) => {
              this.libraries = res.data.libraries;
              console.log(this.libraries);
              this.$emit('set-library', this.libraries);
            });
          // 選択した自治体が単体の場合
        } else if (this.administrationGroup.length === 1) {
          this.$axios
            .get(
              `/administrations/${this.administrationGroup[0]}?serviceId=${this.radioGroup}`
            )
            .then((res) => {
              this.libraries = res.data.libraries;
              console.log(this.libraries);
              this.$emit('set-library', this.libraries);
            });
        } else {
          this.clear();
        }
        return;
      }
      // サービスを踏まえない検索
      if (this.administrationGroup.length > 1) {
        this.$axios
          .get(
            `/administrations/${this.administrationGroup[0]}?ids=${this.administrationGroup}`
          )
          .then((res) => {
            this.libraries = res.data.libraries;
            this.$emit('set-library', this.libraries);
          });
      } else if (this.administrationGroup.length === 1) {
        this.$axios
          .get(`/administrations/${this.administrationGroup[0]}`)
          .then((res) => {
            this.libraries = res.data.libraries;
            this.$emit('set-library', this.libraries);
          });
      } else {
        this.clear();
      }
    },
    // 選択されたサービスで図書館を取得
    sortService(s) {
      // 自治体を踏まえた詳細検索
      if (this.administrationGroup.length > 0) {
        this.$axios
          .get(`/services/${s.id}?administrationId=${this.administrationGroup}`)
          .then((res) => {
            this.libraries = res.data.libraries;
            console.log(this.libraries.length);
            this.$emit('set-library', this.libraries);
          });
        return;
      }
      // 自治体を踏めない検索
      this.$axios.get(`/services/${s.id}`).then((res) => {
        this.libraries = res.data.libraries;
        console.log(this.libraries.length);
        this.$emit('set-library', this.libraries);
      });
    },
    // シートを非表示
    resetSheet() {
      this.$emit('reset-sheet');
    },
    // 選択をクリア
    clear() {
      this.administrationGroup = [];
      this.radioGroup = 0;
      this.$emit('clear-sheet');
    },
  },
};
</script>
