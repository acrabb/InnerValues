import uuidv4 from "uuid/v4"
import Round from "./Round"
import { Saveable } from "./saveable"
import Store from "./store"

const NUM_VALUES_TARGET = 5

export default class Session extends Saveable {
  id: string
  rounds: Round[]
  isDone: boolean = false
  currentValue: string | undefined
  chosenValues: string[] = []

  constructor(initialList: string[]) {
    super()
    this.id = uuidv4()
    this.rounds = [new Round(initialList, 1)]
    this.currentValue = this.setNextValue()!
  }

  currentRound(): Round {
    return this.rounds.slice(-1)[0]
  }

  setNextValue(): string | undefined {
    // TODO handle undefined currentRound ?
    this.currentValue = this.currentRound().triage.pop()
    return this.currentValue
  }

  handleChoice(value: string, isYes: boolean) {
    if (isYes) {
      this.currentRound().yeses.push(value)
    } else {
      this.currentRound().nos.push(value)
      if (this.currentRound().yeses.length + this.currentRound().triage.length === NUM_VALUES_TARGET) {
        // WE'RE DONE!
        this.chosenValues = this.currentRound().remainingValues()
        this.currentValue = undefined
        this.isDone = true
        Store.saveSession(this)
        return
      }
    }

    const nextValue = this.setNextValue()
    if (!nextValue) {
      this.incrementRound()
    }
    Store.saveSession(this)
  }

  handleSkip(value: string) {
    this.currentRound().triage.unshift(value)
    this.setNextValue()
    Store.saveSession(this)
  }

  // returns the round we're in if we're in one
  // returns undefined if we're done
  incrementRound(): Round | undefined {
    // copy list to new round and push new round.
    // save

    const newRound = new Round(this.currentRound().yeses, this.rounds.length + 1)
    this.rounds.push(newRound)
    this.setNextValue()
    return newRound
  }

  remainingValuesInCurrentRound(): string[] {
    return this.currentRound().triage
  }
}
