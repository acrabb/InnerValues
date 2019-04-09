import React, { Component } from "react"
import { StyleSheet, Text, View } from "react-native"

type Props = {}
type State = {}

export default class HomeScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
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
