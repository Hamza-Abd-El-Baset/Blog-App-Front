import AdminMain from "./AdminMain";
import AdminSidebabr from "./AdminSidebar";
import "./admin.css"

const AdminDashboard = () => {
    return ( 
        <section className="admin-dashboard">
            <AdminSidebabr/>
            <AdminMain/>
        </section>
     );
}
 
export default AdminDashboard