// setup button thêm nhân viên (btnThem): ẩn button xóa và button cập nhật, reset form login
document.querySelector('#btnThem').onclick = function () {
    document.querySelector('#header-title').style.display = 'block';
    document.querySelector('#btnThemNV').style.display = 'block';
    document.querySelector('#btnXoaNV').style.display = 'none';
    document.querySelector('#btnCapNhat').style.display = 'none';
    document.querySelector('#tknv').disabled = false;
    document.querySelector('#formNhanVien').reset();
    let nodeList = document.querySelectorAll('form .sp-thongbao');
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.display = 'none';
    };
};

// validation 
// valid tài khoản 
document.querySelector('#tknv').oninput = function (e) {
    // e.target <=> document.querySelector('#tknv');
    let inputVal = e.target.value;
    let arr = [];
    // value = a
    //  index          0     1     2
    //arrEmployee = [{...},{...},{...}]
    for (var index = 0; index < arrEmployee.length; index++) {
        //Mỗi lần duyệt lấy ra 1 nhân viên
        let employee = arrEmployee[index];
        //Loại bỏ ký tự đặt biệt trên loại nhân viên
        let availableUserName = employee.userName;
        arr.push(availableUserName);
        if (arr.some(check())) {
            //Tìm thấy
            // console.log(employee);
            document.getElementById('tknv').style.display = 'block';
            document.getElementById('tknv').innerHTML = 'Tài khoản' + inputVal + 'đã tồn tại';
            return false;
        } else {
            document.getElementById('tknv').innerHTML = '';
            return true;
        }
    }
};
function check (input) {
    return input === inputVal;
  }

document.querySelector('#tknv').onchange = function () {
    let inputVal = document.getElementById('tknv').value;
    let condition = (emptyInput(inputVal) === true && lengthValid(inputVal, 4, 6) === true && lettersLatinValid(inputVal));
    let text = 'Tài khoản tối đa 4 - 6 ký số, không để trống';
    return validation(condition, 'tbTKNV', text);
};

// valid họ tên 
document.querySelector('#name').onchange = function () {
    let inputVal = document.getElementById('name').value;
    let condition = (emptyInput(inputVal) === true && lettersValid(inputVal) === true);
    let text = 'Tên nhân viên phải là chữ, không để trống';
    return validation(condition, 'tbTen', text);
};

// valid mail
document.querySelector('#email').onchange = function () {
    let inputVal = document.getElementById('email').value;
    let condition = (emptyInput(inputVal) === true && emailFormat(inputVal) === true);
    let text = 'Email phải đúng định dạng vd: example123@gmail.com, không để trống';
    return validation(condition, 'tbEmail', text);
};

// valid mật khẩu
document.querySelector('#password').onchange = function () {
    let inputVal = document.getElementById('password').value;
    let condition = (emptyInput(inputVal) === true && lengthValid(inputVal, 6, 10) === true && passwordValid(inputVal) === true);
    let text = 'Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống';
    return validation(condition, 'tbMatKhau', text);
};

// valid ngày tháng năm
document.querySelector('#datepicker').onchange = function () {
    let inputVal = document.getElementById('datepicker').value;
    let condition = (emptyInput(inputVal) === true && dateFormat(inputVal) === true);
    let text = 'Ngày làm không để trống, định dạng mm/dd/yyyy';
    return validation(condition, 'tbNgay', text);
};

// valid luong cơ bản
document.querySelector('#luongCB').onchange = function () {
    let inputVal = document.getElementById('luongCB').value;
    let condition = (emptyInput(inputVal) === true && minToMaxValid(inputVal, 1000000, 20000000) === true);
    let text = 'Lương cơ bản 1 000 000 - 20 000 000, không để trống';
    return validation(condition, 'tbLuongCB', text);
};

// valid chức vụ 
document.querySelector('#chucvu').onchange = function () {
    let inputVal = document.getElementById('chucvu').value;
    let condition = (inputVal === 'Giám đốc' || inputVal === 'Trưởng phòng' || inputVal === 'Nhân viên');
    let text = 'Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)';
    return validation(condition, 'tbChucVu', text);
};

// valid giờ làm
document.querySelector('#gioLam').onchange = function () {
    let inputVal = document.getElementById('gioLam').value;
    let condition = (emptyInput(inputVal) === true && minToMaxValid(inputVal, 80, 200) === true);
    let text = 'Số giờ làm trong tháng 80 - 200 giờ, không để trống';
    return validation(condition, 'tbGiolam', text);
};

//
function Valid () {
   let result = document.querySelector('#gioLam').onchange() & document.querySelector('#chucvu').onchange() & document.querySelector('#luongCB').onchange() & document.querySelector('#datepicker').onchange() & document.querySelector('#password').onchange() & document.querySelector('#email').onchange() & document.querySelector('#name').onchange() & document.querySelector('#tknv').onchange();
   return  result;
}

var arrEmployee = [];

