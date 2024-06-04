import { useState, useEffect } from "react";
import appwriteDbService from "../../appwrite/database";
import { Container, PostCard } from "../../components";
import { useSelector } from "react-redux";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector(state => state.status)
    console.log(authStatus)
    console.log(useSelector((state) => state.userData));
    useEffect(() => {
        appwriteDbService.getBlogs([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    // if (posts.length === 0) {
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full">
    //                         <h1 className="text-2xl font-bold hover:text-gray-500">
    //                             Login to read posts
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     );
    // }
    // return (
    //     <div className="w-full py-8">
    //         <Container>
    //             <div className="flex flex-wrap">
    //                 {posts.map((post) => (
    //                     <div key={post.$id} className="p-2 w-1/4">
    //                         <PostCard {...post}/>
    //                     </div>
    //                 ))}
    //             </div>
    //         </Container>
    //     </div>
    // );
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap md:flex-nowrap">
                    {/* Left Section */}
                        <div className="p-4 w-full md:w-1/2 text-left ">
                            <h1 className="text-6xl font-bold text-gray-800">
                                Blogify
                            </h1>
                            <p className="mt-4 text-xl text-gray-600 pt-4">
                                Welcome to Blogify, your number one source for
                                all things blogs. We're dedicated to giving you
                                the very best of content, with a focus on
                                quality, originality, and community.
                            </p>
                            <p className="mt-2 text-xl text-gray-600 pt-4">
                                Our goal is to empower writers and readers
                                alike, fostering a space where ideas can be
                                freely shared and discussed.
                            </p>
                            {!authStatus && (<p className="mt-8 text-lg pt-4 font-semibold text-cyan-900 ">
                                Note: You must sign in to add or read blogs.
                            </p>)}
                            
                        </div>

                    {/* Right Section */}
                    <div className="p-4 w-full md:w-1/2 flex items-center justify-center">
                        <img
                            src="\illustration\undraw_articles_wbpb.svg"
                            alt="Blogify"
                            className="w-full h-auto max-w-sm"
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}
