(function () {
    'use strict';

    angular
        .module('mayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: '/home',
            data: {
                pageTitle: "home.title"
            },
            views: {
                'content@': {
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('home');
                    return $translate.refresh();
                }]
            }

        }).state('home.list', {
            url: '/list',
            templateUrl: 'app/home/partial-home-list.html',
            controller: function($scope) {
                alert(typeof null === 'object');
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        }).state('home.paragraph', {
            url: '/paragraph',
            template: 'When the Computer Club competition is announced, Cody and his friends must put their coding skills into action. Cody begins a quest to research current computer games before creating the prototype of his very own.'
        });
    }
})();
