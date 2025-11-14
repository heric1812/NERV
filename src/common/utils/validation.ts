export const pilotRegex = /^PILOT-\d{3}$/;

export const validatePilotId = (id: string): boolean => {
  return pilotRegex.test(id);
};

export const formatPilotId = (value: string): string => {
  const cleaned = value.toUpperCase().replace(/[^0-9]/g, "");

  if (cleaned.length <= 3) {
    return `PILOT-${cleaned}`;
  }

  return `PILOT-${cleaned.slice(0, 3)}`;
};
