define(['plugins/router', 'knockout', 'models/settings', 'ko-bindings/bootstrap-nav-menu-close-on-click'], function (router, ko, settings) {
    return {
        router: router
        , navbar: ko.computed(function() {
            return ko.utils.arrayFilter(router.navigationModel(), function(route) {
                return (!route.type || route.type === settings.getAuthenticationState());
            });
        })
        , activate: function () {
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
                    , type: 'authenticated'
                },
                {
                    route: 'about'
                    , title: 'Über uns'
                    , htmlTitle: 'Über uns'
                    , moduleId: 'viewmodels/about'
                    , nav: true
                    , navDisplayStyle: 'left'
                },
                {
                    route: 'my-items/new-item',
                    title:'Artikel anlegen',
                    htmlTitle:'Artikel anlegen',
                    moduleId: 'viewmodels/new-item',
                    nav: false
                    , type: 'authenticated'
                },
                {
                    route: 'my-items/edit/:id', // TODO update this?
                    title:'Artikel bearbeiten',
                    htmlTitle:'Artikel bearbeiten',
                    moduleId: 'viewmodels/new-item',
                    nav: false
                    , type: 'authenticated'
                },
                {
                    route: 'my-item/:itemId/request/:requestId',
                    title:'Anfragen an meine Artikel',
                    htmlTitle:'Anfragen an meine Artikel',
                    moduleId: 'viewmodels/my-item-request',
                    nav: false
                    , type: 'authenticated'
                },
                {
                    route: 'my-profile',
                    htmlTitle:'<span class="glyphicon glyphicon-user"></span> Ich',
                    title: 'Mein Profil',
                    moduleId: 'viewmodels/my-profile',
                    nav: true,
                    navDisplayStyle: 'right'
                    , type: 'authenticated'
                },
                {
                    route: 'my-profile/edit',
                    title: 'Mein Profil bearbeiten',
                    moduleId: 'viewmodels/edit-profile',
                    nav: false
                    , type: 'authenticated'
                },
                {
                    route: 'my-profile', // TODO change this
                    htmlTitle:'<span class="glyphicon glyphicon-envelope"></span>',
                    title: 'Posteingang',
                    moduleId: 'viewmodels/my-profile', // TODO change this
                    nav: true,
                    navDisplayStyle: 'right'
                    , type: 'authenticated'
                },
                {
                    route: 'register',
                    title:'Registrierung',
                    htmlTitle:'Registrierung',
                    moduleId: 'viewmodels/register',
                    nav: true,
                    navDisplayStyle: 'right'
                    , type: 'notAuthenticated'
                },
                {
                    route: 'login*redirect',
                    hash: '#login',
                    title:'Login',
                    htmlTitle:'Login',
                    moduleId: 'viewmodels/login',
                    nav: true,
                    navDisplayStyle: 'right'
                    , type: 'notAuthenticated'
                },
                {
                    route: 'logout',
                    title:'Logout',
                    htmlTitle:'Logout',
                    moduleId: 'viewmodels/logout',
                    nav: true,
                    navDisplayStyle: 'right'
                    , type: 'authenticated'
                }
            ]).buildNavigationModel();
            //.mapUnknownRoutes('home', 'not-found');

            router.guardRoute = function(instance, instruction) {
                // handle routes that should only be accessible when the user is logged in
                if(instruction.config.type && instruction.config.type === 'authenticated' && settings.getAuthenticationState() !== 'authenticated') {
                    window.console && console.log("redirecting:", 'login/' + instruction.fragment);
                    return 'login/' + instruction.fragment;
                } else {
                    return true;
                }
            };

            return router.activate();
        }
    };
});
