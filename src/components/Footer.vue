<template>
  <v-footer 
    app
    clipped-left
    
    color="indigo" 
    dark
    absolute 
    padless
    >
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>SmartBiOS</strong>
    </v-col>
  </v-footer>
</template>