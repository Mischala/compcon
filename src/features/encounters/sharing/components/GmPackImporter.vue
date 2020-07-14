<template>
  <v-container style="min-height: 100%;" fluid>
    <v-card flat tile>
      <v-card-title>Select File to Import</v-card-title>
      <v-card-text>
        <v-file-input
          v-model="gmPackImportFile"
          counter
          label="GM Pack .JSON File"
          outlined
          dense
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang ="ts">
import { Vue, Component} from 'vue-property-decorator'
import { GmPack } from '@/class'

@Component
export class GmPackImporter extends Vue {
  gmPack: GmPack
  gmPackImportFile: string

}

</script>
