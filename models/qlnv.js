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








