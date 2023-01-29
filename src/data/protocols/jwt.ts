export interface IJwt {
  sign(payload: any): Promise<string>;
}
