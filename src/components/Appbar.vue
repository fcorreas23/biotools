<template>
    <div>
        <v-navigation-drawer app permanent clipped expand-on-hover dark v-if="user.username">
            <template v-slot:prepend>
                <v-list-item two-line>
                <v-list-item-avatar>
                    <v-avatar color="orange darken-4" size="25">
                        <v-icon dark> mdi-account-circle</v-icon>
                    </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{user.username}}</v-list-item-title>
                    <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
            </template>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-group
                    v-for="item in items"
                    :key="item.title"
                    :prepend-icon="item.action"
                    no-action
                >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="child in item.items"
                    :key="child.title"
                    :to="child.to"
                    
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="child.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                 </v-list-group>
            </v-list>
        </v-navigation-drawer>
        
        <v-app-bar 
            app
            clipped-left
            color="indigo" 
            dark
        >
            <v-toolbar-title>
                <v-btn text to="/">BIOTOOLS</v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <div v-if="user.username">
                <v-btn text to="/storage">
                    <span class="mr-2">Mis Archivos</span>
                </v-btn>
                <v-divider vertical></v-divider>

                <v-btn text @click="logout(user._id)">
                    <span class="mr-2">Logout</span>
                </v-btn>
            </div>
            <div v-else>
                <v-btn text to="/login">
                <span class="mr-2">Login</span>
            </v-btn>
            </div>
            
            
        </v-app-bar>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'Appbar',

    data () {
      return {
        items: [
            {
                action: 'mdi-content-cut',
                title: 'Pre-assembly',
                items: [
                    { title: 'FastQC', to: 'fastqc'},
                    { title: 'BBDuk', to: 'bbduk' },
                    { title: 'FastQ Screen', to: 'fastq-screen' },
                ]
            },
            {
                action: 'mdi-chart-gantt',
                title: 'Assembly',
                items: [
                    { title: 'Unicycler', to: 'unicycler' },
                    { title: 'MaSuRCA', to: 'masurca' },
                    { title: 'Platanus-allee', to: 'platanus' }

                ]
            },

            {
                action: 'mdi-equal-box',
                title: 'Post-assembly',
                items: [
                    { title: 'Quast', to: 'quast' },
                    { title: 'Busco', to: 'busco' },
                    { title: 'Blast', to: 'blast' }
                ]
            },
            {
                action: 'mdi-package-variant-closed',
                title: 'Genomic Prediction',
                items: [
                    { title: 'DFAST', to: 'dfast' },
                    { title: 'Prokka', to: 'prokka' },
                    { title: 'Augustus', to: 'augustus' },
                ]
            },
            {
                action: 'mdi-puzzle',
                title: 'Functional Annotation',
                items: [{ title: 'eggNOG', to: 'eggnog' }]
                
            }
        ],
      }
    },
    computed: {
        ...mapState(['user'])
    },

    methods: {
        ...mapActions(['logout'])
    },
}
</script>