"use client"
import { Plus } from "lucide-react"

import{
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogHeader
} from "@workspace/ui/components/dialog"

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transistion">
                        <Plus className="text-white" />
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Organization</DialogTitle>
                </DialogHeader> 
            </DialogContent>
        </Dialog>
    )
}
