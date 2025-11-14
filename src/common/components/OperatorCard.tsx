import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

export const OperatorCard = ({ operator }: { operator: any }) => {
  const navigation = useNavigation();

  return (
    <TouchableRipple
      onPress={() => {
        navigation.navigate(
          ...(["SyncResult", { pilotId: operator.id }] as never)
        );
      }}
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <View style={styles.card}>
        <Image source={require("@/assets/avatar.jpg")} style={styles.avatar} />
        <View>
          <Text style={{ fontWeight: "500" }}>{operator.name}</Text>
          <Text style={{ fontSize: 12 }}>
            {operator.id} - {operator.clearance}
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{operator.badge}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    elevation: 2,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#333",
    marginLeft: "auto",
  },
  badgeText: { fontSize: 10, lineHeight: 16, color: "#ffffff" },
});
