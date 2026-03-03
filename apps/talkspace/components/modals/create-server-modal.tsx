"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
    Field,
    FieldLabel,
    FieldError
} from "@workspace/ui/components/field";

import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { FileUpload } from "../file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
    name: z.string().min(1, { 
        message: "Server name is required"
    }),
    image:  z.string().min(1, {
        message: "Server image is required"
    })
});

export const CreateServerModal = () => {

    const {isOpen, onClose, type} = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "createServer";


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: ""
        }
    })
    
    const isLoading = form.formState.isSubmitting;
    
    const onSubmit = async(values: z.infer<typeof formSchema>) => {

        try {
            await axios.post("/api/servers", values);
            form.reset();
            router.refresh();
            onClose();
        }
        catch (error) {
            console.error(error);
        }
        console.log(values);
    }

    const handleClose = ()=>{
        form.reset();
        onClose();
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize Your Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your server a personality with a name and an image. You can always change these later.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-8 px-6">
                        <div className="flex items-center justify-center text-center">
                            <Controller
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FileUpload
                                        endpoint="serverImage"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                        
                        <Controller
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel 
                                        htmlFor={field.name}
                                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                    >
                                        Server Name
                                    </FieldLabel>
                                    
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        disabled={isLoading}
                                        className="bg-zinc-100/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                        placeholder="Enter server name"
                                    />
                                    
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <DialogFooter className="bg-gray-100 px-6 py-6">
                        <Button variant="primary" disabled={isLoading}>
                            Create
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>         
    )
}