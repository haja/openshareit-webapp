define(['plugins/router'], function (router) {
    return {
        router: router,
        activate: function () {
            router.map([
                {
                    route: ['', 'home'],
                    title:'All Items',
                    moduleId: 'viewmodels/home',
                    nav: true
                },
                {
                    route: 'register',
                    title:'Registrierung',
                    moduleId: 'viewmodels/register',
                    nav: true
                }
            ]).buildNavigationModel();
            //.mapUnknownRoutes('home', 'not-found');

            return router.activate();
        }
    };
});
