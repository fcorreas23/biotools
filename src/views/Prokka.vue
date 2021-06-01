<template>
  <div class="prokka">
    <v-card elevation="12" min-height="750">
      <v-card-title>ProkkA</v-card-title>
      <v-card-subtitle>
        <p>Prokka is a software tool to annotate bacterial, archaeal and viral genomes quickly and produce standards-compliant output files.</p>
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
           <v-card color="grey lighten-4">
             <v-card-text>
               <v-form ref="form" v-model="form">
                <v-text-field
                    v-model = "input.name"
                    label="Project name"
                    type="text"
                    :rules="[rules.required, rules.length]"
                >
                </v-text-field>
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
                <v-select
                  v-model="input.kingdom"
                  :items="kingdom"
                  label="Kingdom"
                  :rules="[rules.required]"
                ></v-select>
                <v-text-field
                    v-model = "input.locustag"
                    label="Locustag"
                    type="text"
                    hint="Locus tag prefix"
                    :rules="[rules.required, rules.length]"
                >
                </v-text-field>
               </v-form>
             </v-card-text>
             <v-card-actions>
                <v-btn 
                  :disabled="!form" 
                  class="white--text"
                  color="deep-purple accent-4"
                  @click="runProkka"
                >
                  Run Prokka
                </v-btn>
              </v-card-actions>
           </v-card>
          </v-col>
          <v-col cols="12" md="9">
            <v-card>
              <v-card-text>
                Prokka finds and annotates features (both protein coding regions and RNA genes, i.e. tRNA, rRNA) present on on a sequence. Note, Prokka uses a two-step process for the annotation of protein coding regions: first, protein coding regions on the genome are identified using Prodigal; second, the function of the encoded protein is predicted by similarity to proteins in one of many protein or protein domain databases. Prokka is a software tool that can be used to annotate bacterial, archaeal and viral genomes quickly, generating standard output files in GenBank, EMBL and gff formats.
                <pre class="mt-5">{{result}}</pre>
              </v-card-text>
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
       <p class="text-center"><b>Runing Prokka<br>Please wait...</b></p>
    </v-overlay>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
export default {
  name: 'Prokka',
  data(){
    return {
      form: false,
      overlay: false,
      input: {
        name: 'prokka',
        assembly: '',
        kingdom: 'Bacteria',
        locustag: '',
        user: this.$store.state.user
      },
      kingdom: ['Archaea', 'Bacteria', 'Mitochondria', 'Virues'],
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
    async runProkka() {
      try {
        this.overlay = true
        let res = await this.axios.post('/biotools/prokka', this.input)
        console.log(res.data)
        this.result = res.data.result.report
        this.overlay = false
      } catch (error) {
        console.log(error.response)
      }
    }
  },

}
</script>