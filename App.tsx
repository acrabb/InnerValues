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
import Session from "./src/Session"

/*
  TODO
  - Store the user's values along the way. (so you can continue where you left off.)
  - Store the user's values at every round (?)
  - Store the users values when the reach the end.
  - show percentage
  - have user swipe
  - X Remove duplicate values
  - X better layout of buttons
*/

type Props = {}
type State = {
  currentValue?: string
  session: Session
  done: boolean
}
export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // TODO Move this logic back to cWM, and check if there are any saved Sessions in progress
    const session = new Session(require("./src/valuesShort.json"))

    this.state = {
      session,
      currentValue: session.currentValue,
      done: false,
    }
  }

  componentWillMount() {
    // let values: string[] = require("./src/values.json")
    // Utils.shuffle(values)
    // let currentValue = values.pop()
    // this.setState(previous => ({
    //   valueList: values,
    //   currentValue: currentValue,
    // }))
  }

  _onPressNo = () => {
    this.state.session.handleChoice(this.state.session.currentValue, false)
    let done = false
    if (!this.state.session.currentValue) {
      done = true
    }

    this.setState(previous => ({
      currentValue: this.state.session.currentValue,
      done,
    }))
  }

  _onPressYes = () => {
    this.state.session.handleChoice(this.state.session.currentValue, true)
    this.setState(previous => ({
      currentValue: this.state.session.currentValue,
    }))
  }

  _onPressSkip = () => {
    this.state.session.handleSkip(this.state.session.currentValue)
    this.setState(previous => ({
      currentValue: this.state.session.currentValue,
    }))
  }

  render() {
    const items = this.state.session.chosenValues.map(function(item) {
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
              Round {this.state.session.currentRound().id}:{" "}
              {this.state.session.remainingValuesInCurrentRound().length} left!
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
