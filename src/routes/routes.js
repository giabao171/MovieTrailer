import config from '~/config';

//pages
import Home from '~/Pages/Home';
import Profile from '~/Pages/Profile';

//publict routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
