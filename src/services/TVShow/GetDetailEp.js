import * as httpRequests from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getDetailEpisode = async (idmovie, ssNumber, epNumber) => {
    try {
        const res = await httpRequests.get(`/tv/${idmovie}/season/${ssNumber}/episode/${epNumber}?language=en-US`, {
            params: {
                api_key: API_KEY,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
