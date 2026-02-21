import { NewButton } from "./NewButton"

export const Sidebar = () =>{
    return (
        <aside className="fixed z-[1] left-0 top-0 h-full w-[60px] bg-blue-500 flex p-3 flex-col gap-y-4 text-white">
            Side
            <NewButton/>
        </aside>
    )
}