import { currentProfile } from "@/lib/current-profile"
import { prisma } from "@workspace/database";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";

import {Separator} from "@workspace/ui/components/separator"
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";

export const NavigationSidebar = async() =>{

    const profile = await currentProfile();

    if(!profile){
        console.log("No Profile")
        return redirect("/auth/sign-in");
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
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#e3e5e8] py-3">
            <NavigationAction/>
            <Separator 
            className= "h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id={server.id}
                            imageUrl={server.imageUrl}
                            name={server.name}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className= "pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle/>
                {/* TODODO Add Use Button here <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]"
            }
          }}
        />*/}
            </div>
        </div>
    )   
}