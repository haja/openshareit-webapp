define(['plugins/router', 'ko-bindings/bootstrap-nav-menu-close-on-click'], function (router) {
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
                    route: 'my-items',
                    title:'Meine Artikel',
                    moduleId: 'viewmodels/my-items',
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
