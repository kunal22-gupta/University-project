import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import appwriteDbService from "../../appwrite/database";
import appwriteStorageService from "../../appwrite/storage";
import { useSelector } from "react-redux";
import { Container, Button } from "../../components";
import parse from "html-react-parser";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.userData);
    const isAuthor = post && userData ? userData.$id === post.userId : false;
    
    useEffect(() => {
        if (slug) {
            appwriteDbService.getBlog(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);



    const deletePost = () => {
        appwriteDbService.deleteBlog(post.$id).then((status) => {
            if (status) {
                appwriteStorageService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteStorageService.getFilePreview(
                            post.featuredImage
                        )}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="bg-slate-300">
                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    {/* <hr className="mb-2"/> */}
                    <div className="browser-css">{parse(post.content)}</div>
                </div>
            </Container>
        </div>
    ) : null;
}
