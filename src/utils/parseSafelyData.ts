export const parseSafelyData = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}