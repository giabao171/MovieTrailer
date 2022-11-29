import * as httpRequests from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getSimilar = async (type, idMovie) => {
    try {
        const res = await httpRequests.get(`/${type}/${idMovie}/similar?language=en-US&page=1`, {
            params: {
                api_key: API_KEY,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
