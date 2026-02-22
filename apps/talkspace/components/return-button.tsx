import { Button } from "@workspace/ui/components/button"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

interface ReturbButtonProps{
    href: string;
    label: string;
}
export const ReturnButton = ({href, label}: ReturbButtonProps) =>{
    return(
        <Button size="sm" asChild>
            <Link href={href}>
            <ArrowLeftIcon/>{label}
            </Link>
        </Button>
    )
}