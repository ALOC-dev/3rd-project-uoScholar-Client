// API Configuration
export const API_CONFIG = {
  // General API base URL
  BASE_URL: "https://8080-alocdev-3rdprojectuosch-zeq396z26xs.ws-us121.gitpod.io/",
  
  // Chat API base URL (다른 서버)
  CHAT_BASE_URL: "https://8000-alocdev-3rdprojectuosch-7bvmz0hdqvl.ws-us121.gitpod.io/",
  
  // Default timeout
  DEFAULT_TIMEOUT: 10000,
} as const;

// Environment-based configuration
export const getApiConfig = () => {  
  return API_CONFIG;
};
