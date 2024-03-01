import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "Add anime": "Add anime",
          Menu: "Menu",
          Home: "Home",
          Library: "Library",
          "Sign out": "Sign out",
          "Add new anime": "Add new anime",
          Title: "Title",
          Description: "Description",
          "Video URL": "Video URL",
          "Image URL (vertical)": "Image URL (vertical)",
          "Poster URl (horizontal)": "Poster URl (horizontal)",
          Genres: "Genres",
          Duration: "Duration (episodes)",
          Info: "Info",
          Trailer: "Trailer",
          Episodes: "Episodes",
          "Edit anime": "Edit anime",
          Edit: "Edit",
          "Delete anime": "Delete anime",
          "Are you sure you want to delete this anime?":
            "Are you sure you want to delete this anime?",
          Delete: "Delete",
          Favorite: "Favorite",
          Watching: "Watching",
          "Want to watch": "Want to watch",
          Completed: "Completed",
          "Search in your library": "Search in your library",
          "Explore Your Anime Universe with MyAnimeZone!":
            "Explore Your Anime Universe with MyAnimeZone!",
          "All Animes": "All animes",
          "All rights reserved": "All rights reserved.",
          "Sign in": "Sign in",
          Register: "Register",
          "Switch Language": "Превключи на български",
          Email: "Email",
          Password: "Password",
          Username: "Username",
          "First time using MyAnimeZone?": "First time using MyAnimeZone?",
          "Create acount": "Create acount",
          Login: "Login",
          "Sign up": "Sign up",
          "Already have an account?": "Already have an account?",
          "Create account": "Create account",
        },
      },
      bg: {
        translation: {
          "Add anime": "Добави аниме",
          Menu: "Меню",
          Home: "Начало",
          Library: "Библиотека",
          "Sign out": "Изход",
          "Add new anime": "Добави ново аниме",
          Title: "Заглавие",
          Description: "Описание",
          "Video URL": "Видео URL",
          "Image URL (vertical)": "Изображение URL (вертикално)",
          "Poster URl (horizontal)": "Постер URL (хоризонтално)",
          Genres: "Жанрове",
          Duration: "Продължителност (епизоди)",
          Info: "Към анимето",
          Trailer: "Трейлър",
          Episodes: "Епизоди",
          "Edit anime": "Редактирай анимето",
          Edit: "Редактирай",
          "Delete anime": "Изтрий анимето",
          "Are you sure you want to delete this anime?":
            "Сигурни ли сте, че искате да изтриете това аниме?",
          Delete: "Изтрий",
          Favorite: "Любими",
          Watching: "В момента гледам",
          "Want to watch": "За гледане",
          Completed: "Завършени",
          "Search in your library": "Търси в библиотеката си",
          "Explore Your Anime Universe with MyAnimeZone!":
            "Потопи се в света на анимето с MyAnimeZone!",
          "All Animes": "Всички анимета",
          "All rights reserved": "Всички права запазени.",
          "Sign in": "Влез",
          Register: "Регистрирай се",
          "Switch Language": "Превключи на английски",
          Email: "Имейл",
          Password: "Парола",
          Username: "Потребителско име",
          "First time using MyAnimeZone?": "За първи път в MyAnimeZone?",
          "Create acount": "Създай акаунт",
          Login: "Влез в акаунта си",
          "Sign up": "Регистрирай се",
          "Already have an account?": "Вече имаш акаунт?",
          "Create account": "Създай акаунт",
        },
      },
      //...other languages...
    },
    lng: "bg", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
