import * as httpRequests from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getListDiscover = async (type, sortBy, genresIdList, page = '1') => {
    try {
        const res = await httpRequests.get(
            `/discover/${type}?language=en-US&include_adult=false&include_video=false&with_watch_monetization_types=flatrate`,
            {
                params: {
                    api_key: API_KEY,
                    sort_by: sortBy,
                    with_genres: genresIdList,
                    page,
                },
            },
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
