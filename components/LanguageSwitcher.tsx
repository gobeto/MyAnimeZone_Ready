import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  // const switchLanguage = () => {
  //   i18n.language === "en"
  //     ? i18n.changeLanguage("bg")
  //     : i18n.changeLanguage("en");
  // };

  const switchLanguage = () => {
    const newLang = i18n.language === 'en' ? 'bg' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    // <button onClick={switchLanguage}>
    //   {t("Switch Language")}
    // </button>
    <div>
      <label className="flex items-center relative w-max cursor-pointer select-none">
        <input
          type="checkbox"
          className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-slate-500 border-2 "
          onClick={switchLanguage}
        />
        <span className="absolute font-medium text-xs uppercase right-1 text-white ">
          BG
        </span>
        <span className="absolute font-medium text-xs uppercase right-8 text-white ">
          EN
        </span>
        <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
      </label>
    </div>
  );
}

export default LanguageSwitcher;
