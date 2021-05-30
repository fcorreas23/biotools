<template>
    <div class="blast">
        <v-card elevation="12" min-height="750">
            <v-card-title>Blast</v-card-title>
            <v-card-subtitle>Search a nucleotide database using a nucleotide query.</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md=3>
                       <v-card class="pa-3">
                           <v-select :items="items" label="Assembly" dense outlined></v-select>
                       </v-card>
                        <v-card class="pa-3">
                           <v-select :items="items" label="Database" dense outlined></v-select>
                       </v-card>
                    </v-col>
                    <v-col cols="12" md=9>
                        <v-card class="pa-3">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui exercitationem debitis explicabo quisquam delectus accusamus, et reprehenderit possimus assumenda ducimus veritatis consectetur voluptatum odit consequuntur optio iusto, esse aperiam! Perferendis!
                       </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: 'Blast',
        data() {
            return {
                 items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            }
        },
    }
</script>

