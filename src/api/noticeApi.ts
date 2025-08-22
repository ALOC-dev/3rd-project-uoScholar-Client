import { AxiosError, AxiosResponse } from "axios";
import { apiClient, handleApiError } from "./chatApi";
import { NoticeCategory } from '../types/college';
import { useCollege } from '../hooks/use-college';

export interface NoticeApiParams {
  exact?: boolean;
  category?: NoticeCategory | NoticeCategory[];
  page?: number;
  size?: number;
  keyword?: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  hot: string;
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
    selectedColleges: NoticeCategory[],
    page: number = 0,
    size: number = 15,
    keyword?: string
  ): Promise<NoticeApiResponse> => {
    return noticeApi.searchNotices({
      exact: true,
      category: [...selectedColleges],
      page,
      size,
      keyword,
    });
  },
};
