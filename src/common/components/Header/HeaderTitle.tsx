import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export const HeaderTitle = (props: any) => {
  const { operator } = useAuth();

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/avatar.jpg")} style={styles.avatar} />

      <View style={{ justifyContent: "center" }}>
        <Text {...props} style={styles.title}>
          {operator ? `Operador: ${operator.pilotId}` : ""}
        </Text>
        <Text style={styles.rol}>
          {operator ? operator.clearance : ""}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30,
    elevation: 2,
  },
  title: { fontWeight: "500", lineHeight: 16 },
  rol: { textTransform: "capitalize", fontSize: 12, lineHeight: 14 },
});