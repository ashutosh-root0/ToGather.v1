import {v4 as uuidv4} from "uuid"
import { currentProfile } from "@/lib/current-profile";
import {prisma} from "@workspace/database";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{

        const {name, image: imageUrl} = await req.json();
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unauthorized", {status: 401});
        }



    const server = await prisma.server.create({
        data: {
            userId : profile.id,
            name,
            imageUrl,
            inviteCode : uuidv4(),
            channels: {
                create: [
                    {
                        name: "general",
                        userId: profile.id
                    }
                ]
            },
            members: {
                create: [
                    {
                        userId: profile.id
                    }
                ]
            }
        }
    });
    return NextResponse.json(server);
    }
    catch(error){
        console.log("[SERVERS_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}
