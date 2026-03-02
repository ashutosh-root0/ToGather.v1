"use client";
import { UploadDropzone } from "../lib/uploadthing";
import "@uploadthing/react/styles.css"
import Image from "next/image";
import { X } from "lucide-react";

interface FileUploadProps{
    endpoint: "messageFile" | "serverImage";
    onChange: (url: string) => void;
    value: string;
}

export const FileUpload = ({
    endpoint,
    onChange,
    value
}: FileUploadProps) => {

    const fileType = value?.split(".").pop();
    if(value && fileType !== "pdf"){
        return (
            <div className="relative h-20 w-20" >
                <Image 
                src={value} 
                alt="Uploaded file" 
                fill 
                className="rounded-full"
                />
                <button
                onClick={()=> onChange("")}
                className="absolute top-0 right-0 bg-rose-500 text-white p-1 rounded-full shadow-sm" type="button">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    return (
        <UploadDropzone
        endpoint = {endpoint}
        onClientUploadComplete = {(res)=>{
            onChange(res?.[0].ufsUrl);
        }}
        onUploadError = {(error: Error)=>console.log(error)}
        />
    )
}