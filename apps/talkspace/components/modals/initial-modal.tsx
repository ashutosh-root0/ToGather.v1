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
import { useEffect, useState } from "react";
import { FileUpload } from "../file-upload";

const formSchema = z.object({
    name: z.string().min(1, { 
        message: "Server name is required"
    }),
    image:  z.string().min(1, {
        message: "Server image is required"
    })
});

export const InitialModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: ""
        }
    })
    
    const isLoading = form.formState.isSubmitting;
    
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    if(!isMounted) {
        return null;
    }

    return (
        <Dialog open>
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
                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                        placeholder="Enter server name"
                                    />
                                    
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <DialogFooter className="bg-gray-100 px-6 py-4">
                        <Button variant="primary" disabled={isLoading}>
                            Create
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>         
    )
}