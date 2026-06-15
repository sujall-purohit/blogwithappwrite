import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/appwriteConfig";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    return (
        <div className="min-h-screen bg-slate-50 py-6 md:py-12">
            <Container>

                <div className="mb-12">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                        All Articles
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Discover tutorials, insights and development tips.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>

            </Container>
        </div>
    )
}

export default AllPosts