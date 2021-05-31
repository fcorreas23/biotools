<template>
  <div class="quast">
    <v-card elevation="12" min-height="750">
      <v-card-title>BUSCO v5.1.3</v-card-title>
      <v-card-subtitle>Based on evolutionarily-informed expectations of gene content of near-universal single-copy orthologs</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" md=3>
            <v-card color="grey lighten-4">
              <v-card-text>
                <v-form ref="form" v-model="form">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field 
                        v-model = "input.name" 
                        label="Project name" 
                        type="text"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>                    
                    <v-col cols="12">
                      <v-select
                        v-model = "input.assembly"
                        :items="fastaFiles" 
                        item-text="filename" 
                        item-value="path" 
                        label="Assembly" 
                        hint="Select an assembly"
                        :rules="[rules.required]"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select 
                        v-model="input.mode" 
                        :items="options" 
                        item-text="text" 
                        item-value="value" 
                        label="BUSCO analysis mode"
                        :rules="[rules.required]"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select 
                        v-model="input.linage" 
                        :items="lineages" 
                        item-text="text" 
                        item-value="value" 
                        label="BUSCO lineage to be used"
                        :rules="[rules.required]"
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn 
                  :disabled="!form" 
                  class="white--text"
                  color="deep-purple accent-4"
                  @click="runBusco"
                >
                  Run BUSCO
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md=9>
            <v-card>
              <v-card-text>
                <p>BUSCO is a tool to assess completeness of genome assembly, gene set and transcriptome. It is based on the concept of single-copy orthologs that should be highly conserved among the closely related species. For example, users who wish to study the completeness of a mammalian genome assembly will use single-copy orthologs discovered among mammalian species.</p>
                <div v-if="show">
                  <v-btn color="blue-grey" class="my-3 white--text" @click="download()">
                    Download Full Report <v-icon right dark>mdi-cloud-download</v-icon>
                  </v-btn> 
                  <pre>{{result.info}}</pre>
                </div>
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
       <p class="text-center"><b>Runing BUSCO<br>Please wait...</b></p>
    </v-overlay>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
export default {
  name: 'Quast',
  data(){
    return {
      form: false,
      overlay: false,
      show: false,
      input: {
        name: 'Busco',
        assembly: '',
        mode: 'genome',
        linage: 'bacteria_odb10',
        user: this.$store.state.user
      },
      options: [
          { text: 'Genome, for genome assemblies', value: 'genome' },
          { text: 'Transcriptome, for transcriptome assemblies', value: 'transcriptome' },
          { text: 'Proteins, for annotated gene sets', value: 'proteins' }
      ],
      lineages: [
          { value: null, text: 'Please select a linage' },
          { value: 'bacteria_odb10', text: 'Bacteria' },
          { value: 'embryophyta_odb10', text: 'Embryophyta'},
          { value: 'pseudomonadales_odb10', text: 'Pseudomonadales'},
          { value: 'nematoda_odb10', text: 'Nematoda'},
          { value: 'viridiplantae_odb10', text: 'Viridiplantae'},
      ],
      rules: {
        required: v => !!v || 'This field is required',
        length:  v => (v && v.length <= 15) || `Name must be less than 10 characters`,
      }, 
      result: ''
    }
  },

  computed: {
    ...mapGetters(['fastaFiles'])
  },

  methods: {

    async runBusco(){
      try {
        this.overlay = true
        this.show = false

        //this.result = this.input
        let res = await this.axios.post('/biotools/busco', this.input)
        console.log(res.data)
        this.result = res.data.result
        //this.result = res.data.result
        this.show = true
        this.overlay = false
      } catch (error) {
        console.log(error)
      }
    },

    async download(){
      try {
          let config = { headers : { token : this.$store.state.token}}
          let res = await this.axios.get(`/storage/download/${this.result.busco._id}`, config,  {responseType: 'blob'})
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${this.result.busco.filename}`);
          document.body.appendChild(link);
          link.click();
      } catch (error) {
          console.log(error)
      }
    },
  },

}
</script>

<style scoped>

.titulo {
  font-size: 18px;
  font-weight: bold;
}
.metric-name {
  font-weight: bold;
}
.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    padding: 8px;
}
.styled-table th,.styled-table td {
    padding: 12px 15px;
}
.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}
.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}



</style>