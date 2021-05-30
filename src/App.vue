<template>
  <v-app>
    
    <Appbar />
    
    <v-main>
      <v-container fluid class="pa-3">
        <router-view/>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Appbar from './components/Appbar'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Appbar,
    Footer
  },
  created () {
    this.$store.dispatch("autoLogin");
    this.user()
  },
  methods: {
    user() {
      if(this.$store.state.user){
        this.$store.dispatch("loadStorage", this.$store.state.user._id);
      }else{
        console.log('No existe el usuario')
      }
      
    }
  },
};
</script>
