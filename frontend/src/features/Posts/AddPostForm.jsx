import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../Users/usersSlice';

const AddPostForm = () => {

    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers);

    /* Both Syntax below should work just fine as when only one arg & param then you can call fn without parenthesis */
    const onTitleChanged = (e) => (setPostTitle(e.target.value));
    const onContentChanged = e => setPostContent(e.target.value);
    const onUserChange = e => setUserId(e.target.value);

    const dispatch = useDispatch();

    /*
        const onSavePostClicked = () => {
            if (postTitle && postContent) {
                dispatch(
                    addNewPost(postTitle, postContent, userId) // this step now calls the prepare method in PostSlice
                )
                setPostTitle('');
                setPostContent('');
            }
        };
    */
    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ postTitle, body: postContent, userId })).unwrap()

                setPostTitle('');
                setPostContent('');
                setUserId('')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    const canSave = [postTitle, postContent, userId].every(Boolean) && addRequestStatus === 'idle';

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    name="postTitle"
                    value={postTitle}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postWriter">Author:</label>
                <select id="postWriter" value={userId} onChange={onUserChange}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Post Content:</label>
                <input
                    id="postContent"
                    type="text"
                    name="postContent"
                    value={postContent}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    disabled={!canSave}
                    onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm