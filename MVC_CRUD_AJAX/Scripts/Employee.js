
$(document).ready(function () {
    LoadEmployeeList();
});

function LoadEmployeeList() {
    $.ajax({
        url: "/Home/SelectEmployee",
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            var html = "";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.EmployeeID + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Age + '</td>';
                html += '<td>' + item.State + '</td>';
                html += '<td>' + item.Country + '</td>';
                html += '<td><a href="#" onclick="return GetEmployeeById(' + item.EmployeeID + ')">Edit</a></td>';
                html += '<td><a href="#" onclick="DeleteEmployee(' + item.EmployeeID + ')">Delete</a></td>';
                html += '</tr>';
            });

            $('#tbody').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
};

function InsertEmployee() {
    var val = Validation();
    if (val == false) {
        return false;
    }

    var inputObj = {
        EmployeeID: $('#employeeId').val(),
        Name: $('#name').val(),
        Age: $('#age').val(),
        State: $('#state').val(),
        Country: $('#country').val()
    }

    $.ajax({
        url: "/Home/InsertEmployee",
        data: JSON.stringify(inputObj),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            LoadEmployeeList();
            $('#myModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function GetEmployeeById(empId) {    
    $.ajax({
        url: "/Home/GetEmployeeById/" + empId,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            //alert(result);
            $('#employeeId').val(result.EmployeeID);
            $('#name').val(result.Name);
            $('#age').val(result.Age);
            $('#state').val(result.State);
            $('#country').val(result.Country);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

    return false;
}

function UpdateEmployee() {
    var val = Validation();
    if (val == false) {
        return false;
    }

    var inputObj = {
        EmployeeID: $('#employeeId').val(),
        Name: $('#name').val(),
        Age: $('#age').val(),
        State: $('#state').val(),
        Country: $('#country').val()
    }

    $.ajax({
        url: "/Home/UpdateEmployee",
        data: JSON.stringify(inputObj),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            LoadEmployeeList();
            $('#myModal').modal('hide');

            $('#employeeId').val(""),
            $('#name').val(""),
            $('#age').val(""),
            $('#state').val(""),
            $('#country').val("")
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function DeleteEmployee(empId) {
    var res = confirm("Are you sure to delete the employee record?");
    if (res) {
        $.ajax({
            url: "/Home/DeleteEmployee/" + empId,
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                LoadEmployeeList();
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });

        return false;
    }
}

function Validation() {
    var isValid = true;

    if ($('#name').val().trim() == "") {
        $('#name').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#name').css('border-color', 'lightgrey');
    }

    if ($('#age').val().trim() == "" || isNaN($('#age').val().trim())) {
        $('#age').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#age').css('border-color', 'lightgrey');
    }

    if ($('#state').val().trim() == "") {
        $('#state').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#state').css('border-color', 'lightgrey');
    }

    if ($('#country').val().trim() == "") {
        $('#country').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#country').css('border-color', 'lightgrey');
    }

    return isValid;
}

function ClearForm() {
    $('#employeeId').val("");
    $('#name').val("");
    $('#age').val("");
    $('#state').val("");
    $('#country').val("");
    
    $('#name').css('border-color', 'lightgrey');
    $('#age').css('border-color', 'lightgrey');
    $('#state').css('border-color', 'lightgrey');
    $('#country').css('border-color', 'lightgrey');

    $('#btnUpdate').hide();
    $('#btnAdd').show();
}