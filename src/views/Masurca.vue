<template>
  <div class="masurca">
    <v-card elevation="12" min-height="750">
      <v-card-title>MaSuRCA</v-card-title>
      <v-card-subtitle>
        <i>Zimin AV, Marçais G, Puiu D, Roberts M, Salzberg SL, Yorke JA.</i> <b>The MaSuRCA genome assembler</b>. Bioinformatics. 2013;29(21):2669-2677. <a href="https://doi.org/10.1093/bioinformatics/btt476" target="_blank">doi:10.1093/bioinformatics/btt476</a>
      </v-card-subtitle>
      <v-card-text>
        <p>The MaSuRCA assembler combines the benefits of deBruijn graph and Overlap-Layout-Consensus assembly approaches. Since version 3.2.1 it supports hybrid assembly with short Illumina reads and long high error PacBio/MinION data.</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Masurca',
  data(){
    return {
      
    }
  }

}
</script>