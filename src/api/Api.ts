// Re-export chat API and types
export {
  chatApi,
  sendTextToBackend,
  ChatRequest,
  ChatResponse,
  SearchRequest,
  SearchResponse,
  BASE_URL,
  DEFAULT_TIMEOUT,
  apiClient,
  handleApiError,
} from "./chatApi";

// Re-export notice API and types
export {
  noticeApi,
  NoticeCategory,
  NoticeApiParams,
  NoticeItem,
  NoticeApiResponse,
} from "./noticeApi";
