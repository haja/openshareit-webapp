define(['plugins/router', 'ko-bindings/bootstrap-nav-menu-close-on-click'], function (router) {
    return {
        router: router,
        activate: function () {
            router.map([
                {
                    route: ['', 'home'],
                    title:'Home',
                    htmlTitle:'Home',
                    moduleId: 'viewmodels/home',
                    nav: true,
                    navDisplayStyle: 'left'
                },
                {
                    route: 'my-items',
                    title:'Meine Artikel',
                    htmlTitle:'Meine Artikel',
                    moduleId: 'viewmodels/my-items',
                    nav: true,
                    navDisplayStyle: 'left'
                },
                {
                    route: 'my-items/new-item',
                    title:'Artikel anlegen',
                    htmlTitle:'Artikel anlegen',
                    moduleId: 'viewmodels/new-item',
                    nav: false,
                },
                {
                    route: 'my-items/edit/:id', // TODO update this?
                    title:'Artikel bearbeiten',
                    htmlTitle:'Artikel bearbeiten',
                    moduleId: 'viewmodels/new-item',
                    nav: false,
                },
                {
                    route: 'my-item/:itemId/request/:requestId',
                    title:'Anfragen an meine Artikel',
                    htmlTitle:'Anfragen an meine Artikel',
                    moduleId: 'viewmodels/my-item-request',
                    nav: false,
                },
                {
                    route: 'my-profile',
                    htmlTitle:'<span class="glyphicon glyphicon-user"></span> Ich',
                    title: 'Mein Profil',
                    moduleId: 'viewmodels/my-profile',
                    nav: true,
                    navDisplayStyle: 'right'
                },
                {
                    route: 'my-profile', // TODO change this
                    htmlTitle:'<span class="glyphicon glyphicon-envelope"></span>',
                    title: 'Posteingang',
                    moduleId: 'viewmodels/my-profile', // TODO change this
                    nav: true,
                    navDisplayStyle: 'right'
                },
                {
                    route: 'register',
                    title:'Registrierung',
                    htmlTitle:'Registrierung',
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
