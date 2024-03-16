
export const formatWei = (wei: string) => {
  const value = +wei/10**18;
  return value.toFixed(2);
}