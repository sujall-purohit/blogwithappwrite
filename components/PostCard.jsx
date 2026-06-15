import React from "react";
import appwriteService from "../appwrite/appwriteConfig";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featureImage, $createdAt }) {
    return (
        <Link to={`/post/${$id}`} className="group">
            <article
                className="
        overflow-hidden
        rounded-2xl
        bg-white
        border
        border-slate-200
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1 md:hover:-translate-y-2
        hover:shadow-xl
      "
            >
                <div className="overflow-hidden">
                    <img
                        src={appwriteService.getImagePreviewURL(featureImage)}
                        alt={title}
                        className="
              w-full
              aspect-video
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
                    />
                </div>

                <div className="p-5">
                    <span
                        className="
            inline-block
            px-3
            py-1
            text-xs
            font-medium
            rounded-full
            bg-indigo-100
            text-indigo-700
          "
                    >
                        React
                    </span>

                    <h2
                        className="
            mt-3
            text-lg md:text-xl
            font-bold
            text-slate-900
            line-clamp-2
          "
                    >
                        {title}
                    </h2>

                    <div className="mt-4 text-sm text-slate-500">
                        <span> {new Date($createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default PostCard;