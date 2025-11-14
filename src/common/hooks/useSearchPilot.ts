import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { pilotRegex } from "../utils/validation";

const initialValues = {
  pilot: "",
};

const schema = Yup.object<typeof initialValues>().shape({
  pilot: Yup.string()
    .matches(pilotRegex, "Escribe un piloto válido")
    .required("El piloto es requerido"),
});

export function useSearchPilot() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { control, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(values: typeof initialValues) {
    if (loading) return;

    setLoading(true);
    setErr("");

    try {
      const { pilot } = values;

      navigation.navigate(...["SyncResult", { pilotId: pilot }] as never);
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
    setValue,
    onSubmit,
    loading,
    error: err,
    setError: setErr,
  };
}
