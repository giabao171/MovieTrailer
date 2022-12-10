import { API_KEY } from '~/Shared/Constants';
import * as httpRequest from '~/utils/httpRequest';

export const getListFilm = async (idPerson, type) => {
    try {
        const res = httpRequest.get(`/person/${idPerson}/${type}_credits?language=en-US`, {
            params: {
                api_key: API_KEY,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
