<template>
  <div class="bbduk">
    <v-card elevation="12" min-height="750">
      <v-card-title>BBDuk</v-card-title>
      <v-card-subtitle>
        Adapter/Quality Trimming and Filtering
      </v-card-subtitle>
      <v-card-text>
        <v-row>
         
          <v-col cols="12" md=3>
           <v-card color="grey lighten-4">
             <v-card-text>
                <v-form ref="form" v-model="form">
                  <v-row>
                    <v-col cols="12">
                      <v-checkbox  v-model="input.paired" label="Paired-end Sequencing"></v-checkbox>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="input.basename"
                        :counter="15"
                        label="Basename"
                        type="text"
                        hint="Basename good outfiles"
                        :rules="[rules.required, rules.length]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select 
                        v-model="input.fq1" 
                        :items="fastqFiles" 
                        item-text="filename" 
                        item-value="path" 
                        label="Forward reads"
                        dense
                        :rules="[rules.required]"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select 
                        v-model="input.fq2" 
                        :items="fastqFiles" 
                        item-text="filename" 
                        item-value="path" 
                        label="Reverse reads" 
                        :disabled="!input.paired"
                        dense
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="input.qtrim"
                        :menu-props="{ top: true, offsetY: true }"
                        :items="qtrim"
                        label="Side triming"
                        item-text="text"
                        item-value="value"
                        dense
                        hint="Trim read ends to remove bases with quality below trimq"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="input.trimq"
                        label="Trim side quality"
                        class="mt-0 pt-0"
                        type="number"
                        max=100
                        min=10
                        hint="Regions with average quality BELOW this will be trimmed"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="input.length"
                        label="Length required"
                        class="mt-0 pt-0"
                        type="number"
                        max=100
                        min=10
                        hint="Reads shorter than this after trimming will be discarded."
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="input.minavgquality"
                        label="Average quality"
                        class="mt-0 pt-0"
                        type="number"
                        max=100
                        min=10
                        hint="Reads with average quality (after trimming) below this will be discarded."
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="input.ftl"
                        label="Force-Trimming"
                        class="mt-0 pt-0"
                        type="number"
                        max=100
                        min=0
                        hint="This will trim the leftmost X bases and also trim the right end after to position (zero-based)."
                      ></v-text-field>
                    </v-col>                     
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn 
                  :disabled="!form" 
                  class="white--text"
                  color="deep-purple accent-4"
                  @click="runBBDuk"
                >
                  Run BBDuk
                </v-btn>
              </v-card-actions>
           </v-card>
          </v-col>
          <!-- RESULTADOS -->
          <v-col cols="12" md=9>
            <v-card>
              <v-card-text>
                <p> “Duk” stands for Decontamination Using Kmers. BBDuk was developed to combine most common data-quality-related trimming, filtering, and masking operations into a single high-performance tool.</p>
                  <div v-if="show">
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left"></th>
                            <th class="text-left">Reads</th>
                            <th class="text-left">Bases</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Input</td>
                            <td>{{result.readsIn}}</td>
                            <td>{{result.basesIn}}</td>
                          </tr>
                          <tr>
                            <td>Contaminants</td>
                            <td>{{result.readsKFiltered}}</td>
                            <td>{{result.basesKFiltered}}</td>
                          </tr>
                          <tr>
                            <td>QTrimmed</td>
                            <td>{{result.readsQTrimmed}}</td>
                            <td>{{result.basesQTrimmed}}</td>
                          </tr>
                          <tr>
                            <td>Total Removed</td>
                            <td>{{result.readsRemoved}}</td>
                            <td>{{result.basesRemoved}}</td>
                          </tr>
                          <tr>
                            <td>Result</td>
                            <td>{{result.readsOut}}</td>
                            <td>{{result. basesOut}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table> 
                  </div>           
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
       <p class="text-center"><b>Runing BBDuk<br>Please wait...</b></p>
    </v-overlay>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Bbduk',
  data(){
    return {
      form: false,
      absolute: true,
      overlay: false,
      show: false,
      input: {
        paired: true,
        basename: '',
        fq1: '',
        fq2: '',
        minavgquality: 20,
        trimq : 20,
        qtrim : 'rl',
        length: 35,
        ftl : 0,
        user: this.$store.state.user
      },
      qtrim: [
        {text: 'Both', value: 'rl'},
        {text: 'Rigth End', value: 'r'},
        {text: 'Left End', value: 'l'}
      ],
      rules: {
        required: v => !!v || 'This field is required',
        length:  v => (v && v.length <= 15) || `Name must be less than 10 characters`,
      }, 
      result: ''
    }
  },
  computed: {
    ...mapGetters(['fastqFiles'])
  },

  methods: {
    ...mapActions(['loadStorage']),
    async runBBDuk() {
      try {
        this.overlay = true
        this.show = false
        let res = await this.axios.post('/biotools/bbduk', this.input)
        this.result = res.data.result
        this.overlay = false
        this.show = true
        this.loadStorage(this.$store.state.user._id)
      } catch (error) {
        this.result = error.response.data
        this.overlay = false
        this.show = true
      }
    }
  },

}
</script>