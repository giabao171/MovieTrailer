import * as httpRequest from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getMedia = async (type, idMovie) => {
    try {
        const res = httpRequest.get(`/${type}/${idMovie}/videos?language=en-US`, {
            params: {
                api_key: API_KEY,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
