<template>
  <div class="unicycler">
    <v-card elevation="12" min-height="750">
      <v-card-title>Unicycler</v-card-title>
      <v-card-subtitle>Resolving bacterial genome assemblies from short and long sequencing reads.</v-card-subtitle>
      <v-card-text>
        <v-row>
            <v-col cols="12" md="3">
                <v-card class="pa-3" color="grey lighten-4">
                  <v-form ref="form" v-model="form">
                    <v-text-field 
                      v-model="input.name" 
                      :counter="15" 
                      label="Project Name"
                      :rules="[rules.required, rules.length]"
                    ></v-text-field>
                    <v-select
                        v-model="input.fq1" 
                        :items="fastqFiles" 
                        item-text="filename" 
                        item-value="path" 
                        label="Forward reads"
                        :menu-props="{ top: true, offsetY: true }"
                        hint="FASTQ file of first short reads in each pair"
                        :rules="[rules.required]"
                    ></v-select>
                    <v-select
                        v-model="input.fq2" 
                        :items="fastqFiles" 
                        item-text="filename" 
                        item-value="path" 
                        label="Reverse reads"
                        :menu-props="{ top: true, offsetY: true }"
                        hint="FASTQ file of second short reads in each pair"
                        :rules="[rules.required]"
                    ></v-select>
                    <v-select
                        v-model="input.mode"
                        :items="modes"
                        label="Bridging mode."
                        :menu-props="{ top: true, offsetY: true }"
                        :rules="[rules.required]"
                    ></v-select>
                    <v-text-field 
                      v-model="input.length" 
                      label="Min fasta length"
                      hint="Exclude contigs from the FASTA file which are shorter than this length"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-form>
                  <v-card-actions>
                    <v-btn 
                      :disabled="!form" 
                      class="white--text"
                      color="deep-purple accent-4"
                      @click="runUnicycler"
                    >
                      Run Unicycler
                    </v-btn>
                  </v-card-actions>
                </v-card>
                    
            </v-col>
            <v-col cols="12" md="9">
                <v-card class="pa-3">
                    <p>Unicycler is an assembly pipeline for bacterial genomes. It can assemble Illumina-only read sets where it functions as a SPAdes-optimiser. Can be run in three modes: <strong>conservative, normal (the default) and bold</strong>, set with the --mode option. Conservative mode is least likely to produce a complete assembly but has a very low risk of misassembly. Bold mode is most likely to produce a complete assembly but carries greater risk of misassembly. Normal mode is intermediate regarding both completeness and misassembly risk.</p>
                    <p>If the structural accuracy of your assembly is paramount to your research, conservative mode is recommended. If you want a completed genome, even if it contains a mistake or two, then use bold mode.</p>
                    <div v-if="loaded">
                      <v-btn color="blue-grey" class="ma-2 white--text" @click="download()">
                        Download Full Report <v-icon right dark>mdi-cloud-download</v-icon>
                      </v-btn>
                      <pre>{{result}}</pre>
                    </div>
                    
                </v-card>
            </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
       <p class="text-center"><b>Runing Unicycler<br>Please wait...</b></p>
    </v-overlay>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
export default {
  name: 'Unicycler',
  data(){
    return {
      form: false,
      overlay: false,
      loaded: false,
      input: {
        name: 'A1M01',
        fq1: null,
        fq2: null,
        mode: 'normal',
        length: 500,
        user: this.$store.state.user
      },
      modes: ['conservative','normal', 'bold'],
      rules: {
        upper: v => /^[A-Z]*$/.test(v) || 'Only Uppercase',
        length:  v => (v && v.length <= 15) || `Name must be less than 15 characters`,
        required: v => !!v || 'This field is required',
      },
      result: ''      
    }
  },
  computed: {
    ...mapGetters(['fastqFiles'])
  },
  methods: {
    async runUnicycler() {
      try {
        this.loaded = false
        this.overlay = true
        let res = await this.axios.post('/biotools/unicycler', this.input)
        this.result = res.data.result
        this.overlay = false
        this.loaded = true
      } catch (error) {
        this.result = error.response.data
        this.overlay = false
        this.loaded = true
      }
    },

    async download(){
      try {
          let res = await this.axios.get(`/storage/download/${this.result.unicycler._id}`, {responseType: 'blob'})
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${this.result.unicycler.filename}`);
          document.body.appendChild(link);
          link.click();
      } catch (error) {
          console.log(error)
      }
    },
  },
}
</script>