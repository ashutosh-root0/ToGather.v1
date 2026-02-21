"use client"

import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

interface ItemProps{
    id : string;
    name : string;
    imageUrl : string;
}

export const Item = ({id, name, imageUrl} : ItemProps) => {
    
    const organization: any[] = [];
    const setActive: any[] = [];

    const isActive = organization?.id === id ;
    const onClick = () => {
        if (!setActive) return ;

        setActive({organization: id});
    };
    return (
        <div className="aspect-square relative">
            <Image
             fill
             src={imageUrl}
             alt={name}
             onClick={onClick}
            //  Dynamic Styling 
             className={cn("rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                isActive && "opacity-100"
             )}
             />
            <p>{name}</p>
        </div>
    )
}
