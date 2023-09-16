export const fetchAsync = async (url: string): Promise<unknown> => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (err: unknown) {
    throw new Error(`Fetch error: ${err}`);
  }
};
