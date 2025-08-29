import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "./chatApi";

export const keywordApi = {
    getKeywords: async (): Promise<string[]> => {
        try {
            const response: AxiosResponse<string[]> = await apiClient.get("/search/popular");
            return response.data;
        } catch (error) {
            const errorMessage = (error as AxiosError).message;
            throw new Error(errorMessage);
        }
    },
}