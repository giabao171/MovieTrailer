import * as httpRequests from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getCasting = async (idMovie) => {
    try {
        const res = await httpRequests.get(`/tv/${idMovie}/credits?language=en-US`, {
            params: {
                api_key: API_KEY,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
