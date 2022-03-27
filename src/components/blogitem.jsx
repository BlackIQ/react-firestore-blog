import {Link} from "react-router-dom";

const BlogItem = props => {
    const blog = props.blog;

    return (
        <div>
            <div className='border border-warning rounded-4'>
                <div className='m-3'>
                    <h4 className='text-warning'><Link to={'/blog/' + blog.id}>{blog.title}</Link></h4>
                    <p>{blog.text}</p>
                </div>
            </div>
            <br/>
        </div>
    );
}

export default BlogItem;
