import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface DeleteMovieProps {
  onClose: () => void;
  movie: { id: string };
}

function DeleteMovie({ onClose, movie }: DeleteMovieProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const deleteMovie = async () => {
    try {
      const response = await axios.delete("/api/animeDelete", {
        data: { id: movie.id },
        
      });

      await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });

      console.log(response.data);
      // Redirect to another page
      await router.push("/");
      // Reload the window
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 ">
    //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //     <div className="flex flex-col items-center space-y-4 bg-slate-100 p-8 rounded w-1/4 h-auto max-w-3xl ">
    //       <div className="flex justify-between items-center w-full">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-6 h-6 cursor-pointer"
    //           onClick={onClose}
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M6 18 18 6M6 6l12 12"
    //           />
    //         </svg>
    //       </div>
    //       <p> {t("Are you sure you want to delete this anime?")}</p>
    //p-2 bg-red-500 text-white rounded w-56 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105
          <button
            onClick={deleteMovie}
            className=""
          >
            {t("Delete anime")}
          </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default DeleteMovie;
