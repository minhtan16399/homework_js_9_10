document.querySelector('#tknv').onchange = function () {
    let inputVal = document.getElementById('tknv').value;
    let inputValLength = lengthValid(inputVal, 6, 4);
    let inputValEmpty = emptyInpput(inputVal);
    let text = document.getElementById('tbTKNV');
    if (isNaN(inputVal) || inputValLength === false || inputValEmpty === false) {
        text.style.display = 'block'
        text.innerHTML = 'Tài khoản tối đa 4 - 6 ký số, không để trống';
        return false;
    } else {
        text.innerHTML = '';
        return true;
    }
};

document.querySelector('#name').onchange = function () {
    let inputVal = document.getElementById('name').value;
    let letters = /^[a-zA-Z a-ỹ]+$/;
    let text = document.getElementById('tbTen');
    if (letters.test(inputVal)) {
        text.innerHTML = '';
        return true;
    } else {
        text.style.display = 'block'
        text.innerHTML = 'Tên nhân viên phải là chữ, không để trống';
        return false;
    }
};

document.querySelector('#email').onchange = function () {
    let inputVal = document.getElementById('email').value;
    let text = document.getElementById('tbEmail');
    let mailFormat = /^\w+([\.-]\w+)*@\w+([\.-]\w+)*(\.\w{2,3})+$/;
    if (inputVal.match(mailFormat)) {
        text.innerHTML = '';
        return true;
    } else {
        text.style.display = 'block'
        text.innerHTML = 'Email phải đúng định dạng vd: example123@gmail.com, không để trống';
        return false;
    }
};

document.querySelector('#password').onchange = function () {
    let inputVal = document.getElementById('password').value;
    let text = document.getElementById('tbMatKhau');
    let passWordFormat = passwordValid(inputVal)
    if (passWordFormat === true) {
        text.innerHTML = '';
    } else {
        text.style.display = 'block'
        text.innerHTML = 'Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống';
    }
};


var arrEmployee = [];

document.getElementById('btnThemNV').onclick = function (e) {
    e.preventDefault();

    let employee = new Employee();
    employee.userName = document.getElementById('tknv').value;
    employee.fullName = document.getElementById('name').value;
    employee.email = document.getElementById('email').value;
    employee.passWord = document.getElementById('password').value;
    employee.workDate = document.getElementById('datepicker').value;
    employee.basicSalary = +document.getElementById('luongCB').value;
    employee.position = document.getElementById('chucvu').value;
    employee.workTime = +document.getElementById('gioLam').value;

    arrEmployee.push(employee);
    renderTableEmployee(arrEmployee);
};

function renderTableEmployee(arrEmployee) {
    let htmlString = '';
    for (let index = 0; index < arrEmployee.length; index++) {
        let employee = arrEmployee[index];
        htmlString += `
        <tr>
                    <td>${employee.userName}</td>
                    <td>${employee.fullName}</td>
                    <td>${employee.email}</td>
                    <td>${employee.workDate}</td>
                    <td>${employee.position}</td>
                    <td>${employee.totalSalary()}</td>
                    <td>${employee.rank()}</td>
                    <td><button class="btn btn-danger" onclick="editEmployeee('${index}')">Edit</button></td>
                </tr>
       `
    }
    document.getElementById('tableDanhSach').innerHTML = htmlString;
    return htmlString;
};

