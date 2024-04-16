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
          "This anime has been added successfully":
            "This anime has been added successfully",
          "This anime has been edited successfully":
            "This anime has been edited successfully",
          "This anime has been removed from your completed list":
            "This anime has been removed from your Completed list",
          "This anime has been added to your completed list":
            "This anime has been added to your Completed list",
          "This anime has been removed from favorites":
            "This anime has been removed from Favorites",
          "This anime has been added to favorites":
            "This anime has been added to Favorites",
          "This anime has been removed from your library list":
            "This anime has been removed from your Library list",
          "This anime has been added to your library":
            "This anime has been added to your Library list",
          "This anime has been removed from your watching list":
            "This anime has been removed from your Watching list",
          "This anime has been added to your watching list":
            "This anime has been added to your Watching list",
          "This anime has been removed from your want to watch list":
            "This anime has been removed from your Want to watch list",
          "This anime has been added to your want to watch list":
            "This anime has been added to your Want to watch list",
          "Wrong email or password": "Wrong email or password",
          "All": "All",
          "Are you sure?": "Are you sure?",
          "You won't be able to revert this!" : "You won't be able to revert this!",
          "Yes, delete it!" : "Yes, delete it!",
          "No, cancel!" : "No, cancel!",
          "Deleted!" : "Deleted!",
          "Your anime has been deleted." : "Your anime has been deleted.",
          "Cancelled": "Cancelled",
          "Your anime is safe :)" : "Your anime is safe :)",
          "Edit Anime": "Edit Anime",
          "Contact us": "Contact us",
          "Log in": "Log in",
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
            "Потопи се в света на аниметa с MyAnimeZone!",
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
          "This anime has been added successfully":
            "Анимето беше добавено успешно",
          "This anime has been edited successfully":
            "Анимето беше редактирано успешно",
          "This anime has been removed from your completed list":
            "Анимето беше премахнато от Завършени",
          "This anime has been added to your completed list":
            "Анимето беше добавено към Завършени",
          "This anime has been removed from favorites":
            "Анимето беше премахнато от Любими",
          "This anime has been added to favorites":
            "Анимето беше добавено към Любими",
          "This anime has been removed from your library list":
            "Анимето беше премахнато от Библиотеката",
          "This anime has been added to your library":
            "Анимето беше добавено към Библиотеката",
          "This anime has been removed from your watching list":
            "Анимето беше премахнато от В момента гледам",
          "This anime has been added to your watching list":
            "Анимето беше добавено към В момента гледам",
          "This anime has been removed from your want to watch list":
            "Анимето беше премахнато от За гледане",
          "This anime has been added to your want to watch list":
            "Анимето беше добавено към За гледане",
          "Wrong email or password": "Грешен имейл или парола",
          "All": "Всички",
          "Are you sure?": "Сигурни ли сте?",
          "You won't be able to revert this!" : "Анимето ще въде изтрито за винаги!",
          "Yes, delete it!" : "Да, изтрий го!",
          "No, cancel!" : "Не, отмени!",
          "Deleted!" : "Изтрито!",
          "Your anime has been deleted." : "Анимето беше изтрито.",
          "Cancelled": "Отменено",
          "Your anime is safe :)" : "Анимето е в безопасност :)",
          "Edit Anime": "Редактирай анимето",
          "Contact us": "Свържете се с нас",
          "Log in": "Влез в акаунта си",


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
