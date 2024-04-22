import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice";

import React, { useEffect } from "react";

import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {

    const dispatch = useDispatch();

    const Posts = useSelector(selectAllPosts);
    const PostsStatus = useSelector(getPostsStatus);
    const PostsError = useSelector(getPostsError);

    useEffect(() => {
        if (PostsStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [PostsStatus, dispatch])

    let content;
    if (PostsStatus === 'loading') {
        content = <p>'Loading...'</p>;
    } else if (PostsStatus === 'succeeded') {
        const orderPosts = Posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderPosts.map(post => (
            <PostsExcerpt key={post.id} post={post} />
        ))
    } else if (PostsStatus === 'failed') {
        content = <p>{PostsError}</p>;
    }

    return (
        <section>
            <h2>Posts</h2>
            {/* {renderedPosts} */}
            {content}
        </section>
    )
}

export default PostsList