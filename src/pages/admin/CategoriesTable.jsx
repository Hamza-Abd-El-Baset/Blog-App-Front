import AdminSidebar from "./AdminSidebar"
import "./admin-table.css"
import swal from "sweetalert";
import { categories } from "../../dummyData";

const CategoriesTable = () => {

    const deleteCategoryHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this category!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Category has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Category is safe!");
            }
          });
    }

    return (
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Categories</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Category Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item, index) => (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>
                                    <b>{item.title}</b>
                                </td>
                                <td>
                                    <div className="table-button-group">
                                        <button onClick={deleteCategoryHandler}>
                                            Delete Category
                                        </button>
                                    </div>
                                </td>
                            </tr>    
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
 
export default CategoriesTable;