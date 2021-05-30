<template>
  <div class="home">
    <v-sheet
      color="white"
      elevation="7"
      class="pa-6"
    >
    <p>Antes de hacer cualquier cosa con lecturas sin procesar (mapeo, agrupamiento, ensamblaje, etc.), generalmente es prudente realizar ciertos pasos de pre-procesamiento. Y estos pasos se realizan mejor en un orden específico, junto con la herramienta de sugerencias. Tenga en cuenta que muchos de ellos (como el recorte de calidad) son opcionales. El recorte de adaptadores, no son opcionales y siempre deben hacerse.</p>

    <p>De novo assembly es un método para construir genomas a partir de un gran número de fragmentos de ADN (cortos o largos), sin conocimiento a priori de la secuencia u orden correcto de esos fragmentos.</p>

    <p>Evaluar la calidad del genoma ensamblado. Se obtienen medidas que pueden tomar en cuenta las características de las secuencias generadas en el proceso o utilizar información adicional. Estas nos indican si el ensamble fue hecho de manera correcta.</p>

    <p>La anotación del genoma es el proceso de identificar características de interés en un conjunto de secuencias de ADN genómico y etiquetarlas con información útil.</p>
    
    <p>La anotación funcional es similar a la de genomas, asignando anotaciones a todas las secuencias predichas y generando tablas resumen con la distribución de genes por proceso biológico o localización subcelular</p>
    

    </v-sheet>
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
