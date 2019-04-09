import * as Utils from "./util"

export default class Round {
  public triage: string[]
  public nos: string[]
  public yeses: string[]
  public id: number

  constructor(initial: string[], num: number) {
    this.triage = Utils.shuffle(initial)
    this.nos = []
    this.yeses = []
    this.id = num
  }

  numberOfValuesInTriage(): number {
    return this.triage.length
  }

  remainingValues(): string[] {
    return this.triage.concat(this.yeses)
  }
}
