import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/appwriteConfig";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <Container>
                <div className="max-w-8xl mx-auto">

                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-900">
                            Edit Post
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Update your article and publish changes.
                        </p>
                    </div>

                    <div
                        className="
            bg-white
            rounded-3xl
            shadow-xl
            border
            border-slate-200
            p-8
          "
                    >
                        <PostForm post={post} />
                    </div>

                </div>
            </Container>
        </div>
    ) : null
}

export default EditPost