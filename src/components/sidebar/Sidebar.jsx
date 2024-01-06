import { Link } from "react-router-dom";
import "./sidebar.css"

const Sidebar = ({categories}) => {
    return (
        <div className="sidebar">
            <h5 className="sidebar-title">Categories</h5>
            <ul className="sidebar-links">
                {categories.map(category =>
                    <Link className="sidebar-link" to={`/posts/categories/${category.title}`} key={category._id}>
                        {category.title}
                    </Link>
                    )}
            </ul>
        </div>
      );
}
 
export default Sidebar;