import logic from '../logic'

import { Component } from 'react'

import Post from './Post'

import { logger, showFeedback } from '../utils'


class PostList extends Component {
    constructor() {
        logger.debug('PostList -> constructor')
        super()

        this.state = { posts: [] }

    }

    loadPosts() {
        logger.debug('PosrList -> loadPosts')


        try {
            const posts = logic.retrievePosts()

            this.setState({ posts })
        }
        catch (error) {
            showFeedback(error)
        }

    }

    componentWillReceiveProps(newProps) {
        logger.debug('PostList -> componentWillReceiveProps', JSON.stringify(this.props), JSON.stringify(newProps))
        // TRANSFERENCIA DE DATOS DE HIJOS A PADRES A TRAVÉS DE CALLBACKS, DE PADRE S A HIJOS A TRAVÉS DE PROPS (COMPORTAMIENTO REACT)

        // if (newProps.refreshStamp !== this.props.stamp)
        newProps.stamp !== this.props.stamp && this.loadPosts()

    }

    componentDidMount() {
        logger.debug('PostList -> componentDidMount')

        this.loadPosts()
    }

    handlePostDeleted = () => this.loadPosts()

    handleEditClick = post => this.props.onEditPostClick(post)




    // en el map, a cada post le metes el article key, y le asignas id
    render() {
        logger.debug('PostList -> render')
        return <section>
            {this.state.posts.map(post => <Post key={post.id} item={post} onEditClick={this.handleEditClick} onDeleted={this.handlePostDeleted} />)}

        </section>
    }

}

export default PostList
