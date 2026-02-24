import { InitialModal } from "@/components/modals/initial-modal";
import { ModeToggle } from "@/components/mode-toggle";
import { initialProfile } from "@/lib/initial-profile";
import { prisma } from "@workspace/database";
import { redirect } from "next/navigation";
export const SetupPage = async ()=>{

    const profile = await initialProfile();
    const server = await prisma.server.findFirst({
        where: {
            members: {
                some: {
                    userId: profile.id
                }
            }
        }
    });

    if(server){
        return redirect(`/servers/${server.id}`);
    }
    return (
        <div>
            <div> <InitialModal/> </div>
            {/* <ModeToggle/> */}
        </div>
    )
}

export default SetupPage;