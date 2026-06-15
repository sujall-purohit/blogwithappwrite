import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="min-h-screen bg-slate-50 py-6 md:py-12 px-4">
      <Container>
        <div className=" mx-auto">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
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
                        p-4 md:p-6 lg:p-8
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