import * as httpRequest from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getMovie = async (id_genres, page) => {
    try {
        const res = httpRequest.get('/discover/movie?sort_by=popularity.desc', {
            params: {
                api_key: API_KEY,
                with_genres: id_genres,
                page,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
