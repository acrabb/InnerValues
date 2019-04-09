import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation"
import HomeScreen from "../HomeScreen"
import Nav from "../navigation/navConsts"
import SessionScreen from "../SessionScreen"

const MainNavigator = createStackNavigator({
  [Nav.STACK_NAV_HOME]: HomeScreen,
  [Nav.STACK_NAV_SESSION]: SessionScreen,
})

export default createAppContainer(
  createSwitchNavigator(
    {
      [Nav.SWITCH_NAV_MAIN]: MainNavigator,
    },
    {
      initialRouteName: Nav.SWITCH_NAV_MAIN,
    }
  )
)
