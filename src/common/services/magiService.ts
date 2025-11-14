import { SyncResponse } from "@/src/types";

const generateSyncRate = (pilotId: string): number => {
  let sum = 0;

  for (let i = 0; i < pilotId.length; i++) {
    sum += pilotId.charCodeAt(i);
  }

  return sum % 100;
};

export const mockSyncQuery = async (
  pilotId: string,
  clearance: string,
  operatorId: string
): Promise<SyncResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (clearance === "operator" && pilotId !== operatorId) {
    throw new Error("Clearance insuficiente");
  }

  const syncRate = generateSyncRate(pilotId);

  return {
    pilotId,
    syncRate,
    timestamp: new Date().toISOString(),
  };
};
