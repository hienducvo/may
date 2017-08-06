(function() {
    'use strict';

    angular
        .module('mayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('tracker', {
            parent: 'app',
            url: '/tracker',
            data: {
                pageTitle: 'tracker.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/admin/tracker/tracker.html',
                    controller: 'TrackerController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('tracker');
                    return $translate.refresh();
                }]
            },
            onEnter: ['TrackerService', function(TrackerService) {
                TrackerService.subscribe();
            }],
            onExit: ['TrackerService', function(TrackerService) {
                TrackerService.unsubscribe();
            }]
        });
    }
})();