// setup button thêm nhân viên mới
document.getElementById('btnThemNV').onclick = function (e) {
    e.preventDefault();
// biến dùng để kiểm tra giá trị được nhập vào từ input, tất cả đúng sẽ thêm nhân viên vào, có bất kì mục nào sai hiện hộp thoại thông báo
    let checkValid = Valid ();

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
    }
};

// tạo table khi thêm nhân viên mới
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
                    <td><button class="btn btn-success" data-toggle="modal"
									data-target="#myModal" onclick="editEmployee('${index}')">Edit</button>  
                    </td>
       </tr>
       `
    }
    document.getElementById('tableDanhSach').innerHTML = htmlString;
    return htmlString;
};

// chỉnh sửa nhân viên
function editEmployee(indexEdit) {
    //Ân / hiện các control cần thiết
    document.querySelector('#header-title').style.display = 'none';
    document.querySelector('#btnThemNV').style.display = 'none';
    document.querySelector('#btnCapNhat').style.display = 'block';
    document.querySelector('#btnXoaNV').style.display = 'block';
    document.getElementById('tknv').disabled = true;
    // cài sự kiện click button xóa
    document.querySelector('#btnXoaNV').setAttribute('onclick', 'deleteEmployee()');

    let edit = arrEmployee[indexEdit];
    //Dom đến thẻ input trên giao diện để đưa thông tin nhân viên lên
    document.getElementById('tknv').value = edit.userName;
    document.getElementById('name').value = edit.fullName;
    document.getElementById('email').value = edit.email;
    document.getElementById('password').value = edit.passWord;
    document.getElementById('datepicker').value = edit.workDate;
    document.getElementById('luongCB').value = edit.basicSalary;
    document.getElementById('chucvu').value = edit.position;
    document.getElementById('gioLam').value = edit.workTime;

    localStorage.setItem("indexEdit", indexEdit);
};

// xóa nhân viên
function deleteEmployee() {
    //lấy ra vị trí nhân viên cần xóa
    let indexDel = localStorage.getItem('indexEdit');
    //Xoá object trong mảng dựa vào index
    arrEmployee.splice(indexDel, 1);
    //Tạo lại table nhân viên với mảng sau khi xoá
    renderTableEmployee(arrEmployee);
};

// setup button cập nhật nhân viên
document.querySelector('#btnCapNhat').onclick = function () {
    let employee = new Employee();
    let checkValid = Valid ()
    if (checkValid === 1) {
        employee.userName = document.getElementById('tknv').value;
        employee.fullName = document.getElementById('name').value;
        employee.email = document.getElementById('email').value;
        employee.passWord = document.getElementById('password').value;
        employee.workDate = document.getElementById('datepicker').value;
        employee.basicSalary = +document.getElementById('luongCB').value;
        employee.position = document.getElementById('chucvu').value;
        employee.workTime = +document.getElementById('gioLam').value;

        console.log(employee);
        //Lấy ra vị trí phần tử trong mảng thay đổi
        let indexEdit = localStorage.getItem('indexEdit');
        arrEmployee[indexEdit] = employee;
        //Gọi hàm từ mảng tạo ra giao diện
        renderTableEmployee(arrEmployee);

        document.querySelector('#formNhanVien').reset();
    };
};

// lưu vào localStorage
function saveStorage() {
    //Cần lưu array nhân viên vào máy
    let strEmployee = JSON.stringify(arrEmployee);
    localStorage.setItem('arrEmployee', strEmployee);
};

// lấy data từ localStorage
function getStorage() {
    //Kiểm tra storage có array nhân viên được lấy ra k
    if (localStorage.getItem('arrEmployee')) {
        //Lấy ra gán vào biến str
        let str = localStorage.getItem('arrEmployee');
        //Chuyển về object và gán vào array nhân viên
        arrEmployee = JSON.parse(str);
        console.log(arrEmployee);
        //Dùng array nhân viên để tạo lại giao diện
        renderTableEmployee(arrEmployee);
    }
};

window.onload = function () {
    //Trang vừa load xong thì hàm này sẽ chạy (sự kiện onload của browser)

    //Lấy dữ liệu từ storage và in ra table nhân viên
    getStorage()
};
// /*
//     Tính năng tìm kiếm người dùng
// */
document.querySelector('#searchName').oninput = function (e) {
    // e.target <=> document.querySelector('#searchName');
    let tuKhoa = e.target.value;
    tuKhoa = stringToSlug(tuKhoa); //Loại bỏ dấu tiếng việt
    console.log(tuKhoa);

    let output = [];
    // value = a
    //  index          0     1     2
    //arrEmployee = [{...},{...},{...}]
    for (var index = 0; index < arrEmployee.length; index++) {
        //Mỗi lần duyệt lấy ra 1 nhân viên
        let employee = arrEmployee[index];
        //Loại bỏ ký tự đặt biệt trên loại nhân viên
        let loaiNhanVien = stringToSlug(employee.rank());

        if (loaiNhanVien.search(tuKhoa) != -1) {
            //Tìm thấy
            // console.log(employee)
            output.push(employee);
        }
    }

    console.log(output); //[] => kết quả chứa các object nhân viên
    renderTableEmployee(output);
};



