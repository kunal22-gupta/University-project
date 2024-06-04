import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import appwriteDbService from "../../appwrite/database";
import appwriteStorageService from "../../appwrite/storage";
import { useSelector } from "react-redux";
import { Input, Select, Button, RTE } from "../index";

export default function PostForm({ post }) {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, getValues, watch, control } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || "active",
            },
        });

    const userData = useSelector((state) => state.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0]
                ? await appwriteStorageService.uploadFile(data.image[0])
                : null;
            if (file) {
                appwriteStorageService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteDbService.updateBlog(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            console.log(data)
            console.log(userData)
            // const file = data.image[0] ? await appwriteStorageService.uploadFile(data.image[0]) : null;
            const file = await appwriteStorageService.uploadFile(data.image[0])
            if (file) {
                data.featuredImage = file.$id;
                const dbPost = await appwriteDbService.uploadBlog({
                    ...data,
                    userId: userData.$id,
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });
        return () => subscription.unsubscribe();

    }, [watch, setValue, slugTransform]);
    
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title : "
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug : "
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RTE
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    type="file"
                    label="Featured Image: "
                    className="mb-4"
                    accept="image/jpeg image/jpg image/gif image/png"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteStorageService.getFilePreview(
                                post.featuredImage
                            )}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    label="Status: "
                    options={["active", "inactive"]}
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-700" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Post"}
                </Button>
            </div>
        </form>
    );
}
