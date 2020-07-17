import { Npc, Encounter, Mission } from '@/class'
import { IGmPackData } from './Interfaces'

export class GmPack {
  private _name: string
  private _description: string
  private _missions: Mission[]
  private _encounters: Encounter[]
  private _npcs: Npc[]

  constructor(name: string, description: string, missions: Mission[], encounters: Encounter[], npcs: Npc[]) {
    this._name = name
    this._description = description
    this._missions = missions
    this._encounters = encounters
    this._npcs = npcs
  }

  public static Deserialize(gmPackData: IGmPackData): GmPack {
    const missions = gmPackData.missions.map(mission => Mission.Deserialize(mission))
    const encounters = gmPackData.encounters.map(encounter => Encounter.Deserialize(encounter))
    const npcs = gmPackData.npcs.map(npc => Npc.Deserialize(npc))

    return new GmPack(
      gmPackData.name,
      gmPackData.description,
      missions,
      encounters,
      npcs
    )
  }

  public get npcs(): Npc[] {
    return this._npcs
  }

  public get encounters(): Encounter[] {
    return this._encounters
  }

  public get missions(): Mission[] {
    return this._missions
  }

  public static Serialize(gmPack: GmPack): IGmPackData {
    const missionData = gmPack.missions.map((mission) => Mission.Serialize(mission))
    const encounterData = gmPack.encounters.map((encounter) => Encounter.Serialize(encounter))
    const npcData = gmPack.npcs.map((npc) => Npc.Serialize(npc))

    return {
      name: gmPack._name,
      description: gmPack._description,
      missions: missionData,
      encounters: encounterData,
      npcs: npcData
    }
  }
}
