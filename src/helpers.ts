const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmailValid = (email: string) => emailRegex.test(email);
export const isPasswordValid = (password: string) => password.length >= 6;
