$(document).ready(function () {  //ready-mainfunction
    ShowEmployeeData();
    //AddEmployee();
});

function ShowEmployeeData() {
    //var url = $('#urlEmployeeData').val();
    $.ajax({
        url: '/Emp/EmpDetails',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var object = '';
            $.each(result, function (index, item){
                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.name + '</td>';
                object += '<td>' + item.gender + '</td>';
                object += '<td>' + item.department + '</td>';
                object += '<td>' + item.salary + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.id +')" >Edit</a> | <a href="#" class="btn btn-danger" onclick= "Delete('+item.id+');">Delete</a></td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data cant get")
        }

    });
};

$('#btnAddEmployee').click(function () {
    ClearTextBox();
    $('#EmployeeMadal').modal('show');
    $('#empId').hide();
    $('#AddEmployee').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#employeeHeading').text('Add Employee');
})

function AddEmployee() {
    var objdata = {
        Name: $('#Name').val(),
        Gender: $('#Gender').val(),
        Department: $('#Department').val(),
        Salary: $('#Salary').val()
    }
    $.ajax({    //we use ajax for calling method 
        url: '/Emp/AddEmployee',
        type: 'Post',
        data: objdata,
        dataType:'json', //return type of method 
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',  

        success:function () {   //success is inbuilt method
            alert('Data Saved');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert('Data is Not Saved');
        }

    });

  
};

function HideModalPopUp() {
    $('#EmployeeMadal').modal('hide');
};

function ClearTextBox() {
    $('#Name').val('');
    $('#Gender').val('');
    $('#Department').val('');
    $('#Salary').val('');
};

function Edit(id) {
    $.ajax({
        url: '/Emp/Edit?id=' + id,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (response) {
            $('#EmployeeMadal').modal('show');
            $('#EmployeeId').val(response.id);
            $('#Name').val(response.name);
            $('#Gender').val(response.gender);
            $('#Department').val(response.department);
            $('#Salary').val(response.salary);
            $('#AddEmployee').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
            $('#employeeHeading').text('Update Record');
        },
        error: function () {
            alert('ID Not Found');
        }

    });
};


function UpdateEmployee() {
    var objdata = {
        Id: $('#EmployeeId').val(),
        Name: $('#Name').val(),
        Gender: $('#Gender').val(),
        Department: $('#Department').val(),
        Salary: $('#Salary').val(),
    }
    $.ajax({
        url: '/Emp/Update',
        type: 'Post',
        data: objdata,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        success: function () {
            alert('Data Updated');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("Cannot Update record");
        }

    });
};

function Delete(id) {
    if (confirm('Are u sure u want to delete this record')) {
        $.ajax({
            url: '/Emp/Delete?id=' + id,
            dataType: 'json',
            type: 'Delete',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
            success: function () {
                alert('Record Deleted');
                ShowEmployeeData();

            },
            error: function () {
                alert('Data cant be deleted');
            }
        });
    }
};

function Search(searchstring) {
    $.ajax({
        url: '/Emp/Search?searchstring=' + searchstring,
        dataType: 'json',
        type: 'Search',
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        success: function () {
            alert('SuccessFully retreived');
            ShowEmployeeData();

        },
        error: function () {
            alert('Cannot Find');
        }
    });

};

     

