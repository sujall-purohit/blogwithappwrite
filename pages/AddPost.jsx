import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <Container>
        <div className="max-w-8xl mx-auto">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900">
              Create New Post ✍️
            </h1>

            <p className="mt-2 text-slate-500">
              Share your ideas, tutorials, and experiences with the world.
            </p>
          </div>

          {/* Form Card */}
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
            <PostForm />
          </div>

        </div>
      </Container>
    </div>
  );
}

export default AddPost;