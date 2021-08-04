export const waitSeconds = async (s: number) => {
  return new Promise<void>((resolve, _reject) => {
    setTimeout(() => resolve(), s * 1000);
  });
};
