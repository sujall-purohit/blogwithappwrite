import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/appwriteConfig";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center max-w-lg">
                   <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
                        {authStatus
                            ? "No Posts Yet ✍️"
                            : "Welcome to ReactBlog"}
                    </h1>

                  <p className="mt-4 text-base md:text-lg text-slate-500">
                        {authStatus
                            ? "Create your first article and start sharing your ideas."
                            : "Login to explore articles and discover amazing content."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50">

            {/* Hero Section */}
          <section className="py-10 md:py-20">
                <Container>
                    <div
                        className="
                        rounded-3xl
                        bg-gradient-to-r
                        from-indigo-600
                        to-purple-600
                       p-6 md:p-10 lg:p-16
                        text-white
                        "
                    >
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
                            Build. Learn. Share.
                        </h1>

                        <p className="mt-6 text-lg md:text-xl opacity-90 max-w-2xl">
                            Discover tutorials, insights, and modern web
                            development articles from developers around the world.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Latest Posts */}
            <section className="pb-20">
                <Container>

                    <div className="mb-10">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                            Latest Articles
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Fresh content from the community.
                        </p>
                    </div>

                    <div
                        className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-4 md:gap-6 lg:gap-8
                        "
                    >
                        {posts.map((post) => (
                            <PostCard
                                key={post.$id}
                                {...post}
                            />
                        ))}
                    </div>

                </Container>
            </section>

        </div>
    );
}

export default Home;