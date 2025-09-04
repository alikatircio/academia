export const validateEmptyStrings = (fields: {
  [key: string]: string;
}): { error: string } | null => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || value.trim() === "") {
      return { error: `${key} alanı boş olamaz!` };
    }
  }
  return null;
};

export const validateEmail = (email: string): { error: string } | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: `'${email}' geçerli bir email formatı değil.` };
  }
  return null;
};
