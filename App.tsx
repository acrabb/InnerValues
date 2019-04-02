/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import * as Utils from "./src/util.ts"

/*
  TODO
  - show percentage
  - have user swipe
  - better layout of buttons
*/

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
    let values: string[] = require("./src/values.json")
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

  _onPressSkip = () => {
    let newCurrentValue = this.state.valueList.pop()
    if (!newCurrentValue) {
      return
    }
    let newValueList = this.state.valueList
    newValueList.unshift(this.state.currentValue!)

    this.setState(previous => ({
      currentValue: newCurrentValue,
      valueList: newValueList,
    }))
  }

  render() {
    // console.log("YES")
    // console.log(this.state.yesValues)
    // console.log("NO")
    // console.log(this.state.noValues)

    const items = this.state.yesValues.map(function(item) {
      return <Text style={styles.header}>{item}</Text>
    })

    return (
      <View style={styles.container}>
        {!this.state.done && (
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.header}>
              Round {this.state.round}: {this.state.valueList.length} left!
            </Text>
            <Text style={styles.value}>{this.state.currentValue}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <Button title='No' onPress={this._onPressNo} />
              <Button title='Skip' onPress={this._onPressSkip} />
              <Button title='Yes' onPress={this._onPressYes} />
            </View>
          </View>
        )}
        {this.state.done && (
          <View>
            <Text style={styles.value}>Done!</Text>
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
  value: {
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
    margin: 10,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
})
