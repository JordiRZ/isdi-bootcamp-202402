import { logger, showFeedback } from "../utils";

import logic from "../logic";

import { useState, useEffect } from "react";
import Post from "./Post";

function PostList(props) {
    const [posts, setPosts] = useState([])

    const loadPosts = () => {
        logger.debug('PostList -> loadPosts')

        try {
            logic.retrievePosts((error, posts) => {
                if (error) {
                    showFeedback(error)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            showFeedback(error)
        }
    }

    // componentWillReceiveProps(newProps) {
    //   logger.debug(
    //     "PostList -> componentWillReceiveProps",
    //     JSON.stringify(props),
    //     JSON.stringify(newProps)
    //   );

    //   //if (newProps.stamp !== props.stamp) loadPosts()
    //   newProps.stamp !== props.stamp && loadPosts();
    // }

    // componentDidMount() {
    //   logger.debug("PostList -> componentDidMount");

    //   loadPosts();
    // }

    useEffect(() => {
        loadPosts()
    }, [props.stamp])

    const handlePostDeleted = () => loadPosts();

    const handleEditClick = post => props.onEditPostClick(post);

    logger.debug('PostList -> render')

    return <section>
        {posts.map(post => <Post key={post.id} item={post} onEditClick={handleEditClick} onDeleted={handlePostDeleted} />)}
    </section>
}

export default PostList;