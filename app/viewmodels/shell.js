define(['plugins/router', 'ko-bindings/bootstrap-nav-menu-close-on-click'], function (router) {
    return {
        router: router,
        activate: function () {
            router.map([
                {
                    route: ['', 'home'],
                    title:'All Items',
                    moduleId: 'viewmodels/home',
                    nav: true,
                    navDisplayStyle: 'left'
                },
                {
                    route: 'my-items',
                    title:'Meine Artikel',
                    moduleId: 'viewmodels/my-items',
                    nav: true,
                    navDisplayStyle: 'left'
                },
                {
                    route: 'register',
                    title:'Registrierung',
                    moduleId: 'viewmodels/register',
                    nav: true,
                    navDisplayStyle: 'right'
                }
            ]).buildNavigationModel();
            //.mapUnknownRoutes('home', 'not-found');

            return router.activate();
        }
    };
});
