import { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { Controller } from "react-hook-form";
import { useLogin } from "../common/hooks/useLogin";
import { theme } from "../theme";

type Props = {
  navigation: any;
};

const AuthScreen: FC<Props> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    loading,
    onSubmit,
    error,
  } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <View>
          <Image source={require("@/assets/favicon.png")} style={styles.logo} />
        </View>

        <Text style={styles.title}>Inicia sesión en NERV</Text>

        {!!error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.form}>
          <View>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Correo electrónico"
                  placeholder="john.doe@example.com"
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>
          </View>

          <View>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Contraseña"
                  placeholder="********"
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.password}
                  autoCorrect={false}
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye" : "eye-off"}
                      size={20}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
              )}
            />
            <HelperText
              type="error"
              visible={!!errors.password}
              style={{ marginBottom: 8 }}
            >
              {errors.password?.message}
            </HelperText>
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
          >
            Entrar
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  content: {
    flex: 1,
    maxWidth: 768,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: theme.colors.primary,
  },
  title: { fontSize: 22, marginBottom: 14, maxWidth: 200, textAlign: "center" },
  form: { padding: 14, width: "100%" },
  errorContainer: {
    backgroundColor: "#f8d7da",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: "#721c24",
    textAlign: "center",
  },
});

export default AuthScreen;
