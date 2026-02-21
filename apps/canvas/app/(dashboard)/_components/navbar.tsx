"use-client";

export const Navbar = () => {
    return (
        <div className="flex items-center gap-x-4 p-5 bg-green-500">
            Navbar
            <div className="hidden lg:flex lg:flex-1 bg-yellow-500">
                {/* TODODO Add Search Button */}
                Search
            </div>
            <div>
                {/* Add user Profile Button  */}
            </div>
        </div>
    );
};