import axios from 'axios';

export const sendTextToBackend = async (text: string) => {
    const API_URL = 'http://10.0.2.2:8080/chat/ai';

    const payload = {
        message: text
    }

    try {
        const response = await axios.post(API_URL, payload, { timeout: 5000 });
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

// export const getTextFromBackend = async () => {
//     const API_URL = 'http://api.example.com/get-response';

//     try {
//         const response = await axios.get(API_URL, { timeout: 5000 });
//         return response.data.response;
//     } catch (error) {
//         console.error('API 요청 실패:', error);
//         throw new Error('오류가 발생했습니다.');
//     }
// };