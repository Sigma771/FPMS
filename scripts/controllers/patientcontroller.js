var mainApp = angular.module("mainApp", []);
var patientsArray = {"patients":[{"firstName":"Bruce", "lastName":"Wayne", "ssn":"111-11-1111", "phoneNumber":"317-123-4567", "gender":"M", "address":"1234 Wayne Manor", "city":"Gotham", 
                                  "state":"NY", "zip":"11417", "InsuranceProvider":"Blue Cross Blue Shield", "insuranceProviderNumber":"PN1234567", "physician":"Stephen Strange"},
                                 {"firstName":"John", "lastName":"Smith", "ssn":"222-22-2222", "phoneNumber":"317-234-5678", "gender":"NB", "address":"4321 Main St", "city":"Louisville", 
                                  "state":"KY", "zip":"40220", "InsuranceProvider":"United Health Network", "insuranceProviderNumber":"PN4839483", "physician":"Stephen Strange"},
                                 {"firstName":"Joe", "lastName":"Somebody", "ssn":"333-33-3333", "phoneNumber":"317-345-6789", "gender":"M", "address":"8947 Wesley Ave", "city":"Chicago", 
                                  "state":"IL", "zip":"60608", "InsuranceProvider":"Blue Cross Blue Shield", "insuranceProviderNumber":"PN4839573", "physician":"Stephen Strange"}]};
var patientInfo = {firstName: "", lastName: "", ssn: "", phoneNumber: "", gender: "", address: "", city: "",
                     state: "", zip: "", InsuranceProvider: "", insuranceProviderNumber: "", physician: ""};

mainApp.controller('patientController', function($scope){
    prepareLocalStorageObject();

    $scope.patientsList = getAllPatients();
});

mainApp.controller('newPatientController', function($scope){
    $scope.master = {firstName: "", lastName: "", ssn: "", phoneNumber: "", gender: "", address: "", city: "",
                     state: "", zip: "", InsuranceProvider: "", insuranceProviderNumber: "", physician: ""};
    $scope.patient = angular.copy($scope.master);

    $scope.form.firstName = function(){
        
    };
    $scope.form.doctorsList = function(){
        return JSON.parse(localStorage.doctors);
    };

    $scope.savePatient = function() {
        
    };
});

mainApp.controller('editPatientController', function($scope){
    $scope.master = {firstName: patientInfo.firstName, lastName: patientInfo.lastName, ssn: patientInfo.ssn, phoneNumber: patientInfo.phoneNumber, gender: patientInfo.gender, address: patientInfo.address, city: patientInfo.city,
                     state: patientInfo.state, zip: patientInfo.zip, InsuranceProvider: patientInfo.InsuranceProvider, insuranceProviderNumber: patientInfo.insuranceProviderNumber, physician: patientInfo.physician};
    $scope.patient = angular.copy($scope.master);
});

function prepareLocalStorageObject(){
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if(localStorage.patients == undefined){
            localStorage.patients = JSON.stringify(patientsArray);
        }
        else{
            patientsArray = JSON.parse(localStorage.patients);
        }
    } else {
        // Sorry! No Web Storage support..
        alert('Your browser does not support local storage. The minimum version requirement for browsers that support this techonology are as follows: ' +
              'Chrome v4.0 -- Internet Explorer v8.0 -- Firefox v 3.5 -- Safari v4.0 -- Opera v11.5');
    }
}

function getAllPatients(){
    return patientsArray;
}

function getPatient(patient){
    patientInfo.firstName = patient.firstName;
    patientInfo.lastName = patient.lastName;
    patientInfo.ssn = patient.ssn;
    patientInfo.phoneNumber = patient.phoneNumber;
    patientInfo.gender = patient.gender;
    patientInfo.address = patient.address;
    patientInfo.city = patient.city;
    patientInfo.state = patient.state;
    patientInfo.zip = patient.zip;
    patientInfo.InsuranceProvider = patient.InsuranceProvider;
    patientInfo.insuranceProviderNumber = patient.insuranceProviderNumber;
    patientInfo.physician = patient.physician;
}