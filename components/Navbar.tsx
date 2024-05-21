import { useCallback, useEffect, useState } from "react";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Link from "next/link";

import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import AccountMenu from "./AccountMenu";
import AnimeAddForm from "./AnimeAddForm";
import LanguageSwitcher from "./LanguageSwitcher";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  const { t } = useTranslation();

  const [isAdmin, setIsAdmin] = useState(false);

  // fetch current user data and check if admin
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

  // Effect hook to handle scroll event and toggle navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  // Function to toggle account menu visibility
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full  z-40">
      <div
        className={`
            px-4
            md:px-26
            py-4
            flex
            flex-row
            items-center
            transition
            duration-500
            bg-slate-500
            ${showBackground ? "bg-slate-500 bg-opacity-100" : ""}
            `}
      >
        <img className="h-10 lg:h-20  " src="/images/WebSiteLogo.png" alt="Logo" />
        <div
          className="
                flex-row
                ml-8
                gap-7
                hidden
                lg:flex
                "
        >
          <Link href="/">
            <NavbarItem label={t("Home")} />
          </Link>

          

          {/* check if the isAdmin is true and if it is visualise button */}
          {isAdmin && (
            <NavbarItem
              label={t("Add anime")}
              onClick={() => setShowAddMovieForm(!showAddMovieForm)}
            />
          )}
          {showAddMovieForm && (
            <AnimeAddForm onClose={() => setShowAddMovieForm(false)} />
          )}
          <Link href="/library">
            <NavbarItem label={t("Library")} />
          </Link>
        </div>

        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">{t("Menu")}</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        {/* lqva chast */}
        <div className="flex flex-row ml-auto gap-7 items-center">
        <LanguageSwitcher />
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            
              <div className="w-10 h-10 lg:w-10 lg:h-10 rounded-md overflow-hidden relative">
                <img src="/images/logoOni.png" alt="" />
              </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
