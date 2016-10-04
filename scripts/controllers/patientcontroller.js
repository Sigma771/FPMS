var mainApp = angular.module("mainApp", []);
var patientsArray = {"patients":[{"firstName":"Bruce", "lastName":"Wayne", "ssn":"111-11-1111", "phoneNumber":"317-123-4567", "gender":"Male", "address":"1234 Wayne Manor", "city":"Gotham", 
                                  "state":"NY", "zip":"11417", "insuranceProvider":"Blue Cross Blue Shield", "insuranceProviderNumber":"PN1234567", "physician":""},
                                 {"firstName":"John", "lastName":"Smith", "ssn":"222-22-2222", "phoneNumber":"317-234-5678", "gender":"Non-Binary", "address":"4321 Main St", "city":"Louisville", 
                                  "state":"KY", "zip":"40220", "insuranceProvider":"United Health Network", "insuranceProviderNumber":"PN4839483", "physician":""},
                                 {"firstName":"Shiera", "lastName":"Hall", "ssn":"333-33-3333", "phoneNumber":"317-345-6789", "gender":"Female", "address":"8947 Wesley Ave", "city":"Chicago", 
                                  "state":"IL", "zip":"60608", "insuranceProvider":"Blue Cross Blue Shield", "insuranceProviderNumber":"PN4839573", "physician":""}]};
var genderList = {"genders" : [{"name" : "Male"}, {"name" : "Female"}, {"name" : "Non-Binary"}]}
var patientInfo = {firstName: "", lastName: "", ssn: "", phoneNumber: "", gender: "", address: "", city: "",
                     state: "", zip: "", insuranceProvider: "", insuranceProviderNumber: "", physician: ""};

mainApp.controller('patientController', function($scope){
    prepareLocalStorageObject();

    $scope.patientsList = getAllPatients();

    $scope.addNewPatient = function(){
        window.location.href = "../patient/newpatient.html";
    };

    $scope.editPatient = function(){
        window.location.href = "../patient/editpatient.html";
    };

    $scope.getPatient = function(index){
        var patient = $scope.patientsList.patients[index];

        patientInfo.firstName = patient.firstName;
        patientInfo.lastName = patient.lastName;
        patientInfo.ssn = patient.ssn;
        patientInfo.phoneNumber = patient.phoneNumber;
        patientInfo.gender = patient.gender;
        patientInfo.address = patient.address;
        patientInfo.city = patient.city;
        patientInfo.state = patient.state;
        patientInfo.zip = patient.zip;
        patientInfo.insuranceProvider = patient.insuranceProvider;
        patientInfo.insuranceProviderNumber = patient.insuranceProviderNumber;
        patientInfo.physician = patient.physician;

        localStorage.patientInfo = JSON.stringify(patientInfo);
        localStorage.selectedPatientIndex = index;
    }
});

mainApp.controller('newPatientController', function($scope){
    if(localStorage.patients !== JSON.stringify(patientsArray)){
        prepareLocalStorageObject();
    }

    $scope.master = {firstName: "", lastName: "", ssn: "", phoneNumber: "", gender: "", address: "", city: "",
                     state: "", zip: "", insuranceProvider: "", insuranceProviderNumber: "", physician: ""};
    $scope.patient = angular.copy($scope.master);

    $scope.physicians = JSON.parse(localStorage.doctors);

    $scope.genders = genderList;

    $scope.savePatient = function() {
        var newPatient = {firstName: "", lastName: "", ssn: "", phoneNumber: "", gender: "", address: "", city: "",
                     state: "", zip: "", insuranceProvider: "", insuranceProviderNumber: "", physician: ""};

        newPatient.firstName = $scope.patient.firstName;
        newPatient.lastName = $scope.patient.lastName;
        newPatient.ssn = $scope.patient.ssn;
        newPatient.phoneNumber = $scope.patient.phoneNumber;
        newPatient.gender = $scope.patient.gender.name;
        newPatient.address = $scope.patient.address;
        newPatient.city = $scope.patient.city;
        newPatient.state = $scope.patient.state;
        newPatient.zip = $scope.patient.zip;
        newPatient.insuranceProvider = $scope.patient.insuranceProvider;
        newPatient.insuranceProviderNumber = $scope.patient.insuranceProviderNumber;
        newPatient.physician = $scope.patient.physician.firstName + ' ' + $scope.patient.physician.lastName;

        patientsArray.patients.push(newPatient);

        localStorage.patients = JSON.stringify(patientsArray);

        $scope.master = angular.copy($scope.patient);

        alert('Patient Saved!!!');
    };
});

mainApp.controller('editPatientController', function($scope){
    if(localStorage.patients !== JSON.stringify(patientsArray)){
        prepareLocalStorageObject();
    }

    $scope.master = JSON.parse(localStorage.patientInfo);
    $scope.patient = angular.copy($scope.master);

    $scope.physicians = JSON.parse(localStorage.doctors);

    for(var i = 0, len = $scope.physicians.doctors.length; i < len; i++) {
        if ($scope.physicians.doctors[i].firstName == $scope.patient.physician.split(' ')[0] && $scope.physicians.doctors[i].lastName == $scope.patient.physician.split(' ')[1]) {
            $scope.initialSelectedPhysicianIndex = i;
            break;
        }
    }

    $scope.genders = genderList;

    for(var i = 0, len = $scope.genders.genders.length; i < len; i++) {
        if ($scope.genders.genders[i].name == $scope.patient.gender) {
            $scope.initialSelectedGenderIndex = i;
            break;
        }
    }

    $scope.savePatient = function() {
        var editedPatient = {firstName: "", lastName: "", ssn: "", phoneNumber: "", gender: "", address: "", city: "",
                     state: "", zip: "", insuranceProvider: "", insuranceProviderNumber: "", physician: ""};

        editedPatient.firstName = $scope.patient.firstName;
        editedPatient.lastName = $scope.patient.lastName;
        editedPatient.ssn = $scope.patient.ssn;
        editedPatient.phoneNumber = $scope.patient.phoneNumber;
        editedPatient.gender = $scope.patient.gender.name;
        editedPatient.address = $scope.patient.address;
        editedPatient.city = $scope.patient.city;
        editedPatient.state = $scope.patient.state;
        editedPatient.zip = $scope.patient.zip;
        editedPatient.insuranceProvider = $scope.patient.insuranceProvider;
        editedPatient.insuranceProviderNumber = $scope.patient.insuranceProviderNumber;
        editedPatient.physician = $scope.patient.physician.firstName + ' ' + $scope.patient.physician.lastName;

        patientsArray.patients[localStorage.selectedPatientIndex] = editedPatient;

        localStorage.patients = JSON.stringify(patientsArray);

        $scope.master = angular.copy($scope.patient);

        alert('Patient Saved!!!');
    };
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