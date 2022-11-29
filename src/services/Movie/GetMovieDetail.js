import * as httpRequests from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getDetail = async (type, idMovie) => {
    try {
        const res = await httpRequests.get(`/${type}/${idMovie}?language=en-US`, {
            params: {
                api_key: API_KEY,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
