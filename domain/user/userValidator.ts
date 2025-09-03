export const validateEmptyStrings = (fields: Record<string, string>) => {
    for (const key in fields) {
      if (!fields[key] || fields[key].trim() === '') {
        return { success: false, message: `${key} boş olamaz` };
      }
    }
    return { success: true };
  };
  
  export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
      ? { success: true }
      : { success: false, message: 'Email formatı geçersiz' };
  };
  