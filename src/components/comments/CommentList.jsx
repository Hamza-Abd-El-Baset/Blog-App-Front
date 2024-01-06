import swal from "sweetalert";
import "./comment-list.css"
import UpdateCommentModal from "./UpdateCommentModal";
import { useState } from "react";



const CommentList = () => {
    
    const [updateComment, setUpdateComment] = useState(false)

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
              swal("Your comment is safe!");
            }
          });
    }
    
    return (
        <div className="comment-list">
            <h4 className="comment-list-count">2 Comments</h4>
            {[1, 2].map(comment => (
               <div key={comment} className="comment-item">
                    <div className="comment-item-info">
                        <div className="comment-item-username">
                            user{comment} name
                        </div>
                        <div className="comment-item-time">
                            2 hours ago
                        </div>
                    </div>
                    <p className="comment-item-text">
                        hello this is amazing
                    </p>
                    <div className="comment-item-icon-wrapper">
                        <i className="bi bi-pencil-square" onClick={() => setUpdateComment(true)}></i>
                        <i className="bi bi-trash-fill" onClick={deleteCommentHandler}></i>
                    </div>
               </div> 
                )
            )}
            {updateComment && <UpdateCommentModal setUpdateComment={setUpdateComment} comment={{_id:1, text: "Hello! This is amazing"}}/>}
        </div>
    );
}
 
export default CommentList;