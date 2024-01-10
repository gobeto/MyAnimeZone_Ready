import React from "react";


//different menus in navbar
interface NavbarItemProps{
    label:string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    label
})=>{
    return(
        <div className="text-white cursor-pointer hover:text-gray transition">
           {label}
        </div>
    )
}
export default NavbarItem