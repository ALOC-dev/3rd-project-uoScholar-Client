import axios from 'axios';

export const sendTextToBackend = async (text: string) => {
    const API_URL = '';

    try {
        const response = await axios.post(API_URL, { text });
        return response.data.response;
    } catch (error) {
        console.error('API 요청 실패:', error);
        throw new Error('오류가 발생했습니다.');
    }
};
