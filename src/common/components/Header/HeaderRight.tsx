import { Button, Icon, MD3Colors } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";

export const HeaderRight = () => {
  const { signOut } = useAuth();

  return (
    <Button onPress={() => signOut()}>
      <Icon source="logout" color={MD3Colors.error50} size={18} />
    </Button>
  );
};

