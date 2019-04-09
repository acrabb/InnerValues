import React, { Component } from "react"
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
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
    // TODO show done and not done differently
    return (
      <View>
        <Text style={styles.header}>Session</Text>
        <Text style={styles.subHeader}>{item.chosenValues.join(", ")}</Text>
      </View>
    )
  }

  _onPressPlus = () => {
    // navigate to session screen with new session
  }
  _onPressSession = (item: Session) => {
    // navigate to session screen with tapped session
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.value}>Home</Text>
          <TouchableOpacity
            style={{
              width: 50,
              height: "100%",
              backgroundColor: "#1ad9",
              alignItems: "center",
              borderRadius: 10,
              // alignSelf: "flex-end",
            }}
            onPress={this._onPressPlus}
          >
            <Text style={{ fontSize: 50 }}>+</Text>
          </TouchableOpacity>
        </View>
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
  subHeader: {
    fontSize: 15,
    color: "#333333",
    marginBottom: 5,
    paddingLeft: 10,
    fontStyle: "italic",
  },
  header: {
    fontSize: 20,
    color: "#333333",
    marginBottom: 5,
  },
})
