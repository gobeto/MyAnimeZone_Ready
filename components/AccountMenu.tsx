import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";

import React from "react";
import { useTranslation } from "react-i18next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { GetSessionParams, signOut as signOutNextAuth } from "next-auth/react";



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
  const { t } = useTranslation();
  const router = useRouter();
  const { status } = useSession();

  //const handleSignOut = async (p0: { callbackUrl: string; }) => {
   // await signOut();
  //   setTimeout(() => router.push('/auth'), 1000); // wait for 1 second before redirecting
  //}
  // const signOut = async () => {
  //   await signOutNextAuth();
  //   setTimeout(() => router.push('/auth'), 1000); // wait for 1 second before redirecting
  // }


  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status]);

  const signOut = async () => {
    await signOutNextAuth();
  }

  if (!visible) {
    return null;
  }

  return (
    <div className=" bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex z-50 ">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 item center w-full">
          <img
            className="w-8 rounded-md"
            src="/images/logoOni.png"
            alt=""
          />
          <p className="text-white text-sm group-hover/item:underline">
            {data?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
         onClick={signOut}
          //onClick={() => handleSignOut({ callbackUrl: '/auth' })}
          //onClick={handleSignOut}

          className="px-3 text-center text-white text-sm hover:underline"
        >
          {t("Sign out")}
        </div>
      </div>
    </div>
  );
};
export default AccountMenu;