import { Link } from "react-router-dom";

const PostItem = ({post}) => {
    return ( 
        <div className="post-item">
            <div className="post-item-image-wrapper">
                <img src={post.image} alt="" className="post-item-image" />
            </div>
            <div className="post-info-wrapper">
                <div className="post-item-info">
                    <div className="post-item-author">
                        <strong>Author: </strong>
                        <Link className="post-item-username" to="/profile/1">{post.user.username}</Link>
                    </div>
                    <div className="post-item-date">
                        {new Date(post.createdAt).toDateString()}
                    </div>
                </div>
                <div className="post-item-details">
                    <h4 className="post-item-title">{post.title}</h4>
                    <Link className="post-item-category" to={`/posts/categories/${post.category}`}>
                        {post.category}
                    </Link>
                </div>
                <p className="post-item-description">
                    {post.description}
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Veniam ex, dolor aperiam, quo natus placeat distinctio fugit ea, aliquam aspernatur minus?
                    Necessitatibus quia cum odio dignissimos ullam!
                    Odit, omnis magnam.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Veniam ex, dolor aperiam, quo natus placeat distinctio fugit ea, aliquam aspernatur minus?
                    Necessitatibus quia cum odio dignissimos ullam!
                    Odit, omnis magnam.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Veniam ex, dolor aperiam, quo natus placeat distinctio fugit ea, aliquam aspernatur minus?
                    Necessitatibus quia cum odio dignissimos ullam!
                    Odit, omnis magnam.
                </p>
                <Link className="post-item-link" to={`/posts/details/${post._id}`}>
                    Read More ...
                </Link>
            </div>
        </div> 
    );
}
 
export default PostItem;