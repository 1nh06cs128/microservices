import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";

import axios from "axios";

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

/*
const initialState = [{
    id: '1',
    title: 'Learning Redux Toolkit 1',
    content: `Their divided a set without light life said Fowl creature, meat god that she'd. Fowl let bring years tree you'll, heaven saying saying. Have his darkness without you you'll Saw day herb a. Created place air evening years signs cattle meat you'll for is moving all saw is, tree. Fly a made hath. Bearing fill of. Beginning air. Subdue night.`,
    date: sub(new Date, {minutes:15}).toISOString(),
    reactions: {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0
    }
}, {
    id: '2',
    title: 'Learning Redux Toolkit 2',
    content: `You're together said behold earth very shall one of. Appear one above. Said fly earth blessed his so was. Male bearing so for i likeness. You'll firmament beast dry rule above fowl day to you're. Can't won't which deep seas appear abundantly cattle one face he sea gathered she'd dry had divide saw seasons you'll. Fowl give that. Place two bearing good saw meat divided unto lesser fill god air fruit which light created light was kind firmament Saw be fowl Tree you're, so she'd all the divided she'd be his yielding them after deep be moveth yielding rule sixth fruitful rule kind, divided you're own that. Every land beast fish dominion stars greater our them second one male herb i, fifth of seas day subdue moveth also meat life thing sixth itself after fowl light.`,
    date: sub(new Date, {minutes:10}).toISOString(),
    reactions: {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0
    }
}, {
    id: '3',
    title: 'Learning Redux Toolkit 3',
    content: `Man them darkness. They're fifth open you're itself appear them. Man without under great were blessed called female, under won't blessed don't moved. Replenish his divided land yielding darkness under brought to winged saying beginning, were. Place winged very firmament creepeth creeping. Stars may i said third, doesn't is fourth they're forth sixth multiply isn't may one female. Have signs together bring grass creature man dry Upon may meat winged his beginning earth. Saying deep good may him there appear fly without gathered whales which spirit fourth deep midst saying a were for. Which good. Fifth them that cattle winged very bearing gathered, first.`,
    date: sub(new Date, {minutes:5}).toISOString(),
    reactions: {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0
    }
}]
*/

const initialState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//     try {
//         const response = await axios.get(POST_URL)
//         return [...response.data];
//     } catch (error) {
//         return error.message;
//     }
// })

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POST_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POST_URL, initialPost)
    return response.data
})

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // postAdded: {
        //     reducer(state, action) {
        //         state.posts.push(action.payload)
        //     },
        //     // prepare callbacks
        //     prepare(title, content, userId) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 content,
        //                 userId,
        //                 date: new Date().toISOString(),
        //                 reactions: {
        //                     thumbsUp: 0,
        //                     wow: 0,
        //                     heart: 0,
        //                     rocket: 0,
        //                     coffee: 0
        //                 }
        //             }
        //         }
        //     }
        // },
        // reactionAdded(state, action) {
        //     const { postId, reaction } = action.payload;
        //     const existingPost = state.posts.find(post => post.id == postId);
        //     if (existingPost) {
        //         existingPost.reactions[reaction]++;
        //     }
        // }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Adding date and reactions
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date, { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                // Fix for API post IDs:
                // Creating sortedPosts & assigning the id
                // would be not be needed if the fake API
                // returned accurate new post IDs
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                // End fix for fake API post IDs
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                // console.log(action.payload)
                state.posts.push(action.payload)
            })
    }
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;


export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;

// generate random text of 300 words