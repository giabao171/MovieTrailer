const routes = {
    home: '/',
    profile: '/profile',
    movieDetail: '/:typemedia/detail/:idmovie',
    personDetail: '/person/detail/:idperson',
    search: 'search/:searchKey/:page',
    watch: 'watch/:typemedia/:idmovie/:season/:episode',
    discover: '/discover',
    signIn: '/signin',
    signUp: '/signup',
    bookmarks: '/bookmarks',
};

export default routes;
