<template>
  <div class="mv">
    <v-card class="mv-wrap">
      <!-- GoogleMapの表示 -->
      <GmapMap
        ref="gmap"
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
          :icon="m.pinicon"
          @click="onClickMarker(index, m)"
        />
        <!-- 情報ウィンドウの表示 -->
        <GmapInfoWindow
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen = false"
        >
          <h2 class="mb-1">
            {{ marker.title }}
          </h2>
          <p class="mb-0">
            {{ marker.address }}
          </p>
          <p class="mb-0">
            開演時間：{{ marker.open }} 〜 {{ marker.close }}
          </p>
          <p>
            席数：{{ marker.seats }}
          </p>
        </GmapInfoWindow>
      </GmapMap>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      // 地図が表示される時の中心（東京駅の緯度経度）
      location: { lat: 35.6809591, lng: 139.7673068 },
      zoom: 11,
      styleMap: {
        width: '100%',
        height: '100%'
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
        styles: []
      },
      marker: {},
      // マーカーを立てる配列
      markers: []
    }
  },
  mounted () {
    this.getLibrary()
  },
  methods: {
    // 図書館一覧を取得
    getLibrary () {
      this.$axios.get('/api/libraries')
        .then( res => {
          this.markers = res.data.libraries
        })
    },
    // マーカークリック時の処理
    onClickMarker(index, marker) {
      // this.$refs.gmp.fitBounds(marker.position)
      this.infoWindowPos = marker.position
      this.marker = marker
      this.infoWinOpen = true
    },
  }
}
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
</style>
