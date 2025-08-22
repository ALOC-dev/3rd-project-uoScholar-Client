import { AxiosError, AxiosResponse } from "axios";
import { apiClient, handleApiError } from "./chatApi";

export const keywordApi = {
    getKeywords: async (): Promise<string[]> => {
        try {
            const response: AxiosResponse<string[]> = await apiClient.get("/search/popular");
            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error as AxiosError);
            throw new Error(errorMessage);
        }
    },
}