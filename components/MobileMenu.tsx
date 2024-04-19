import { useEffect, useState } from "react";
import Link from "next/link";
import NavbarItem from "./NavbarItem";
import AnimeAddForm from "./AnimeAddForm";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { t } = useTranslation();

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
            <NavbarItem label={t("Home")} />
          </Link>
        </div>
        


        <div className=" px-3 text-center text-white hover:underline">
          <Link href="/library">
            <NavbarItem label={t("Library")} />
          </Link>
        </div>

        
      </div>
    </div>
  );
};
export default MobileMenu;