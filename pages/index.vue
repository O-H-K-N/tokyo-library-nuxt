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
      <Sheet :marker="marker" @reset-sheet="resetSheet" />
    </v-bottom-sheet>

    <!-- 詳細検索シート -->
    <v-bottom-sheet v-model="sortSheet" scrollable hide-overlay>
      <SortSheet
        @reset-sheet="resetSortSheet"
        @clear-sheet="getLibrary"
        @set-library="setLibrary"
      />
    </v-bottom-sheet>
  </div>
</template>

<script>
import Sheet from '../components/BaseSheet.vue';
import SortSheet from '../components/BaseSortSheet.vue';

export default {
  name: 'IndexPage',
  components: { Sheet, SortSheet },
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
      // 図書館の詳細情報シート
      sheet: false,
      // 詳細検索シート
      sortSheet: false,
    };
  },
  mounted() {
    this.getLibrary();
  },
  methods: {
    // 図書館一覧を取得
    getLibrary() {
      this.$axios.get(`${this.backendBaseUrl}/libraries`).then((res) => {
        this.markers = res.data.libraries;
      });
    },
    setLibrary(libraries) {
      this.markers = libraries;
    },
    // 詳細シートを表示
    openSheet(marker) {
      this.sortSheet = false;
      if (this.sheet === true) {
        this.sheet = false;
        this.marker.animation = null;
      }
      this.$refs.gmp.panTo(marker.position);
      this.sheet = true;
      this.marker = marker;
      this.marker.animation = 1;
    },
    // シートを非表示にしdataを空にする
    resetSheet() {
      this.sheet = false;
      this.marker.animation = null;
      this.marker = {};
    },
    // 詳細検索シートの表示
    openSortSheet() {
      this.sheet = false;
      this.marker.animation = null;
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
</style>
