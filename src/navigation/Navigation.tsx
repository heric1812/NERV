import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createNavigationContainerRef } from "@react-navigation/native";
import { AuthProvider, useAuth } from "../common/context/AuthContext";
import AuthScreen from "../screens/AuthScreen";
import TerminalScreen from "../screens/TerminalScreen";
import SyncResultScreen from "../screens/SyncResultScreen";
import { HeaderTitle } from "../common/components/Header/HeaderTitle";
import { HeaderRight } from "../common/components/Header/HeaderRight";

const Stack = createNativeStackNavigator();

const navigationRef = createNavigationContainerRef();

function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <Stack.Navigator>
      {!isSignedIn ? (
        <Stack.Group>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ title: "Iniciar sesión", headerShown: false }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="Terminal"
            component={TerminalScreen}
            options={{
              title: "",
              headerTitle: HeaderTitle,
              headerRight: HeaderRight,
            }}
          />
          <Stack.Screen
            name="SyncResult"
            component={SyncResultScreen}
            options={{
              title: "",
              headerTitle: HeaderTitle,
              headerRight: HeaderRight,
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

function NavigationGuard() {
  const { isSignedIn } = useAuth();
  const protectedRoutes = new Set(["Terminal", "SyncResult"]);

  useEffect(() => {
    const unsub = navigationRef.addListener("state", () => {
      if (!navigationRef.isReady()) return;
      const route = navigationRef.getCurrentRoute();
      if (!route) return;

      if (!isSignedIn && protectedRoutes.has(route.name)) {
        navigationRef.reset({ index: 0, routes: [{ name: "Auth" }] });
      }
    });

    return () => unsub();
  }, [isSignedIn]);

  return null;
}

export default function Navigation() {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <NavigationGuard />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
