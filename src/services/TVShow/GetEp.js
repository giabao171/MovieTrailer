import * as httpRequests from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getEpisode = async (idTVShow, ssNumber) => {
    try {
        const res = await httpRequests.get(`/tv/${idTVShow}/season/${ssNumber}?language=en-US`, {
            params: {
                api_key: API_KEY,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
