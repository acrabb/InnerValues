/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react"
import AppNavigator from "./src/navigation/AppNavigator"

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

  render() {
    return <AppNavigator />
  }
}
