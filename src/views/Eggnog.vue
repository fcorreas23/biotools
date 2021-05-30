<template>
  <div class="eggnog">
    <v-card elevation="12" min-height="750">
      <v-card-title>eggNOG</v-card-title>
      <v-card-subtitle>
        <i>Jaime Huerta-Cepas, Kristoffer Forslund, Luis Pedro Coelho, Damian Szklarczyk, Lars Juhl Jensen, Christian von Mering, Peer Bork</i>, <b>Fast Genome-Wide Functional Annotation through Orthology Assignment by eggNOG-Mapper</b>, Molecular Biology and Evolution, Volume 34, Issue 8, August 2017, Pages 2115–2122, <a href="https://doi.org/10.1093/molbev/msx148" target="_blank">https://doi.org/10.1093/molbev/msx148</a>    
      </v-card-subtitle>
      <v-card-text>
        <p>Tool for fast functional annotation of novel sequences. It uses precomputed orthologous groups and phylogenies from the eggNOG database to transfer functional information from fine-grained orthologs only.</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'eggNOG',
  data(){
    return {
      
    }
  }

}
</script>