(function () {
    'use strict';

    angular
        .module('mayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('about', {
            parent: 'app',
            url: '/about',
            data: {
                pageTitle: "account.title"
            },
            views: {
                'content@': {
                    templateUrl: 'app/about/partial-about.html'
                },
                'columnOne@about': {template: 'Look I am a column!'},
                'columnTwo@about': {
                    templateUrl: 'app/about/table-data.html',
                    controller: 'AboutController'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('account');
                    return $translate.refresh();
                }]
            }

        });
    }
})();
