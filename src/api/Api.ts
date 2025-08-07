import axios from 'axios';

const baseURL = 'https://8080-alocdev-3rdprojectuosch-n6lv1j3148j.ws-us120.gitpod.io';

export const sendTextToBackend = async (text: string) => {
    const API_URL = baseURL + '/chat/ai';

    const payload = {
        message: text
    };

    try {
        const response = await axios.post(API_URL, payload, { timeout: 10000 });
        return response.data.message;
    } catch (error: any) {
        let errorMessage = '';

        if (error.response) {
            errorMessage = `서버 오류: ${error.response.status}`;
        } else if (error.request) {
            errorMessage = '서버로부터 응답이 없습니다.';
        } else {
            errorMessage = '예외 에러 발생: ' + error.message;
        }
        throw new Error(errorMessage);
    }
};

export const sendSearchToBackend = async (text: string) => {
    const API_URL = baseURL + '/search';

    const payload = {
        search: text
    };

    try {
        const response = await axios.post(API_URL, payload, { timeout: 10000 });
        return response.data.results;
    } catch (error: any) {
        let errorMessage = '';

        if (error.response) {
            errorMessage = `서버 오류: ${error.response.status}`;
        } else if (error.request) {
            errorMessage = '서버로부터 응답이 없습니다.';
        } else {
            errorMessage = '예외 에러 발생: ' + error.message;
        }
        throw new Error(errorMessage);
    }
};