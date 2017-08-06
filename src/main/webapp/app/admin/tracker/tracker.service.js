/**
 * Created by hienvo on 6/12/2017.
 */
(function () {
    'use strict';
    angular
        .module('mayApp')
        .factory('TrackerService', TrackerService);

    TrackerService.$inject = ['$rootScope', '$window', '$cookies', '$http', '$q'];

    function TrackerService($rootScope, $window, $cookies, $http, $q) {
        var stompClient = null;
        var subscriber = null;
        var listener = $q.defer();
        var connected = $q.defer();
        var alreadyConnectedOnce = false;

        var service = {
            connect: connect,
            disconnect: disconnect,
            receive: receive,
            sendActivity: sendActivity,
            subscribe: subscribe,
            unsubscribe: unsubscribe
        };

        return service;

        function connect() {
            var loc = $window.location;
            var url = '//' + loc.host + loc.pathname + 'websocket/tracker';
            var socket = new SocketJS(url);
            stompClient = Stomp.over(socket);
            var stateChangeStart;
            var headers = {};
            headers[$http.defaults.xsrfHeaderName] = $cookies.get($http.defaults.xsrfCookieName);
            stompClient.connect(headers, function () {
                connected.resolve('success');
                sendActivity();
                if (!alreadyConnectedOnce) {
                    stateChangeStart = $rootScope.$on('$stateChangeStart', function () {
                        sendActivity();
                    });
                    alreadyConnectedOnce = true;
                }
            });
            $rootScope.$on('$destroy', function () {
                if (angular.isDefined(stateChangeStart) && stateChangeStart !== null) {
                    stateChangeStart();
                }
            });
        }

        function disconnect() {
            if (stompClient !== null) {
                stompClient.disconnect();
                stompClient = null;
            }
        }

        function receive() {
            return listener.promise;
        }

        function sendActivity() {
            if (stompClient !== null && stompClient.connected) {
                stompClient
                    .send('/topic/activity',
                        {},
                        angular.toJson({'page': $rootScope.toState.name}));
            }
        }

        function subscribe() {
            connected.promise.then(function () {
                subscriber = stompClient.subscribe('/topic/tracker', function (data) {
                    listener.notify(angular.fromJson(data.body));
                });
            }, null, null);
        }

        function unsubscribe() {
            if (subscriber !== null) {
                subscriber.unsubscribe();
            }
            listener = $q.defer();
        }

    }

})();
