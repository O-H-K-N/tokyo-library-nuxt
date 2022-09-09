<template>
  <v-card class="mx-auto">
    <v-row class="px-2">
      <v-col cols="12" lg="6">
        <a :href="marker.homepage" target="_blank" rel="noopener noreferrer" class="link font-weight-black ps-4">
          {{ marker.title }}
        </a>
        <v-card-subtitle class="pt-0 pb-2" style="color: grey">
          {{ marker.address }}
        </v-card-subtitle>
        <v-card-subtitle class="py-0" style="color: slategray">
          開演時間
        </v-card-subtitle>
        <v-card-subtitle v-if="marker.opening_details === null" class="ms-5 pt-1 pb-2">
          {{ marker.open }} ~ {{ marker.close }}
        </v-card-subtitle>
        <v-card-subtitle v-else class="ms-5 pt-1 pb-2">
          {{ marker.open }} ~ {{ marker.close }} ({{ marker.opening_details }})
        </v-card-subtitle>
        <v-card-subtitle class="py-0" style="color: slategray">
          席数
        </v-card-subtitle>
        <v-card-subtitle class="ms-5 pt-1 pb-2">
          {{ marker.seats }}席
        </v-card-subtitle>
        <v-card-subtitle class="py-0" style="color: slategray">
          休日
        </v-card-subtitle>
        <v-card-subtitle v-if="marker.close_date_second === null" class="ms-5 pt-1 pb-2">
          {{ marker.close_date_first }}
        </v-card-subtitle>
        <v-card-subtitle v-else class="ms-5 pt-1 pb-2">
          {{ marker.close_date_first }}、{{ marker.close_date_second }}
        </v-card-subtitle>
        <v-card-subtitle
          v-if="marker.services && marker.services.length"
          class="py-0"
          style="color: slategray"
        >
          サービス
        </v-card-subtitle>
        <v-card-subtitle
          v-for="(s, index) in marker.services"
          :key="index"
          class="ms-5 py-0"
        >
          {{ s.body }}
        </v-card-subtitle>
      </v-col>

      <v-col cols="12" lg="6" class="mt-3 mb-5">
        <div class="radar" style="margin: auto">
          <apexchart type="radar" height="350" :options="chartOptions" :series="series" />
        </div>
        <div class="text-center">
          <v-btn depressed outlined color="indigo" @click="inputScore">
            評価する
          </v-btn>
        </div>
      </v-col>
    </v-row>
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
    series: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'radar',
        },
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          radar: {
            size: 115,
            polygons: {
              fill: {
                colors: ['#f8f8f8', '#fff']
              }
            }
          }
        },
        title: {
          text: '図書館評価スコア'
        },
        colors: ['#FF4560'],
        tooltip: {
          y: {
            formatter(val) {
              return val
            }
          }
        },
        xaxis: {
          categories: ['居心地の良さ', '綺麗さ', 'デスク環境', '混みやすさ', '静けさ'],
          labels: {
            show: true,
            style: {
              colors: ['black', 'black', 'black', 'black', 'black'],
              fontSize: '11px',
            }
          }
        },
      },
    };
  },
  methods: {
    // シートを非表示
    resetSheet() {
      this.$emit('reset-sheet');
    },
    inputScore() {
      this.$emit('input-score')
    }
  },
};
</script>

<style scoped>
a {
  color: inherit;
  font-size: 22px;
  text-decoration: none;
}
a:hover {
  opacity: 0.7;
  text-decoration: underline;
}

.radar {
  max-width: 450px;
  max-height: 300px;
}
</style>
