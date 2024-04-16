import useCurrentUser from "@/hooks/useCurrentUser";
import { useCallback } from 'react'; // Import useCallback hook
import { GetSessionParams, signOut, getSession } from "next-auth/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/router';

interface AccountMenuProps {
  visible?: boolean;
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);

  return {
    props: {
      user: session?.user || null,
    },
  };
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser();
  const session = data; // Assuming session data is fetched via useCurrentUser hook
  const { t } = useTranslation();
  const router = useRouter(); // Use the router for navigation

  // useCallback for signOut function
  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  // useCallback for redirecting to the auth page
  const handleSignIn = useCallback(() => {
    router.push('/auth');
  }, [router]);

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex z-50">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 item center w-full">
          <img
            className="w-8 rounded-md"
            src="/images/logoOni.png"
            alt=""
          />
          <p className="text-white text-sm group-hover/item:underline">
            {session?.name || t("Guest")}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        {session ? (
          <div
            onClick={handleSignOut}
            className="px-3 text-center text-white text-sm hover:underline"
          >
            {t("Sign out")}
          </div>
        ) : (
          <div
            onClick={handleSignIn}
            className="px-3 text-center text-white text-sm hover:underline"
          >
            {t("Log in")}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountMenu;
