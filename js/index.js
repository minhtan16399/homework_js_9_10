// validation 
document.querySelector('#tknv').onchange = function () {
    let inputVal = document.getElementById('tknv').value;
    let inputValLength = lengthValid(inputVal, 6, 4);
    let inputEmpty = emptyInpput(inputVal);
    let text = document.getElementById('tbTKNV');
    if (isNaN(inputVal) || inputValLength === false || inputEmpty === false) {
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
    let letters = lettersValid(inputVal);
    let inputEmpty = emptyInpput(inputVal);
    let text = document.getElementById('tbTen');
    if (letters === true && inputEmpty === true) {
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
    let mailFormat = emailFormat(inputVal);
    let inputEmpty = emptyInpput(inputVal);
    if (mailFormat === false || inputEmpty === false) {
        text.style.display = 'block'
        text.innerHTML = 'Email phải đúng định dạng vd: example123@gmail.com, không để trống';
        return false;
    } else {
        text.innerHTML = '';
        return true;
    }
};

document.querySelector('#password').onchange = function () {
    let inputVal = document.getElementById('password').value;
    let text = document.getElementById('tbMatKhau');
    let passWordLength = lengthValid(inputVal, 10, 6)
    let passWordFormat = passwordValid(inputVal)
    if (passWordFormat === true && passWordLength === true) {
        text.innerHTML = '';
        return true;
    } else {
        text.style.display = 'block'
        text.innerHTML = 'Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống';
        return false;
    }
};

document.querySelector('#datepicker').onchange = function () {
    let inputVal = document.getElementById('datepicker').value;
    let dateValid = dateFormat(inputVal);
    let inputEmpty = emptyInpput(inputVal);
    let text = document.getElementById('tbNgay');
    if (dateValid === true && inputEmpty === true) {
        text.innerHTML = '';
        return true;
    } else {
        text.style.display = 'block'
        text.innerHTML = 'Ngày làm không để trống, định dạng mm/dd/yyyy';
        return false;
    }
};

document.querySelector('#luongCB').onchange = function () {
    let inputVal = document.getElementById('luongCB').value;
    let salaryValid = minToMaxValid(inputVal, 1000000, 20000000);
    let inputEmpty = emptyInpput(inputVal);
    let text = document.getElementById('tbLuongCB');
    if (salaryValid === true && inputEmpty === true) {
        text.innerHTML = '';
        return true;
    } else {
        text.style.display = 'block'
        text.innerHTML = 'Lương cơ bản 1 000 000 - 20 000 000, không để trống';
        return false;
    }
};

document.querySelector('#chucvu').onchange = function () {
    let inputVal = document.getElementById('chucvu').value;
    let text = document.getElementById('tbChucVu');
    if (inputVal === 'Giám đốc' || inputVal === 'Trưởng phòng' || inputVal === 'Nhân viên') {
        text.innerHTML = '';
        return true;
    } else {
        text.style.display = 'block'
        text.innerHTML = 'Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)';
        return false;
    }
};

document.querySelector('#gioLam').onchange = function () {
    let inputVal = document.getElementById('gioLam').value;
    let timeValid = minToMaxValid(inputVal, 80, 200);
    let inputEmpty = emptyInpput(inputVal);
    let text = document.getElementById('tbGiolam');
    if (timeValid === false || inputEmpty === false) {
        text.style.display = 'block'
        text.innerHTML = 'Số giờ làm trong tháng 80 - 200 giờ, không để trống';
        return false;
    } else {
        text.innerHTML = '';
        return true;
    }
};
//

var arrEmployee = [];

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

document.getElementById('btnThemNV').onclick = function (e) {
    e.preventDefault();

    // biến dùng để check valid được nhập vào từ input, tất cả đúng sẽ thêm nhân viên vào, có mục sai hiện hộp thoại thông báo
    let checkValid = document.querySelector('#gioLam').onchange() * document.querySelector('#chucvu').onchange() * document.querySelector('#luongCB').onchange() * document.querySelector('#datepicker').onchange() * document.querySelector('#password').onchange() * document.querySelector('#email').onchange() * document.querySelector('#name').onchange() * document.querySelector('#tknv').onchange();

    if (checkValid === 1) {
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
    } else {
        alert('vui lòng nhập đúng định dạng')
    }
};
