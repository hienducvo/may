(function() {
    'use strict';

    angular
        .module('mayApp')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['$scope'];

    function AboutController ($scope) {
    	
    	$scope.message = 'test';
    	   
        $scope.scotches = [
            {
                name: 'Macallan 12',
                price: 50
            },
            {
                name: 'Chivas Regal Royal Salute',
                price: 10000
            },
            {
                name: 'Glenfiddich 1937',
                price: 20000
            }
        ];
        
    }

})();
