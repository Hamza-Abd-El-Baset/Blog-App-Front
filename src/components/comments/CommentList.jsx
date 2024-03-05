import swal from "sweetalert";
import "./comment-list.css"
import UpdateCommentModel from "./UpdateCommentModel";
import { useEffect, useState } from "react";
import Moment from "react-moment"
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";
import isTokenExpired from "../../utils/isTokenExpired";


const CommentList = ({ comments }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const [isTokenValid, setIsTokenValid] = useState(false)

    useEffect(() => {
        setIsTokenValid(!isTokenExpired(user?.token))
    }, [user])

    const [openUpdateCommentModel, setOpenUpdateCommentModel] = useState(false)
    const [commentForUpdate, setCommentForUpdate] = useState(null)

    const updateCommentHandler = (comment) => {
        setCommentForUpdate(comment)
        setOpenUpdateCommentModel(true)
    }

    const deleteCommentHandler = (commentId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((isOk) => {
            if (isOk) {
              dispatch(deleteComment(commentId))
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
                        (user?._id === comment.user && isTokenValid) && (
                            <div className="comment-item-icon-wrapper">
                                <i className="bi bi-pencil-square" onClick={() => updateCommentHandler(comment)}></i>
                                <i className="bi bi-trash-fill" onClick={() => deleteCommentHandler(comment?._id)}></i>
                            </div>
                        )
                    }
               </div> 
                )
            )}
            {openUpdateCommentModel && (
                <UpdateCommentModel commentForUpdate={commentForUpdate} setOpenUpdateCommentModel={setOpenUpdateCommentModel} />
            )}
        </div>
    );
}
 
export default CommentList;