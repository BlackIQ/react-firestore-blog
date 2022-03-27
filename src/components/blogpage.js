const BlogPage = props => {
    const blog = props.blog;

    return (
        <div>
            <h3>{blog.title}</h3>
        </div>
    );
}

export default BlogPage;
