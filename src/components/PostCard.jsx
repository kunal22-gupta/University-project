import React from "react";
import {Link} from "react-router-dom";
import storage from "../appwrite/storage";
export default function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="block bg-slate-100 p-4 rounded-xl overflow-hidden">
        <div className="w-full mb-4" style={{ width: '260px', height: '200px' }}>
            <img
                src={storage.getFilePreview(featuredImage)}
                alt={title}
                className="w-full h-full object-cover rounded-xl"
            />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
    </Link>
    );
}
