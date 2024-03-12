import { useEffect, useState } from "react";
import Link from "next/link";
import NavbarItem from "./NavbarItem";
import AnimeAddForm from "./AnimeAddForm";
import axios from "axios";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get("/api/current")
      .then((response) => {
        setIsAdmin(response.data.isAdmin);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex z-50 ">
      <div className="flex flex-col gap-4">
        <div className=" px-3 text-center text-white hover:underline">
          <Link href="/">
            <NavbarItem label="Home" />
          </Link>
        </div>

        <div className=" px-3 text-center text-white hover:underline">
            {/* check if the isAdmin is true and if it is visualise button */}
            {isAdmin && (
              <NavbarItem
                label="Add Anime"
                onClick={() => setShowAddMovieForm(!showAddMovieForm)}
              />
            )}
            {showAddMovieForm && (
              <AnimeAddForm onClose={() => setShowAddMovieForm(false)} />
            )}
          </div>

        <div className=" px-3 text-center text-white hover:underline">
          <Link href="/library">
            <NavbarItem label="My Library" />
          </Link>
        </div>

        
      </div>
    </div>
  );
};
export default MobileMenu;