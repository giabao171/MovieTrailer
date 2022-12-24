import config from '~/config';

//pages
import Home from '~/Pages/Home';
import Profile from '~/Pages/Profile';
import MovieDetail from '~/Pages/MovieDetail';
import PersonDetail from '~/Pages/PersonDetail';
import Search from '~/Pages/Search';
import MovieWatch from '~/Pages/MovieWatch';
import Discover from '~/Pages/Discover';
import SignIn from '~/Pages/Auth/SignIn';
import SignUp from '~/Pages/Auth/SignUp';
import Bookmarks from '~/Pages/Bookmarks';

//publict routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.movieDetail, component: MovieDetail },
    { path: config.routes.personDetail, component: PersonDetail },
    { path: config.routes.search, component: Search },
    { path: config.routes.watch, component: MovieWatch },
    { path: config.routes.discover, component: Discover },
    { path: config.routes.signIn, component: SignIn, layout: null },
    { path: config.routes.signUp, component: SignUp, layout: null },
    { path: config.routes.bookmarks, component: Bookmarks },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
