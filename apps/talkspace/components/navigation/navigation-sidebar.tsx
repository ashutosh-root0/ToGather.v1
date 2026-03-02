import { currentProfile } from "@/lib/current-profile"
import { prisma } from "@workspace/database";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";

export const NavigationSidebar = async() =>{

    const profile = await currentProfile();

    if(!profile){
        return redirect("/");
    }

    const servers = await prisma.server.findMany({
        where: {
            members: {
                some:{
                    userId: profile.id
                }
            }
        }
    })
    return(
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
            <NavigationAction/>
        </div>
    )
}