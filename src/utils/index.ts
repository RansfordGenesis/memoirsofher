const env = import.meta.env;

export { default as cn } from "./classnames";
export { default as wrapClick } from "./wrap-click";
export { default as wrapOnchange } from "./wrap-onchange";

export const variable = {
  project_url: env.VITE_PROJ_URL,
  api_key: env.VITE_API_KEY,
  access_code: env.VITE_ACCESS_CODE,
};

export function splitArrayRoundRobin<T>(
  longArray: T[],
  numberOfChunks: number
): T[][] {
  const result: T[][] = Array.from({ length: numberOfChunks }, () => []);

  for (let i = 0; i < longArray.length; i++) {
    result[i % numberOfChunks].push(longArray[i]);
  }

  return result;
}