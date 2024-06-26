import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-500 text-white p-4 mt-10 text-center">
      <p>{t("Explore Your Anime Universe with MyAnimeZone!")}</p>
      <div className="flex items-center justify-center gap-1 text-white">
        <a
          href="https://www.instagram.com/myanimezone7/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            fill="#ffffff"
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="flex items-center justify-center hover:text-neutral-300 cursor-pointer transition-all duration-300 ease-in-out mt-1 mb-1 "
          >
            <path
              fillRule="evenodd"
              d="M8,2 L16,2 C19.3137085,2 22,4.6862915 22,8 L22,16 C22,19.3137085 19.3137085,22 16,22 L8,22 C4.6862915,22 2,19.3137085 2,16 L2,8 C2,4.6862915 4.6862915,2 8,2 Z M8,4 C5.790861,4 4,5.790861 4,8 L4,16 C4,18.209139 5.790861,20 8,20 L16,20 C18.209139,20 20,18.209139 20,16 L20,8 C20,5.790861 18.209139,4 16,4 L8,4 Z M12,17 C9.23857625,17 7,14.7614237 7,12 C7,9.23857625 9.23857625,7 12,7 C14.7614237,7 17,9.23857625 17,12 C17,14.7614237 14.7614237,17 12,17 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z M17,8 C16.4477153,8 16,7.55228475 16,7 C16,6.44771525 16.4477153,6 17,6 C17.5522847,6 18,6.44771525 18,7 C18,7.55228475 17.5522847,8 17,8 Z"
            />
          </svg>
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61558387469585"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            fill="#ffffff"
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            className="flex items-center justify-center  hover:text-neutral-300 cursor-pointer transition-all duration-300 ease-in-out mt-1 mb-1"
          >
            <path d="M20.9,2H3.1A1.1,1.1,0,0,0,2,3.1V20.9A1.1,1.1,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H17.3c-1.26,0-1.5.6-1.5,1.47v1.93h3l-.39,3H15.8V22h5.1A1.1,1.1,0,0,0,22,20.9V3.1A1.1,1.1,0,0,0,20.9,2Z" />
          </svg>
        </a>
      </div>
      <p>
        {t("Contact us")}: <u>myanimezone@abv.bg</u>  <br />
        &copy; {new Date().getFullYear()} MyAnimeZone.{" "}
        {t("All rights reserved")}
      </p>
    </footer>
  );
};

export default Footer;
