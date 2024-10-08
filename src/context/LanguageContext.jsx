import { createContext, useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    i18n.changeLanguage(language).catch((err) => console.error(err));
  }, [language]);

  const changeLanguage = (lng) => {
    i18n
      .changeLanguage(lng)
      .then(() => {
        localStorage.setItem("language", lng);
        setLanguage(lng);
      })
      .catch((err) => console.error(err));
  };

  return (
    <LanguageContext.Provider value={{ t, changeLanguage, language }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
