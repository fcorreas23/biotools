<template>
  <div class="platanus">
    <v-card elevation="12" min-height="750">
      <v-card-title>Platanus-allee</v-card-title>
      <v-card-subtitle>
        <i>Kajitani R,  Yoshimura D, Okuno M, Minakuchi Y, Kagoshima H,  Fujiyama A, Kubokawa K, Kohara Y, Toyoda A, Itoh T</i>, <b>“Platanus-allee is a de novo haplotype assembler enabling a comprehensive access to divergent heterozygous regions”.</b> Nature Communications 10 Article number: 1702 (2019). <a href="https://rdcu.be/bwkPI" target="_blank">doi: 10.1038/s41467-019-09575-2</a>
      </v-card-subtitle>
      <v-card-text>
        <p>Platanus-allee is a de novo haplotype assembler (phasing tool), which assembles each haplotype sequence in a diploid genome. Compared to the read mapping-based haplotype phasing tools, Platanus-allee is especially useful to analyze highly divergent (heterozygous) regions in which haplotypes extremely differ.</p>
        <v-alert  border="top" colored-border type="info" elevation="2">
           En desarrollo de interfaz web
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Platanus',
  data(){
    return {
      
    }
  }

}
</script>