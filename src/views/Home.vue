<template>
  <div class="home">
    <v-card elevation="6" min-height="770" color="#E8EAF6">
      <v-card-title> <h1>Herramientas Bioinformáticas</h1></v-card-title>
      <v-card-subtitle> Red Genómica INIA</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="8" >
            <v-card class="nb-2">
              <v-card-title>Pre-assembly</v-card-title>
              <v-card-text>Antes de hacer cualquier cosa con lecturas sin procesar (mapeo, agrupamiento, ensamblaje, etc.), generalmente es prudente realizar ciertos pasos de pre-procesamiento. Y estos pasos se realizan mejor en un orden específico, junto con la herramienta de sugerencias. Tenga en cuenta que muchos de ellos (como el recorte de calidad) son opcionales. El recorte de adaptadores, no son opcionales y siempre deben hacerse.</v-card-text>
            </v-card>
            <v-card>
              <v-card-title>Assembly</v-card-title>
              <v-card-text> Para generar una secuencia que represente el genoma completo de un organismo es necesario armarlo, acomodando dichas secuencias mediante un método llamado ensamble de genoma. Éste es un proceso computacional repetitivo con varios ciclos de armado, evaluación y mejoramiento. El ensamble es un cálculo informático complejo esencial en la biología, ya que permite analizar la información contenida en los genomas.>De novo assembly es un método para construir genomas a partir de un gran número de fragmentos de ADN (cortos o largos), sin conocimiento a priori de la secuencia u orden correcto de esos fragmentos.</v-card-text>
            </v-card>
            <v-card>
              <v-card-title>Post-assembly</v-card-title>
              <v-card-text>Al evaluar la calidad del genoma ensamblado, se obtienen medidas que pueden tomar en cuenta las características de las secuencias generadas en el proceso o utilizar información adicional. Estas nos indican si el ensamble fue hecho de manera correcta.</v-card-text>
            </v-card>
            <v-card>
              <v-card-title>Analysis, Annotation</v-card-title>
              <v-card-text>La anotación del genoma es el proceso de identificar características de interés en el ensamble del ADN genómico y etiquetarlas con información útil. La anotación funcional es similar a la de genomas, asignando anotaciones a todas las secuencias predichas y generando tablas resumen con la distribución de genes por proceso biológico o localización subcelular</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" >
            <img src="@/assets/img/diagrama.png"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data(){
    return {
      
    }
  },
  computed: {
   
  },
}
</script>
