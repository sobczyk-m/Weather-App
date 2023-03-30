export const getEndPoint = async <Type>(endPoint: string): Promise<Type> => {
  const response = await fetch(endPoint);

  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};
