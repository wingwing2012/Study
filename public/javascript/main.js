/**
 * Created by home on 2014/11/9.
 */
var app = angular.module('myApp', []);
app.controller('MyController', function ($scope) {
    $scope.person = {name: "Ari Lerner"};
    var updateClock = function () {
        $scope.clock = new Date();
    };
    var timer = setInterval(function () {
        $scope.$apply(updateClock);
    }, 1000);
    updateClock();
});

app.controller('PlayerController', ['$scope', function ($scope) {
    $scope.playing = false;
    $scope.audio = document.createElement('audio');
    $scope.audio.src = '../public/media/天上西藏_米线.mp3';
    $scope.play = function () {
        $scope.audio.play();
        $scope.playing = true;
    };
    $scope.stop = function () {
        $scope.audio.pause();
        $scope.playing = false;
    };
    $scope.audio.addEventListener('ended', function () {
        $scope.$apply(function () {
            $scope.stop()
        });
    });
}]);

app.controller('DemoController', function ($scope) {
    $scope.counter = 0;
    $scope.add = function (amount) {
        $scope.counter += amount;
    };
    $scope.subtract = function (amount) {
        $scope.counter -= amount;
    };
});
var apiKey = 'MDE3Mzg3NDY3MDE0MTU3MTI3NTYzN2I4OQ001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.directive('nprLink', function() {
    return {
        restrict: 'EA',
        require: ['^ngModel'],
        replace: true,
        scope: {
            ngModel: '=',
            play: '&'
        },
        templateUrl: '../views/nprListItem.html',
        link: function(scope, ele, attr) {
            scope.duration = scope.ngModel.audio[0].duration.$text;
        }
    }
});

app.controller('RemotePlayerController', function ($scope, $http) {
    // Hidden our previous section's content
    // construct our http request
    $http({
        method: 'JSONP',
        url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
    }).success(function (data, status) {
        // Now we have a list of the stories (data.list.story)
        // in the data object that the NPR API
        // returns in JSON that looks like:
        // data: { "list": {
        //   "title": ...
        //   "story": [
        //     { "id": ...
        //       "title": ...
        $scope.programs = data.list.story;
    }).error(function (data, status) {
        // Some error occurred
    });
    $scope.play = function (program) {
        if ($scope.playing) audio.pause();
        var url = program.audio[0].format.mp4.$text;
        audio.src = url;
        audio.play();
        // 储存播放器的状态为正在播放
        $scope.playing = true;
    }
});

app.controller('RepeatController', function ($scope) {
    $scope.roommates = [
        {name: 'Ari'},
        {name: 'Q'},
        {name: 'Sean'},
        {name: 'Anand'}
    ];
    $scope.people = {
        'Ari': 'orange',
        'Q': 'purple',
        'Sean': 'green'
    }
});

app.service('ContactService', function () {
    //to create unique contact id
    var uid = 1;
    
    //contacts array to hold list of all contacts
    var contacts = [{
        id: 0,
        'name': 'Viral',
            'email': 'hello@gmail.com',
            'phone': '123-2343-44'
    }];
    
    //save method create a new contact if not already exists
    //else update the existing object
    this.save = function (contact) {
        if (contact.id == null) {
            //if this is new contact, add it in contacts array
            contact.id = uid++;
            contacts.push(contact);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (i in contacts) {
                if (contacts[i].id == contact.id) {
                    contacts[i] = contact;
                }
            }
        }

    }

    //simply search contacts list for given id
    //and returns the contact object if found
    this.get = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                return contacts[i];
            }
        }

    }
    
    //iterate through contacts list and delete 
    //contact if found
    this.delete = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                contacts.splice(i, 1);
            }
        }
    }

    //simply returns the contacts list
    this.list = function () {
        return contacts;
    }
});

app.controller('ContactController', function ($scope, ContactService) {

    $scope.contacts = ContactService.list();

    $scope.saveContact = function () {
        ContactService.save($scope.newcontact);
        $scope.newcontact = {};
    }


    $scope.delete = function (id) {

        ContactService.delete(id);
        if ($scope.newcontact.id == id) $scope.newcontact = {};
    }


    $scope.edit = function (id) {
        $scope.newcontact = angular.copy(ContactService.get(id));
    }
});

app.directive('hello', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: '<span>Hi there <span ng-transclude></span></span>',
        replace: true
    };
});
app.controller('MyController',function($scope) {
    $scope.things = [1,2,3,4,5,6];
});

app.directive('expander', function() {
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        scope : {
            title : '=expanderTitle'
        },
        template : '<div>'
                 + '<div class="title" ng-click="toggle()">{{title}}</div>'
                 + '<div class="body" ng-show="showMe" ng-transclude></div>'
                 + '</div>',
        link : function($scope, element, attrs) {
        	$scope.showMe = false;
        	$scope.toggle = function toggle() {
        		$scope.showMe = !$scope.showMe;
            }
        }
    }
});
app.controller('SomeController',function($scope) {
    $scope.title = '点击展开';
    $scope.text = '这里是内部的内容。';
});
