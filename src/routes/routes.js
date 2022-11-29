import config from '~/config';

//pages
import Home from '~/Pages/Home';
import Profile from '~/Pages/Profile';
import MovieDetail from '~/Pages/MovieDetail';
import Search from '~/Pages/Search';
import MovieWatch from '~/Pages/MovieWatch';

//publict routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.movieDetail, component: MovieDetail },
    { path: config.routes.search, component: Search },
    { path: config.routes.watch, component: MovieWatch },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
