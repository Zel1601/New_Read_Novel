import React from "react";
import AdminHeader from "./AdminHeader";
import './AdminCss/AdminDashBoard.css';

const AdminDashBoard = () =>{
    return(
        <div>
            <AdminHeader />
            <h1 >WELCOMEBACK ADMIN</h1>
            <h3 className="db_h3">Hôm nay bạn khỏe chứ ?</h3>
            <h4 className="db_h4">Danh sách chức năng</h4>
            <p className="db_p">+ Để xem danh sách tiểu thuyết chọn chức năng danh sách tiểu thuyết</p>
            <p className="db_p">+ Để thêm, sửa, xóa vui lòng chọn các chức năng khác.</p>
            <p className="db_p">+ Bấm đăng xuất để thoát</p>
        </div>
    )

}
export default AdminDashBoard;