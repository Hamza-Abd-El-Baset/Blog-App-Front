import AdminSidebar from "./AdminSidebar"
import "./admin-table.css"
import swal from "sweetalert";

const comments = [
    {
        _id: 1,
        postId: 2,
        text: "That's amazing!",
        username: "Mohamed Abd-El-Baset"
    },
    {
        _id: 2,
        postId: 3,
        text: "You have made a great job!",
        username: "Omar Abd-El-Baset"
    }
]

const CommentsTable = () => {

    const deleteCommentHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Comment has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Comment is safe!");
            }
          });
    }

    return (
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Comments</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((item, index) => (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="table-image">
                                        <img
                                            src="/images/user-avatar.png"
                                            alt=""
                                            className="table-user-image"    
                                        />
                                        <span className="table-username">{item.username}</span>
                                    </div>
                                </td>
                                <td>{item.text}</td>
                                <td>
                                    <div className="table-button-group">
                                        <button onClick={deleteCommentHandler}>Delete Comment</button>
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
 
export default CommentsTable;