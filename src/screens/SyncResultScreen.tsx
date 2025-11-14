import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type Props = {
  navigation: any;
  route: any;
};

const SyncResultScreen: FC<Props> = ({ navigation, route }) => {
  const { pilotId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado de sincronización</Text>
      <Text style={styles.title}>{pilotId}</Text>

      {/* <Button mode="contained" onPress={() => navigation.navigate("Terminal")}>
        Volver al inicio
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { fontSize: 18, marginBottom: 12 },
});

export default SyncResultScreen;
