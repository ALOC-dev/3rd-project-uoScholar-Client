import axios, { AxiosError, AxiosResponse } from "axios";

// Chat Types
export interface ChatRequest {
  history: {
    role: "assistant" | "user";
    content: string;
  }[];
  user_message: string;
}

export interface ChatResponse {
  message: string;
  found?: boolean;
}

export interface SearchRequest {
  search: string;
}

export interface SearchResponse {
  results: any[];
}

// Constants
export const BASE_URL =
  "https://8080-alocdev-3rdprojectuosch-zeq396z26xs.ws-us121.gitpod.io/";
export const DEFAULT_TIMEOUT = 10000;

// Create axios instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Error handler utility
export const handleApiError = (error: AxiosError): string => {
  if (error.response) {
    return `서버 오류: ${error.response.status}`;
  } else if (error.request) {
    return "서버로부터 응답이 없습니다.";
  } else {
    return `예외 에러 발생: ${error.message}`;
  }
};

// ChatInput에서 사용하는 함수
export const sendTextToBackend = async (message: string): Promise<any[]> => {
  try {
    const response: AxiosResponse<any> = await apiClient.post("/chat/search", {
      message,
    });
    return response.data || [];
  } catch (error) {
    const errorMessage = handleApiError(error as AxiosError);
    throw new Error(errorMessage);
  }
};

// Chat API
export const chatApi = {
  /**
   * AI 챗봇에게 텍스트 메시지 전송
   */
  sendMessage: async (requestData: ChatRequest): Promise<ChatResponse> => {
    try {
      const response: AxiosResponse<ChatResponse> = await apiClient.post(
        "/chat/test",
        requestData
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      throw new Error(errorMessage);
    }
  },
};
