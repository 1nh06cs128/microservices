import { useSelector } from "react-redux";
import { selectAllUsers } from "../Users/usersSlice";

const PostsWriter = ({ userId }) => {
    const users = useSelector(selectAllUsers);
    const writer = users.find(user => user.id == userId);

    return (
        <span>by {writer ? writer.name : 'anonymous'}</span>
    )
}

export default PostsWriter