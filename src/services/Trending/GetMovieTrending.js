import { API_KEY } from '~/Shared/Constants';
import * as httpRequest from '~/utils/httpRequest';

export const getMovie = async (type = 'all', time = 'week') => {
    try {
        const res = httpRequest.get(`/trending/${type}/${time}`, {
            params: {
                api_key: API_KEY,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
