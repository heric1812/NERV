import { Operator, AuthResponse } from "@/src/types";

export const mockAuthenticate = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const personnel: Record<string, Operator> = {
    "misato@nerv.un": {
      token: "magi_clearance_alpha",
      clearance: "commander",
      pilotId: "PILOT-001",
    },
    "ritsuko@nerv.un": {
      token: "magi_clearance_beta",
      clearance: "operator",
      pilotId: "PILOT-003",
    },
  };

  const operator = personnel[email];
  if (!operator || (password !== "katsuragi2015" && password !== "akagi2015")) {
    throw new Error("Credenciales no autorizadas");
  }

  return operator;
};
