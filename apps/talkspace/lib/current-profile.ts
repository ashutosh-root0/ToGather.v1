// Utility to check current profile
import { auth } from "@workspace/auth/auth";
import {prisma} from "@workspace/database"


export const currentProfile = async(req: Request)=>{
    const session = await auth.api.getSession({
    headers: req.headers,
  });

    const userId = session?.user.id

    if(!userId){
        return null;
    }

    const profile = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    
    return profile;
} 