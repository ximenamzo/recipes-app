// Función para sanitizar las entradas de texto
export const sanitizeInput = (input) => {
  // Elimina espacios en blanco al inicio y al final y escapa caracteres especiales
  return input.trim().replace(/[^a-zA-Z0-9]/g, "");
};

export const validateUser = (username) => {
  // Sanitiza la entrada
  const sanitizedUsername = sanitizeInput(username);

  // Comprueba si el nombre de usuario cumple con los criterios
  // Por ejemplo, no debe estar vacío después de sanitizar y puede tener reglas adicionales
  if (sanitizedUsername.length === 0) {
    return false;
  }
  return true;
};

export const validatePassword = (password) => {
  // Sanitiza la entrada
  const sanitizedPassword = sanitizeInput(password);

  // Verifica que la longitud de la contraseña sea adecuada
  if (sanitizedPassword.length < 4) {
    // Ejemplo: longitud mínima de 4 caracteres
    return false;
  }
  return true;
};
