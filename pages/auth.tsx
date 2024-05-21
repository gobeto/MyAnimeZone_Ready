import Input from "@/components/InputLogIn";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [variant, setVariant] = useState("login");

  const { t } = useTranslation();

  // Toggle between login and register variants
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant == "login" ? "register" : "login"
    );
  }, []);

  // Handle user login
  const login = useCallback(async () => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        setErrorMessage("Account does not exist");
        Swal.fire({
          position: "center",
          icon: "error",
          title: t("Wrong email or password"),
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred");
    }
  }, [email, password, router]);

  // Handle user registration
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/sao-background2.png')] bg-no-repeat bg-conter bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-2">
        </nav>
        <div className="flex justify-center mt-20">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-conter mt-2 lg:w-2/5 lg:max-w-md rounded-md w-96">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant == "login" ? t("Sign in") : t("Register")}
            </h2>
            <div className="flex flex-col gap-4">
              {variant == "register" && (
                <Input
                  label={t("Username")}
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label={t("Email")}
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label={t("Password")}
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant == "login" ? login : register}
              className="bg-slate-500 py-3 text-white rounded-md w-full mt-10 hover:bg-slate-700 transition"
            >
              {variant == "login" ? t("Login") : t("Sign up")}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant == "login"
                ? t("First time using MyAnimeZone?")
                : t("Already have an account?")}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant == "login" ? t("Create account") : t("Login")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;