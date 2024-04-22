import PostsWriter from "./PostsWriter";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsExcerpt = ({ post }) => {
    return (
        <article>
            <h3>{post.title}</h3>
            {/* <p>{post.body.substring(0, 100)}</p> */}
            <p>{post.body}</p>
            <p className="postCredit">
                <PostsWriter userId={post.userId} />
                <TimeAgo timeStamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default PostsExcerpt