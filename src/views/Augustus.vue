<template>
  <div class="augustus">
    <v-card elevation="12" min-height="750">
      <v-card-title>Augustus</v-card-title>
      <v-card-subtitle>
        A program that predicts genes in eukaryotic genomic sequences.
      </v-card-subtitle>
      <v-card-text>
        <p>AUGUSTUS is a software tool for gene prediction in eukaryotes based on a Generalized Hidden Markov Model, a probabilistic model of a sequence and its gene structure. Like most existing gene finders, the first version of AUGUSTUS returned one transcript per predicted gene and ignored the phenomenon of alternative splicing. </p>
        <v-alert  border="top" colored-border type="info" elevation="2">
           En desarrollo de interfaz web y backend
        </v-alert>
        <iframe style="display:block; width:100%; height:100vh;" src="http://bioinf.uni-greifswald.de/webaugustus/"></iframe>

      </v-card-text>

    </v-card>
  </div>
</template>

<script>
import { createLogger } from 'vuex'
// @ is an alias to /src

export default {
  name: 'Augustus',
  data(){
    return {
      
    }
  }

}
</script>