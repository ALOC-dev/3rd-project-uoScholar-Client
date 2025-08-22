import axios, { AxiosError, AxiosResponse } from "axios";

// Types
export type NoticeCategory =
  | "ACADEMIC"
  | "GENERAL"
  | "COLLEGE_ENGINEERING"
  | "COLLEGE_SOCIAL_SCIENCES";

export interface NoticeApiParams {
  exact?: boolean;
  category?: NoticeCategory | NoticeCategory[];
  page?: number;
  size?: number;
  keyword?: string; // 이름 변경
}

export interface NoticeItem {
  id: string;
  title: string;
  content: string;
  department: string;
  date: string;
  views: number;
  category: NoticeCategory;
}

export interface NoticeApiResponse {
  data: NoticeItem[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  message: string;
}

export interface SearchRequest {
  search: string;
}

export interface SearchResponse {
  results: any[];
}

// Constants
const BASE_URL =
  "https://8080-alocdev-3rdprojectuosch-zeq396z26xs.ws-us121.gitpod.io/";
const DEFAULT_TIMEOUT = 10000;

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Error handler utility
const handleApiError = (error: AxiosError): string => {
  if (error.response) {
    return `서버 오류: ${error.response.status}`;
  } else if (error.request) {
    return "서버로부터 응답이 없습니다.";
  } else {
    return `예외 에러 발생: ${error.message}`;
  }
};

// Chat API
export const chatApi = {
  /**
   * AI 챗봇에게 텍스트 메시지 전송
   */
  sendMessage: async (message: string): Promise<string> => {
    try {
      const response: AxiosResponse<ChatResponse> = await apiClient.post(
        "/chat/ai",
        {
          message,
        }
      );
      return response.data.message;
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      throw new Error(errorMessage);
    }
  },
};

// Notice API
export const noticeApi = {
  /**
   * 공지사항 검색 API
   */
  searchNotices: async (
    params: NoticeApiParams
  ): Promise<NoticeApiResponse> => {
    try {
      const searchParams = new URLSearchParams();

      if (params.exact !== undefined) {
        searchParams.append("exact", params.exact.toString());
      }

      if (params.category) {
        if (Array.isArray(params.category)) {
          params.category.forEach((cat) =>
            searchParams.append("category", cat)
          );
        } else {
          searchParams.append("category", params.category);
        }
      }

      if (params.page !== undefined) {
        searchParams.append("page", params.page.toString());
      }

      if (params.size !== undefined) {
        searchParams.append("size", params.size.toString());
      }

      if (params.keyword) {
        searchParams.append("keyword", params.keyword);
      }

      // 서버로 요청 보내기 전에 파라미터 로그 출력
      console.log(
        "[noticeApi.searchNotices] GET /notices/search?" +
          searchParams.toString()
      );

      const response: AxiosResponse<NoticeApiResponse> = await apiClient.get(
        `/notices/search?${searchParams.toString()}`
      );

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError);
      throw new Error(errorMessage);
    }
  },

  /**
   * 학사공지 조회
   */
  getAcademicNotices: async (
    page: number = 0,
    size: number = 15,
    keyword?: string
  ): Promise<NoticeApiResponse> => {
    return noticeApi.searchNotices({
      exact: true,
      category: "ACADEMIC",
      page,
      size,
      keyword,
    });
  },

  /**
   * 일반공지 조회
   */
  getGeneralNotices: async (
    page: number = 0,
    size: number = 15,
    keyword?: string
  ): Promise<NoticeApiResponse> => {
    return noticeApi.searchNotices({
      exact: true,
      category: "GENERAL",
      page,
      size,
      keyword,
    });
  },

  /**
   * 단과대 공지 조회 (공과대학, 사회과학대학)
   */
  getDepartmentNotices: async (
    page: number = 1,
    size: number = 20,
    keyword?: string
  ): Promise<NoticeApiResponse> => {
    return noticeApi.searchNotices({
      exact: true,
      category: ["COLLEGE_ENGINEERING", "COLLEGE_SOCIAL_SCIENCES"],
      page,
      size,
      keyword,
    });
  },
};
