import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteDbService from "../../appwrite/database";
import { Container, PostForm } from "../../components";

export default function EditPost() {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            appwriteDbService.getBlog(slug).then((post) => {
                if (post) setPost(post);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null;
}
