"use client"

import Sidebar from "@/layouts/SideBar/SideBar";

const layout = ({children}) => {

    return(
        <div className="flex p-3">
            <Sidebar />

            <main className="flex w-full px-10">{children}</main>
        </div>
    );
}

export default layout;