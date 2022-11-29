import * as httpRequest from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const search = async (type, query, page = 1) => {
    try {
        const res = httpRequest.get(`/search/${type}`, {
            params: {
                api_key: API_KEY,
                query,
                page,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
