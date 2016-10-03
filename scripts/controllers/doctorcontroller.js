var mainApp = angular.module("mainApp", []);
var doctorsArray = {"doctors":[{"firstName":"Stephen", "lastName":"Strange", "phoneNumber":"317-987-6543", "address":"7586 West Main St", "city":"Gotham", "state":"NY", "zip":"11417", "type":"Family"},
                                {"firstName":"Hank", "lastName":"Pym", "phoneNumber":"219-487-8888", "address":"7586 Column Ave", "city":"Louisville", "state":"KY", "zip":"40220", "type":"Family"},
                                {"firstName":"Nathaniel", "lastName":"Essex", "phoneNumber":"219-487-8888", "address":"3245 Mystery St", "city":"Chicago", "state":"IL", "zip":"60608", "type":"Family"}]};
var doctorInfo = {firstName: "", lastName: "", phoneNumber: "", type: "", address: "", city: "",
                     state: "", zip: ""};

mainApp.controller('doctorController', function($scope){
    prepareLocalStorageObject();

    $scope.doctorsList = getAllDoctors();
});

mainApp.controller('newDoctorController', function($scope){
    $scope.master = {firstName: "", lastName: "", phoneNumber: "", type: "", address: "", city: "",
                     state: "", zip: ""};

    $scope.form.firstName = function(){
        
    };
});

mainApp.controller('editDoctorController', function($scope){
    $scope.master = {firstName: doctorInfo.firstName, lastName: doctorInfo.lastName, phoneNumber: doctorInfo.phoneNumber, type: doctorInfo.type, address: doctorInfo.address, city: doctorInfo.city,
                     state: doctorInfo.state, zip: doctorInfo.zip};
    $scope.doctor = angular.copy($scope.master);
});

function prepareLocalStorageObject(){
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if(localStorage.doctors == undefined){
            localStorage.doctors = JSON.stringify(doctorsArray);
        }
        else{
            doctorsArray = JSON.parse(localStorage.doctors);
        }
    } else {
        // Sorry! No Web Storage support..
        alert('Your browser does not support local storage. The minimum version requirement for browsers that support this techonology are as follows: ' +
              'Chrome v4.0 -- Internet Explorer v8.0 -- Firefox v 3.5 -- Safari v4.0 -- Opera v11.5');
    }
}
    
function getAllDoctors(){
    return doctorsArray;
}

function getDoctor(doctor){
    doctorInfo.firstName = doctor.firstName;
    doctorInfo.lastName = doctor.lastName;
    doctorInfo.type = doctor.type;
    doctorInfo.phoneNumber = doctor.phoneNumber;
    doctorInfo.address = doctor.address;
    doctorInfo.city = doctor.city;
    doctorInfo.state = doctor.state;
    doctorInfo.zip = doctor.zip;
}

function saveDoctor(){

}