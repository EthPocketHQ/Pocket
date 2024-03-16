export interface Token {
  balance: string;
  token : TokenDetail;
  id: string;
  tokenAddress: string;
}
type TokenDetail = {
  decimals: number;
  logoUri: string;
  name : string;
  symbol : string;
}