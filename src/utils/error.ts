export interface ApiError {
  name: string;
  message: string;
  statusCode: string;
}

export const getError = (error: ApiError) => {
  const { name, message } = error;
  if ('statusCode' in error) {
    return ` [${name} | ${error.statusCode}: ${message}]`;
  }

  return ` [${name}: ${message}]`;
};
