<template>
  <div class="mv">
    <v-card class="mv-wrap">
      <v-btn
        color="orange"
        outlined
        rounded
        style="font-weight: bold"
        elevation="12"
        class="pt-1 px-16"
        @click="openSortSheet"
      >
        詳細検索
      </v-btn>
      <v-card elevation="9" outlined>
        <h1 class="text-center py-1 px-2">
          {{ sortCount }}件
        </h1>
      </v-card>
      <!-- GoogleMapの表示 -->
      <GmapMap
        ref="gmp"
        map-type-id="roadmap"
        :center="location"
        :zoom="zoom"
        :style="styleMap"
        :options="mapOptions"
      >
        <!-- マーカーを立てる -->
        <GmapMarker
          v-for="(m, index) in markers"
          :key="index"
          :title="m.title"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          :animation="m.animation"
          :icon="m.pinicon"
          @click="openSheet(m)"
        />
      </GmapMap>
    </v-card>

    <!-- 図書館詳細シート -->
    <v-bottom-sheet v-model="sheet" hide-overlay persistent>
      <Sheet
        :marker="marker"
        :series="series"
        @reset-sheet="resetSheet"
        @input-score="openScoreForm"
      />
    </v-bottom-sheet>

    <!-- 詳細検索シート -->
    <v-bottom-sheet v-model="sortSheet" scrollable hide-overlay>
      <SortSheet
        @reset-sheet="resetSortSheet"
        @clear-sheet="getLibrary"
        @set-library="setLibrary"
      />
    </v-bottom-sheet>

    <v-dialog v-model="scoreForm" max-width="450px">
      <ScoreForm
        :marker="marker"
        :marker-animation="markerAnimation"
        :scores="scores"
        @open-score-confirm="openScoreConfirm"
      />
    </v-dialog>

    <v-dialog v-model="scoreConfirm" max-width="450px">
      <ScoreConfirm
        :marker="marker"
        :marker-animation="markerAnimation"
        :scores="scores"
        @send-score="sendScore"
        @cancel-score="cancelScore"
      />
    </v-dialog>
  </div>
</template>

<script>
import Sheet from '../components/BaseSheet.vue';
import SortSheet from '../components/BaseSortSheet.vue';
import ScoreForm from '../components/ScoreForm.vue';
import ScoreConfirm from '../components/ScoreConfirm.vue';

export default {
  name: 'IndexPage',
  components: { Sheet, SortSheet, ScoreForm, ScoreConfirm },
  asyncData({ $config: { backendBaseUrl } }) {
    return { backendBaseUrl };
  },
  data() {
    return {
      // 地図が表示される時の中心（東京駅の緯度経度）
      location: { lat: 35.6809591, lng: 139.7673068 },
      zoom: 11,
      styleMap: {
        width: '100%',
        height: '100%',
      },
      infoOptions: {
        minWidth: 200,
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoWindowPos: null,
      infoWinOpen: false,
      mapOptions: {
        fullscreenControl: false,
        mapTypeControl: false,
        styles: [],
      },
      // マーカーを立てる配列
      markers: [],
      // 単体の図書館情報を格納
      marker: {},
      // マーカーにアニメーションさせるためだけのオブジェクト
      markerAnimation: {},
      // レーダーチャートの値を格納(図書館の詳細情報シートにpropsで渡す)
      series: [
        {
          name: '図書館評価スコア',
          data: [0, 0, 0, 0, 0],
        }
      ],
      // 入力される評価スコアを格納
      scores: {
        clean: 0,
        comfort: 0,
        silent: 0,
        desk: 0,
        crowd: 0,
      },
      // 図書館の詳細情報シート
      sheet: false,
      // 詳細検索シート
      sortSheet: false,
      // スコア入力フォーム
      scoreForm: false,
      // スコア入力確認フォーム
      scoreConfirm: false,
      // ヒット件数
      sortCount: 0,
    };
  },
  mounted() {
    // DOMが変わるたびに図書館一覧を取得して表示
    this.getLibrary();
  },
  methods: {
    // 図書館一覧を取得
    getLibrary() {
      this.$axios.get(`${this.backendBaseUrl}/libraries`).then((res) => {
        this.markers = res.data.libraries;
        this.sortCount = res.data.libraries.length
      });
    },
    setLibrary(libraries, sortCount) {
      this.markers = libraries;
      this.sortCount = sortCount;
    },
    // 詳細シートを表示
    openSheet(marker) {
      this.sortSheet = false;
      if (this.sheet === true) {
        this.resetSheet();
      }
      this.markerAnimation = marker;
      this.markerAnimation.animation = 1;
      this.$axios.get(`${this.backendBaseUrl}/libraries/${marker.id}`).then((res) => {
        this.marker = res.data.library
        this.$refs.gmp.panTo(this.marker.position);
        // レーダーチャートで表示される各値を計算し格納（少数第一位で四捨五入）
        this.series[0].data[0] = Math.round(this.marker.comfort / this.marker.quantity * 10) / 10;
        this.series[0].data[1] = Math.round(this.marker.clean / this.marker.quantity * 10) / 10;
        this.series[0].data[2] = Math.round(this.marker.desk / this.marker.quantity * 10) / 10;
        this.series[0].data[3] = Math.round(this.marker.crowd / this.marker.quantity * 10) / 10;
        this.series[0].data[4] = Math.round(this.marker.silent / this.marker.quantity * 10) / 10;
        // 5秒空けて実行
        setTimeout(() => {
          this.sheet = true;
        }, 500)
      })
    },
    // シートを非表示にしdataを空にする
    resetSheet() {
      this.sheet = false;
      this.markerAnimation.animation = null;
      this.marker = {};
    },
    // 詳細検索シートの表示
    openSortSheet() {
      this.sheet = false;
      this.markerAnimation.animation = null;
      if (this.sortSheet === true) {
        this.sortSheet = false;
      } else {
        this.sortSheet = true;
      }
    },
    // 詳細検索シートを非表示
    resetSortSheet() {
      this.sortSheet = false;
    },
    // 評価スコア入力フォームを表示
    openScoreForm() {
      this.scores = {
        clean: 0,
        comfort: 0,
        silent: 0,
        desk: 0,
        crowd: 0,
      };
      this.scoreForm = true;
    },
    // スコア入力確認フォームを表示
    openScoreConfirm(scores) {
      // 評価スコア入力フォームを非表示
      this.scoreForm = false;
      this.scoreConfirm = true;
      this.scores = scores;
    },
    // スコアを登録
    sendScore(scores) {
      this.$axios
        .put(`${this.$config.backendBaseUrl}/libraries/${this.marker.id}`, {
          library: scores,
        })
        .then((res) => {
          if (res.data.status === 'ok') {
            this.scoreConfirm = false;
            this.openSheet(this.markerAnimation);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // スコア入力確認フォームを非表示
    cancelScore() {
      this.scoreConfirm = false;
    }
  },
};
</script>

<style scoped>
.mv {
  width: 100%;
  height: 100;
  position: relative;
  overflow: hidden;
}

.mv-wrap {
  position: relative;
  height: 93vh;
}

.mv-wrap > button {
  position: absolute;
  left: 2%;
  top: 2%;
  background-color: #fff;
  z-index: 100;
}

.mv-wrap > .v-card {
  position: absolute;
  right: 2%;
  top: 2%;
  background-color: #fff;
  z-index: 100;
}
</style>
