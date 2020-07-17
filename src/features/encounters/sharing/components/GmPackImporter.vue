<template>
  <v-container style="min-height: 100%;" fluid>
    <h1 v-resize-text="{ maxFontSize: '36pt' }" class="heading">IMPORT GM PACK</h1>
    <v-card flat tile>
      <v-card-title>Select File to Import</v-card-title>
      <v-card-text>
        <v-file-input
          v-model="GmPackImportFile"
          label="GM Pack .JSON File"
          outlined
          dense
        />
      </v-card-text>
      <cc-btn large color="primary" @click="importGmPack()">IMPORT PACK</cc-btn>
    </v-card>
  </v-container>
</template>

<script lang ="ts">
import { Vue, Component, Watch} from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { importData } from '@/io/Data'
import { GmPack } from '@/class'
import { IGmPackData } from '@/interface'
import { NpcStore, EncounterStore, MissionStore } from '@/store'

@Component({})
export default class GmPackImporter extends Vue {
  gmPack: GmPack
  GmPackImportFile: File = null

  @Watch('GmPackImportFile')
  private async loadGmPackFile(gmPackFile: File): Promise<void> {
    const fileData = await importData<IGmPackData>(gmPackFile)
    this.gmPack = GmPack.Deserialize(fileData);
  }

  private importGmPack(): void {
    const npcStore = getModule(NpcStore, this.$store)
    const encounterStore = getModule(EncounterStore, this.$store)
    const missionStore = getModule(MissionStore, this.$store)

    const npcsToAdd = this.gmPack.npcs.filter((npc) => !npcStore.getNpcs.includes(npc))
    const encountersToAdd = this.gmPack.encounters.filter((encounter) => !encounterStore.getEncounters.includes(encounter))
    const missiomsToAdd = this.gmPack.missions.filter((mission) => !missionStore.getMissions.includes(mission))

    npcsToAdd.map((npc) => npcStore.addNpc(npc))
    encountersToAdd.map((encounter) => encounterStore.addEncounter(encounter))
    missiomsToAdd.map((mission) => missionStore.addMission(mission))
  }
}
</script>
