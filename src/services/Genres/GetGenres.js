import * as httpRequests from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getGenres = async () => {
    try {
        const res = await httpRequests.get(`/genre/movie/list`, {
            params: {
                api_key: API_KEY,
            },
        });
        return res.genres;
    } catch (error) {
        console.log(error);
    }
};
