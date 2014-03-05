define(['plugins/router', 'ko-bindings/bootstrap-nav-menu-close-on-click'], function (router) {
    return {
        router: router,
        activate: function () {
            router.map([
                {
                    route: ['', 'home'],
                    title:'Home',
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
                    route: 'my-items/new-item',
                    title:'Artikel anlegen',
                    moduleId: 'viewmodels/new-item',
                    nav: false,
                },
                {
                    route: 'my-items/edit/:id',
                    title:'Artikel bearbeiten',
                    moduleId: 'viewmodels/new-item',
                    nav: false,
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
