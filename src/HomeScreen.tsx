import React, { Component } from "react"
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { NavigationScreenProp } from "react-navigation"
import navConsts from "./navigation/navConsts"
import Session from "./Session"
import store from "./store"

type Props = {}
type State = {
  sessions: Session[]
  refreshList: boolean
}

function onPressPlus(navigation: NavigationScreenProp<any, any>) {
  navigation.navigate(navConsts.STACK_NAV_SESSION, { id: "" })
}

export default class HomeScreen extends Component<Props, State> {
  static navigationOptions = ({ navigation }: NavigationScreenProp<any, any>) => {
    return {
      title: "Home", // makes no text to go back from child screen (ios)
      headerStyle: { borderBottomWidth: 0 /*ios*/ },
      headerRight: (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity style={styles.navButton} onPress={() => onPressPlus(navigation)}>
            {/* <Material name='plus' size={25} color={theme.mainColor} /> */}
            <Text style={{ fontSize: 30 }}>+</Text>
          </TouchableOpacity>
        </View>
      ),
    }
  }

  navWillFocusSub: any

  constructor(props) {
    super(props)

    this.state = {
      sessions: [],
      refreshList: false,
    }
  }

  _onNavigationWillFocus = (payload: NavigationEventPayload) => {
    store.getSessions().then(sessions => {
      this.setState(previous => ({
        sessions,
      }))
    })
  }

  componentWillMount() {
    this.navWillFocusSub = this.props.navigation.addListener("willFocus", this._onNavigationWillFocus)
  }
  componentWillUnmount() {
    this.navWillFocusSub && this.navWillFocusSub.remove()
  }

  _onPressSession = (item: Session) => {
    this.props.navigation.navigate(navConsts.STACK_NAV_SESSION, { id: item.uuid })
  }

  _renderSession = ({ item, index }) => {
    // TODO show done and not done differently
    return (
      <TouchableWithoutFeedback onPress={() => this._onPressSession(item)}>
        <Text style={styles.header}>Session</Text>
        <Text style={styles.subHeader}>{item.chosenValues.join(", ")}</Text>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
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
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    borderRadius: 10,
  },
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
