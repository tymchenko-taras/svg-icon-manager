export type JSONSvgViewBox = number[] | number | string;
export type JSONXml = string;

export interface JSONObject {
  [x: string]: [JSONSvgViewBox, ...JSONXml[]]
}
