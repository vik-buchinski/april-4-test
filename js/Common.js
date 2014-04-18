$(document).ready(function () {
    console.log("ready!");
});

var homePage = {
    buildView: function () {
        var students = new Array(
            new Student("first", null, null),
            new Student("second", null, null),
            new Student("third", null, null));

        var data = {
            students: students
        };
        
        $.mobile.changePage(
    }
};

function initiateData() {
}

function saveStudents(students) {
    localStorage.setItem("students", students);
}