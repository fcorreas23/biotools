<template>
  <div class="fastqc">
    <v-card elevation="12" min-height="750">
      <v-card-title>Fastqc</v-card-title>
      <v-card-subtitle>A quality control tool for high throughput sequence data</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="2">
            <v-card color="grey lighten-4">
              <v-card-text>
                <v-form ref="form" v-model="form">
                  <v-select 
                    v-model="input.fastq" 
                    :items="fastqFiles" 
                    item-text="filename" 
                    item-value="path"
                    label="Fastq file" 
                    :rules="[rules.required]"
                  >
                  </v-select>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn 
                  :disabled="!form" 
                  class="white--text"
                  color="deep-purple accent-4"
                  @click="runFastqc"
                >
                  Run FastQC
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="10">
            <v-card>
              <v-card-text>
                <p>FastQC permite realizar controles de calidad en archivos de secuencias obtenidos de métodos de secuenciación. Aporta un conjunto de análisis que te pueden dar una idea general rápida de si los datos tienen algún problema antes de proseguir con el análisis o si por el contrario cumplen los estándares de calidad aportados por el sistema.</p> 
                <p>Una vez analizadas las muestras podemos definir si deseamos descartar lecturas de mala calidad para trabajar sólo con aquellas que cumplen un cierto requisito de calidad mínima.</p>
                  <div v-if="show">
                    <v-row>
                      <v-col cols="12"> 
                        <v-btn color="blue-grey" class="ma-2 white--text" @click="download(result.report)">
                           Download Full Report <v-icon right dark>mdi-cloud-download</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-card>
                          <v-card-title>Summary</v-card-title>
                          <v-card-text>
                            <div v-for="item in result.summary" :key="item.module">
                              <p>
                                <v-chip link small :color="getColor(item.status)" dark>
                                  {{ item.status }}
                                </v-chip>                                
                                 {{ item.module }}
                              </p>
                            </div>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="9" >
                        <v-card>
                          <v-card-title>Basic Statistics</v-card-title>
                          <v-card-text>
                            <v-simple-table dense>
                              <template v-slot:default>
                                <thead>
                                  <tr>
                                    <th class="text-left">Measure</th>
                                    <th class="text-left">Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="item in result.basic" :key="item.measure">
                                    <td>{{ item.measure }}</td>
                                    <td>{{ item.value }}</td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                <!-- <pre>{{result}}</pre> -->
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-overlay :value="overlay">
      <v-progress-circular
        class="text-center"
        indeterminate
        size="64"
      ></v-progress-circular>
       <p class="text-center"><b>Runing FastQC<br>Please wait...</b></p>
    </v-overlay>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Fastqc',
  data(){
    return {
      form :false,
      overlay : false,
      show: false,
      dialog: false,
      input: {
        fastq: '',
        user: this.$store.state.user
      },
      rules: {
        required: v => !!v || 'This field is required',
      },
      result: '',
    }
  },

  computed: {
    ...mapGetters(['fastqFiles'])
  },

  methods: {
    async runFastqc() {
      try {
        this.overlay = true
        this.show =false
        let res = await this.axios.post('/biotools/fastqc', this.input)
        this.result = res.data.result
        this.overlay = false
        this.show =true
      } catch (error) {
        console.log(error)
      }
    },

    async download(report){
      try {
        let config = { headers : { token : this.$store.state.token}}
        let res = await this.axios.post('/storage/download', config, {report}, {responseType: 'blob'})
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'fastqc_report.zip');
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.log(error)
      }
    },

    getColor (status) {

      if (status === 'FAIL') return 'red'
      if (status === 'WARN') return 'orange'
      if (status === 'PASS') return 'green'
    },
  },

}
</script>