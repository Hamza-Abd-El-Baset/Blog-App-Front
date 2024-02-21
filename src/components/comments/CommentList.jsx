import swal from "sweetalert";
import "./comment-list.css"
import UpdateCommentModel from "./UpdateCommentModel";
import { useState } from "react";
import Moment from "react-moment"
import { UseDispatch, useSelector } from "react-redux";


const CommentList = ({ comments }) => {
    const { user } = useSelector(state => state.auth)

    const [openUpdateCommentModel, setOpenUpdateCommentModel] = useState(false)

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
            <h4 className="comment-list-count">{comments?.length} Comments</h4>
            {comments?.map(comment => (
               <div key={comment._id} className="comment-item">
                    <div className="comment-item-info">
                        <div className="comment-item-username">
                            {comment.username}
                        </div>
                        <div className="comment-item-time">
                            <Moment fromNow ago>
                                {comment.createdAt}
                            </Moment>
                            {" "}
                            ago
                        </div>
                    </div>
                    <p className="comment-item-text">
                        {comment.text}
                    </p>
                    {
                        user?._id === comment.user && (
                            <div className="comment-item-icon-wrapper">
                                <i className="bi bi-pencil-square" onClick={() => setOpenUpdateCommentModel(true)}></i>
                                <i className="bi bi-trash-fill" onClick={deleteCommentHandler}></i>
                            </div>
                        )
                    }
               </div> 
                )
            )}
            {openUpdateCommentModel && <UpdateCommentModel setOpenUpdateCommentModel={setOpenUpdateCommentModel} comment={{_id:1, text: "Hello! This is amazing"}}/>}
        </div>
    );
}
 
export default CommentList;