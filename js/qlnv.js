function Employee() {
    this.userName = '';
    this.fullName = '';
    this.email = '';
    this.passWord = '';
    this.workDate = '';
    this.basicSalary = '';
    this.position = '';
    this.workTime = '';
    // tính tổng lương    
    this.totalSalary = function () {
        if (this.position === 'Giám đốc') {
            total = this.basicSalary * 3;
        } else if (this.position === 'Trưởng phòng') {
            total = this.basicSalary * 2;
        } else {
            total = this.basicSalary;
        }
        return total;
    }
    // xếp loại nhân viên
    this.employeeRank = function () {
        if (this.workTime >= 192) {
            rank = 'Nhân viên xuất sắc';
        } else if (this.workTime >= 176) {
            rank = 'Nhân viên giỏi';
        } else if (this.workTime >= 160) {
            rank = 'Nhân viên khá';
        } else {
            rank = 'Nhân viên trung bình'
        };
        return rank;
    };
    this.rank = function () {
        if (this.position === 'Nhân viên') {
            result = this.employeeRank();
        } else {
            result = '';
        }
        return result;
    }
};
// xác định ký tự trống
function emptyInpput(input) {
    let emptyValid = /^(\s+)$/;
    if (emptyValid.test(input) || input == '') {
        return false;
    } else {
        return true;
    }
};
// xác định kiểu dữ liệu là chữ (bảng tiếng Việt)
function lettersValid(input) {
    let letters = /^[a-zA-Z a-ỹ]+$/;
    if (letters.test(input)) {
        return true;
    } else {
        return false;
    }
};
//  định dạng email
function emailFormat(input) {
    let mailFormat = /^\w+([\.-]\w+)*@\w+([\.-]\w+)*(\.\w{2,3})+$/;
    if (input.match(mailFormat)) {
        return true;
    } else {
        return false;
    }
};
// định dạng mật khẩu ít nhất(1 ký tự số, 1 ký tự đặc biệt, 1 ký tự in hoa)
function passwordValid(input) {
    let passWords = /^(\w{1,}|[^A-Z]+|[^0-9]+)$/;
    if (passWords.test(input)) {
        return false;
    } else {
        return true;
    }
};

// xác định độ dài ký tự
function lengthValid(input, max, min) {
    if (input.length < min || input.length > max) {
        return false;
    } else {
        return true;
    }
};
// định dạng ngày tháng năm dd/mm/yyyy
function dateFormat(input) {
    let dateFormValid = /^(\d{2,2}\/\d{2,2}\/\d{4,4})$/;
    if (dateFormValid.test(input)) {
        return true;
    } else {
        return false;
    }
};
// xác định min - max input
function minToMaxValid(input, min, max) {
    if (input < min || input > max) {
        return false;
    } else {
        return true;
    }
};







