(function () {
    'use strict';

    angular
        .module('mayApp', [
            'ngStorage',
            'ngCookies',
            'ui.bootstrap',
            'ui.router',
            'tmh.dynamicLocale',
            'pascalprecht.translate'
        ])
        .run(run);

    run.$inject = ['stateHandler', 'translationHandler'];

    function run(stateHandler, translationHandler) {
        stateHandler.initialize();
        translationHandler.initialize();
    }

})();
