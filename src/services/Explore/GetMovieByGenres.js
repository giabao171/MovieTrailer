import * as httpRequests from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getListByGenres = async (page = '1', genresId) => {
    try {
        const res = await httpRequests.get(
            `/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate`,
            {
                params: {
                    api_key: API_KEY,
                    page,
                    with_genres: genresId,
                },
            },
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
