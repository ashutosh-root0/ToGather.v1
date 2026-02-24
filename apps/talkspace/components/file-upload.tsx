"use client";
import { UploadDropzone } from "../lib/uploadthing";
import "@uploadthing/react/styles.css"
import Image from "next/image";

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
            <div className="realtive h-20 w-20" >
                <Image 
                src={value} 
                alt="Uploaded file" 
                fill 
                className="rounded-full"
                />
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