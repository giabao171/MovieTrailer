import * as httpRequests from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getGenres = async (type) => {
    try {
        const res = await httpRequests.get(`/genre/${type}/list`, {
            params: {
                api_key: API_KEY,
            },
        });
        return res.genres;
    } catch (error) {
        console.log(error);
    }
};
