<template>
  <div class="quast">
    <v-card elevation="12" min-height="750">
      <v-card-title>Quast</v-card-title>
      <v-card-subtitle>Quality Assessment Tool for Genome Assemblies</v-card-subtitle>
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
                      <v-text-field 
                        v-model = "input.thresholds"
                        label="Thresholds" 
                        type="text"
                        hint="Comma-separated list of contig length thresholds"
                        persistent-hint
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
                        v-model="input.reference" 
                        :items="references" 
                        item-text="name" 
                        item-value="short_name" 
                        label="Reference Genome"
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
                  @click="runQuast"
                >
                  Run QUAST
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md=9>
            <v-card>
              <v-card-text>
                <p>QUAST stands for QUality ASsessment Tool. The tool evaluates genome assemblies by computing various metrics. This document provides instructions for the general QUAST tool for genome assemblies</p>
                <div v-if="show">
                  <v-btn color="blue-grey" class="ma-2 white--text" @click="download()">
                    Download Full Report <v-icon right dark>mdi-cloud-download</v-icon>
                  </v-btn>

                  <v-row>
                    <v-col cols="12" sm="12" md="8">
                        <span> statistics whit reference</span>
                       <table class="styled-table">
                        <thead>
                          <tr>
                            <th>{{result.report[13].item}}</th>
                            <th>{{result.report[14].item}}</th>
                            <th>{{result.report[15].item}}</th>
                            <th>{{result.report[16].item}}</th>
                            <th>{{result.report[36].item}}</th>
                            <th>{{result.report[34].item}}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{{result.report[13].value}}</td>
                            <td>{{result.report[14].value}}</td>
                            <td>{{result.report[15].value}}</td>
                            <td>{{result.report[16].value}}</td>
                            <td>{{result.report[36].value}}</td>
                            <td>{{result.report[34].value}}</td>
                          </tr>
                          
                        </tbody>
                      </table>

                      <p><span class='metric-name'># contigs</span> is the total number of contigs in the assembly.</p>
                      <p><span class='metric-name'>Largest contig</span> is the length of the longest contig in the assembly.</p>
                      <p><span class='metric-name'>Total length</span> is the total number of bases in the assembly.</p>
                      <p><span class='metric-name'>Reference length</span> is the total number of bases in the reference genome.</p>
                      <p><span class='metric-name'>Genome fraction (%)</span> is the percentage of aligned bases in the reference genome. A base in the reference genome is aligned if there is at least one contig with at least one alignment to this base. Contigs from repetitive regions may map to multiple places, and thus may be counted multiple times.</p>
                      <p><span class='metric-name'># unaligned contigs</span> is the number of contigs that have no alignment to the reference sequence. The value "X<span class='rhs'>&nbsp;</span>+<span class='rhs'>&nbsp;</span>Y part" means X totally unaligned contigs plus Y partially unaligned contigs.</p>
                    
                    </v-col>

                    <v-col cols="12" sm="12" md="4">
                      <span>Statistics without reference</span>
                      <table class="styled-table">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(n, i) in 13" :key="i">
                            <td>{{result.report[i].item}}</td>
                            <td>{{result.report[i].value}}</td>
                          </tr>
                          <tr v-for="(n, i) in 8" :key="i">
                            <td>{{result.report[i + 19].item}}</td>
                            <td>{{result.report[i + 19].value}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </v-col>
                  </v-row>            
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
       <p class="text-center"><b>Runing Quast<br>Please wait...</b></p>
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
        name: 'quast',
        thresholds: '0,1000,5000,10000,25000,50000',
        assembly: '',
        reference: '',
        user: this.$store.state.user
      },
      references: [],
      rules: {
        required: v => !!v || 'This field is required',
        length:  v => (v && v.length <= 15) || `Name must be less than 10 characters`,
      }, 
      result: ''
    }
  },
  
  created () {
    this.species();
  },

  computed: {
    ...mapGetters(['fastaFiles'])
  },

  methods: {
    async species() {
      try {
        let res = await this.axios.get('/specie/list')
        this.references = res.data.result
      } catch (error) {
        console.log(error)
      }
    },

    async runQuast(){
      try {
        this.overlay = true
        this.show = false
        let res = await this.axios.post('/biotools/quast', this.input)
        this.result = res.data.result
        this.show = true
        this.overlay = false
      } catch (error) {
        console.log(error)
      }
    },

    async download(){
      try {
          let res = await this.axios.get(`/storage/download/${this.result.quast._id}`, {responseType: 'blob'})
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${this.result.quast.filename}`);
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