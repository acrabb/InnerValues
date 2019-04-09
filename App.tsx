/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react"
import { StyleSheet } from "react-native"
import HomeScreen from "./src/HomeScreen"

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
type State = {}
export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    // store.getSessions().then(sessions => {
    //   // store.deleteSession(sessions[0])
    //   if (sessions[0]) {
    //     this.setState(previous => ({
    //       session: sessions[0],
    //       currentValue: sessions[0].currentValue,
    //     }))
    //   }
    // })
  }

  render() {
    return <HomeScreen />
    // return <SessionScreen />
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
