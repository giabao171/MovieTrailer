import * as httpRequest from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const search = async (query) => {
    try {
        const res = httpRequest.get(`/search/movie?page=1`, {
            params: {
                api_key: API_KEY,
                query,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
