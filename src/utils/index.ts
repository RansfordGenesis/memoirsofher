const env = import.meta.env;

export { default as cn } from "./classnames";
export { default as wrapClick } from "./wrap-click";
export { default as wrapOnchange } from "./wrap-onchange";

export const variable = {
  project_url: env.VITE_PROJ_URL,
  api_key: env.VITE_API_KEY,
};
