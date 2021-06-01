<template>
    <div class="storgae">
        <v-card elevation="6" min-height="770">
            <v-card-title>Storage</v-card-title>
            <v-card-subtitle>Almacenamiento temporal de archivos subidos para análisis y resultados generados </v-card-subtitle>
            <v-card-text>
                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="blue-grey"
                            class="ma-2 white--text"
                            v-bind="attrs"
                            v-on="on"
                        >
                            Subir archivo
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="headline grey lighten-2">Upload Files</v-card-title>
                        <v-card-text>
                            <v-form
                                ref="form"
                                v-model="form"
                                class="pa-4"
                            >
                                <v-file-input 
                                    v-model="file.file"
                                    counter 
                                    show-size 
                                    accept=".fna, .fasta, .faa, .fa, .faa, .fastq, .fq , .gz"
                                    small-chips
                                    label="File input"
                                    :rules="[rules.required]"
                                ></v-file-input>
                                <v-select
                                    v-model="file.type"
                                    :items="items"
                                    item-text="text"
                                    item-value="value"
                                    label="Please select the file format *"
                                    :rules="[rules.required]"
                                ></v-select>
                                <v-textarea
                                    v-model="file.description"
                                    auto-grow
                                    filled
                                    color="deep-purple"
                                    label="Description"
                                    rows="1"
                                ></v-textarea>
                            <small>*indicates required field</small>
                            <template >
                                <v-progress-linear v-show="progress" :value="value"></v-progress-linear>
                            </template>
                        </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn small @click="clear">Close</v-btn>
                            <v-btn
                                :disabled="!form"
                                class="white--text"
                                color="blue-grey"
                                small
                                @click="sendFile"
                            >
                               Upload
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                
                <v-divider class="my-5"></v-divider>
                
                <v-subheader>Uploaded</v-subheader>
                <v-row>
                    <v-col cols="12" xs="12" sm="6" md="4" lg="2" v-for="item in uploadedFiles" :key="item._id">
                        <v-card 
                            elevation="5"
                            max-width="400"
                        >
                            <v-card-title>
                                <span class="title">{{item.filename}}</span>
                            </v-card-title>
                            <v-card-subtitle>
                                <v-chip label small>{{item.type}}</v-chip>
                            </v-card-subtitle>
                            <v-card-text>
                                Our blouses are available in 8 colors. You can custom order a built-in arch support for any of the models.
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="red lighten-1" dark x-small elevation="3" @click="deleteFile(item._id)">Delete</v-btn>
                                <v-btn color="green lighten-1" dark x-small elevation="3" @click="download(item._id, item.filename)">Download</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <v-subheader>Results</v-subheader>
                <v-row>
                    <v-col cols="12" xs="12" sm="6" md="4" lg="2" v-for="item in resultFiles" :key="item._id">
                        <v-card 
                            elevation="5"
                            max-width="450"
                        >
                            <v-card-title>
                                <span class="title">{{item.filename}}</span>
                            </v-card-title>
                            <v-card-subtitle>
                                <v-chip label small>{{item.type}}</v-chip>
                            </v-card-subtitle>
                            <v-card-text>
                                {{item.description}}
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="red lighten-1" dark x-small elevation="3" @click="deleteFile(item._id)">Delete</v-btn>
                                <v-btn color="green lighten-1" dark x-small elevation="3" @click="download(item._id, item.filename)">Download</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters} from 'vuex'
    export default {
        name:'Storage',
        data() {
            return {
                form: false,
                dialog: false,
                progress:false,
                value: 0,
                items: [
                    {value: 'fastq', text:'Sequencing read data (fastq, fq)'},
                    {value: 'fasta', text:'A sequence record (fasta, fna, fnn, faa, fs)'},
                    {value: 'other', text:'Other file format'},
                ],

                file: {
                    file: null,
                    type: '',
                    description: ''
                },
                rules: {
                    required: v => !!v || 'This field is required',
                },
            }
        },
        computed: {
            ...mapState(['files']),
            ...mapGetters(['uploadedFiles', 'resultFiles'])
        },
        mounted () {
        },

        created(){
            
            this.loadStorage(this.$store.state.user._id);
        },

        methods: {
             ...mapActions(['loadStorage']),

            async sendFile(){
                const formData = new FormData;
                formData.append('file', this.file.file)
                formData.append('user', this.$store.state.user._id)
                formData.append('type', this.file.type)
                formData.append('description', this.file.description)
                this.progress = true 

                const response = await this.axios.post('/storage/upload', formData, {
                    onUploadProgress: ProgressEvent => { 
                        let progress  = Math.round((ProgressEvent.loaded / ProgressEvent.total)*100)
                        this.value = progress
                    }
                })
                if(this.value == 100){
                     this.loadStorage(this.$store.state.user._id);
                }
            },

            async deleteFile(file){
                try {
                    let config = { headers : { token : this.$store.state.token}}
                    confirm('Estás segura de que quieres eliminar este archivo?') &&
                    await this.axios.delete(`/storage/delete/${file}`, config)
                    this.loadStorage(this.$store.state.user._id);
                } catch (error) {
                    console.log(error)
                }
            },

           async download(file, filename){
              try {
                  let config = { headers : { token : this.$store.state.token}}

                  const response = await fetch(`http://localhost:4000/api/storage/download/${file}`);
                  const blob = await response.blob();
                  const newBlob = new Blob([blob]);

                  if(window.navigator && window.navigator.msSaveOrOpenBlob){
                      window.navigator.msSaveOrOpenBlob(newBlob);
                  }else{
                      const objUrl = window.URL.createObjectURL(newBlob);
                      const link = document.createElement('a');
                      link.href = objUrl;
                      link.download = filename;
                      link.click();
                      setTimeout(() => {
                          window.URL.revokeObjectURL(objUrl);
                      }, 250);
                  }

                  /* await this.axios.get(`/storage/download/${file}`, config, {responseType: 'arraybuffer'})
                  .then( res =>{
                      if (!window.navigator.msSaveOrOpenBlob){
                          console.log('HOLA')
                        // BLOB NAVIGATOR
                        let url = window.URL.createObjectURL(new Blob([res.data], {type: 'application/zip'}));
                        let link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `${filename}`);
                        document.body.appendChild(link);
                        link.click();

                        setTimeout(() => {
                            window.URL.revokeObjectURL(url);
                        }, 250);
                    }else{
                        // BLOB FOR EXPLORER 11
                        const url = window.navigator.msSaveOrOpenBlob(new Blob([res.data]),`${filename}`);
                    }
                  }) */
                  
              } catch (error) {
                  console.log(error)
              }
            },

            clear(){
                this.dialog = false
                this.file.file = null,
                this.file.type = '',
                this.file.description = ''
                
            }
        }
        
    }
</script>
