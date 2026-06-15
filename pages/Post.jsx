import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/appwriteConfig";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor =
        post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService
                .getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    } else {
                        navigate("/");
                    }
                })
                .catch(() => {
                    navigate("/");
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteImage(post.featureImage);
                navigate("/");
            }
        });
    };

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-6 md:py-10">
            <Container>
                <div className="max-w-5xl mx-auto">

                    {/* Cover Image */}
                    <div className="overflow-hidden rounded-3xl shadow-xl mb-10">
                        <img
                            src={appwriteService.getImagePreviewURL(
                                post.featureImage
                            )}
                            alt={post.title}
                            className="w-full aspect-video object-cover"
                        />
                    </div>

                    {/* Title Section */}
                    <div className="mb-10">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
                            Blog Article
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                            {post.title}
                        </h1>

                        <div className="mt-4 flex flex-wrap items-center gap-2 md:gap-4 text-slate-500">
                            <span>Published Article</span>
                            <span>•</span>
                            <span> {new Date(post.$createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}</span>
                        </div>

                        {isAuthor && (
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl"
                                    >
                                        Edit Post
                                    </Button>
                                </Link>

                                <Button
                                    onClick={deletePost}
                                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                                >
                                    Delete Post
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <article
                        className="
                        bg-white
                        rounded-3xl
                        shadow-sm
                        border
                        border-slate-200
                       p-4 md:p-8 lg:p-12
                        "
                    >
                        <div
                            className="
                          prose max-w-none prose-slate md:prose-lg
                            "
                        >
                            {parse(post.content)}
                        </div>
                    </article>
                </div>
            </Container>
        </div>
    );
}