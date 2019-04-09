import React, { Component } from "react"
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native"
import Session from "./Session"
import store from "./store"

type Props = {}
type State = {
  sessions: Session[]
  refreshList: boolean
}

export default class HomeScreen extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      sessions: [],
      refreshList: false,
    }
  }

  componentWillMount() {
    store.getSessions().then(sessions => {
      this.setState(previous => ({
        sessions,
      }))
    })
  }

  _renderSession = ({ item, index }) => {
    return (
      <View>
        <Text>Session: {item.id}</Text>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Home</Text>
        <FlatList
          data={this.state.sessions}
          renderItem={this._renderSession}
          keyExtractor={(item: Session, index: number) => item.uuid}
          extraData={this.state.refreshList}
        />
      </SafeAreaView>
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
