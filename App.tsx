import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "react-native"
import { LogProvider } from "./context/LogContext"
import LoginScreen from "./screens/LoginScreen"
import ParentPage  from "./screens/ParentDashboard"
import ChildPage  from "./screens/ChildDashboard"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <LogProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#111827" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#111827",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            contentStyle: {
              backgroundColor: "#030712", // gray-950
            },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="ParentDashboard"
            component={ParentPage}
            options={{ title: "Panel de Control - Padre" }}
          />
          <Stack.Screen
            name="ChildDashboard"
            component={ChildPage}
            options={{ title: "Panel de Control - Hijo" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LogProvider>
  )
}
