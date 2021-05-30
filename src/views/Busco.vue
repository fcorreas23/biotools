<template>
  <div class="busco">
    <v-card elevation="12" min-height="750">
      <v-card-title>Busco</v-card-title>
      <v-card-subtitle>
        <i>Seppey M., Manni M., Zdobnov E.M.</i>(2019) <b>BUSCO: Assessing Genome Assembly and Annotation Completeness.</b> <br> In: Kollmar M. (eds) Gene Prediction. Methods in Molecular Biology, vol 1962. Humana, New York, NY. 2019 <a href="https://link.springer.com/protocol/10.1007/978-1-4939-9173-0_14" target="_blank">doi.org/10.1007/978-1-4939-9173-0_14</a>
      </v-card-subtitle>
      <v-card-text>
        <p>Based on evolutionarily-informed expectations of gene content of near-universal single-copy orthologs, BUSCO metric is complementary to technical metrics like N50.</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Busco',
  data(){
    return {
      
    }
    
  },
  
  computed: {
    ...mapGetters(['fastaFiles'])
  }

}
</script>