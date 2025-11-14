import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mockAuthenticate } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const initialValues = {
  email: "",
  password: "",
};

const schema = Yup.object<typeof initialValues>().shape({
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es requerido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export function useLogin() {
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(values: typeof initialValues) {
    if (loading) return;

    setLoading(true);
    setErr("");

    try {
      const { email, password } = values;
      const operator = await mockAuthenticate(email, password);

      if (operator) {
        await signIn(operator);
      } else {
        throw new Error("Credenciales no autorizadas");
      }
    } catch (error: any) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    initialValues,
    schema,
    control,
    handleSubmit,
    formState,
    onSubmit,
    loading,
    error: err,
    setError: setErr,
  };
}
