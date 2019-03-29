/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react"
import { Button, Platform, StyleSheet, Text, View } from "react-native"
import * as Utils from "./src/util.ts"

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android: "Double tap R on your keyboard to reload,\n" + "Shake or press menu button for dev menu",
})

type Props = {}
type State = {
  valueList: string[]
  noValues: string[]
  yesValues: string[]
  currentValue?: string
  round: number
  done: boolean
}
export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      valueList: [],
      noValues: [],
      yesValues: [],
      currentValue: "",
      round: 1,
      done: false,
    }
  }

  componentWillMount() {
    let values: string[] = require("./src/valuesShort.json")
    Utils.shuffle(values)
    let currentValue = values.pop()

    this.setState(previous => ({
      valueList: values,
      currentValue: currentValue,
    }))
  }

  showValues() {
    this.setState(previous => ({
      done: true,
    }))
  }

  incrementRound() {
    if (this.state.yesValues.length <= 5) {
      console.log("WE'RE DONE! :D")
      this.showValues()
      return
    }

    let newList = this.state.yesValues
    Utils.shuffle(newList)
    let newCurrentValue = newList.pop()

    this.setState(previous => ({
      yesValues: [],
      valueList: newList,
      currentValue: newCurrentValue,
      round: previous.round + 1,
    }))
  }

  handlePress(isYes: boolean) {
    let addToList = isYes ? this.state.yesValues : this.state.noValues
    addToList.push(this.state.currentValue!)
    let newCurrentValue = this.state.valueList.pop()

    if (!newCurrentValue) {
      this.incrementRound()
    } else {
      this.setState(previous => ({
        currentValue: newCurrentValue,
      }))
    }
  }

  _onPressNo = () => {
    this.handlePress(false)
  }

  _onPressYes = () => {
    this.handlePress(true)
  }

  _onPressSkip = () => {}

  render() {
    console.log("YES")
    console.log(this.state.yesValues)
    console.log("NO")
    console.log(this.state.noValues)

    const items = this.state.yesValues.map(function(item) {
      return <Text style={styles.instructions}>{item}</Text>
    })

    return (
      <View style={styles.container}>
        {!this.state.done && (
          <View>
            <Text style={styles.instructions}>Round {this.state.round}</Text>
            <Text style={styles.welcome}>{this.state.currentValue}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <Button title='No' onPress={this._onPressNo} />
              <Button title='Yes' onPress={this._onPressYes} />
            </View>
            <Button title='Skip' onPress={this._onPressSkip} />
          </View>
        )}
        {this.state.done && (
          <View>
            <Text style={styles.welcome}>Done!</Text>
            {items}
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
})
