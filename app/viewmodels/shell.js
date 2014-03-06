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
                    route: 'my-profile',
                    title:'<span class="glyphicon glyphicon-user"></span> Ich <span class="caret"></span>',
                    moduleId: 'viewmodels/my-profile',
                    nav: true,
                    navDisplayStyle: 'right'
                },
                {
                    route: 'my-profile', // TODO change this
                    title:'<span class="glyphicon glyphicon-envelope"></span>',
                    moduleId: 'viewmodels/my-profile', // TODO change this
                    nav: true,
                    navDisplayStyle: 'right'
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
