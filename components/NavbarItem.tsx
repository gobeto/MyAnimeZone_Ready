import React from "react";

// In this code, NavbarItemProps is an interface that describes the props of the NavbarItem component. 
// It has a label property and an optional onClick property. The onClick prop is then passed to the div element's onClick attribute.


//different menus in navbar
interface NavbarItemProps{
    label:string;
    onClick?: () => void; // Add this line
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, onClick }) => {
    return (
      <div className="text-white cursor-pointer hover:text-gray transition font-black" onClick={onClick}>
        {label}
      </div>
    );
}
export default NavbarItem