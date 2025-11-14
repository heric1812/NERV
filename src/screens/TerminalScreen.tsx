import { FC, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { HelperText, IconButton, TextInput } from "react-native-paper";
import { Controller } from "react-hook-form";
import { useSearchPilot } from "../common/hooks/useSearchPilot";
import { OperatorCard } from "../common/components/OperatorCard";
import { fetchOperators } from "../common/services/apiService";

type Props = {
  navigation: any;
};

const TerminalScreen: FC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    loading,
    onSubmit,
    error,
  } = useSearchPilot();

  const [operators, setOperators] = useState<any[]>([]);

  useEffect(() => {
    setValue("pilot", "");
    setOperators(fetchOperators());
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1, maxWidth: 768, width: "100%" }}>
        <View>
          <View
            style={{ flexDirection: "row", gap: 4, alignItems: "flex-end" }}
          >
            <Controller
              control={control}
              name="pilot"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="ID de Piloto"
                  placeholder="PILOT-***"
                  mode="outlined"
                  value={value}
                  onChangeText={(v) => onChange(v.toUpperCase())}
                  error={!!errors.pilot}
                  autoCapitalize="none"
                  autoCorrect={false}
                  dense={true}
                  style={{ flex: 1 }}
                />
              )}
            />

            <IconButton
              icon="magnify"
              mode="contained"
              size={28}
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              style={{ borderRadius: 6, marginBottom: 0, marginRight: 0 }}
            />
          </View>

          <HelperText type="error" visible={!!errors.pilot}>
            {errors.pilot?.message}
          </HelperText>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={operators}
            renderItem={({ item }) => <OperatorCard operator={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 6 }}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  title: { fontSize: 18, marginBottom: 12 },
});

export default TerminalScreen;
