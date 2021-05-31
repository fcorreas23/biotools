<template>
  <div class="eggnog">
    <v-card elevation="6" min-height="780">
      <v-card-title>eggNOG Mapper</v-card-title>
      <v-card-subtitle>
        Fast Genome-Wide Functional Annotation 
      </v-card-subtitle>
      <v-card-text>
        <p>Tool for fast functional annotation of novel sequences. It uses precomputed orthologous groups and phylogenies from the eggNOG database to transfer functional information from fine-grained orthologs only.</p>
        <v-alert  border="top" colored-border type="info" elevation="2">
           En desarrollo de interfaz web y backend
        </v-alert>

        <iframe style="display:block; width:100%; height:100vh;" src="http://eggnog-mapper.embl.de/"></iframe>
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