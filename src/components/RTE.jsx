import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller } from "react-hook-form";

export default function RTE({ name, label, control, defaultvalue = "" }) {
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey="s3j4ghthjoslc7q6ykx0t3vokrkh9yfejc9wsznetbbcfdj7"
                        initialValue={defaultvalue}
                        init={{
                            height: 500,
                            branding: false,
                            menubar: true,
                            plugins: [
                                "advlists",
                                "anchor",
                                "autolink",
                                "autosave",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "print",
                                "preview",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "paste",
                                "code",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | bold italic backcolor blockquote |  alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help",
                            content_style: "body {fontsize: 14px}"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            ></Controller>
        </div>
    );
}
