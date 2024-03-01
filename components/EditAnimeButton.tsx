import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface AddMovieProps {
  onClose: () => void;
  movie: {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnaiUrl: string;
    posterUrl: string;
    genre: string;
    duration: string;
  };
}

function AddMovie({ onClose, movie }: AddMovieProps) {
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [videoUrl, setVideoUrl] = useState(movie.videoUrl);
  const [thumbnaiUrl, setThumbnailUrl] = useState(movie.thumbnaiUrl);
  const [posterUrl, setPosterUrl] = useState(movie.posterUrl);
  const [genre, setGenre] = useState(movie.genre);
  const [duration, setDuration] = useState(movie.duration);
  const [id, setId] = useState(movie.id);

  const { t } = useTranslation();
  const handleEdit = async () => {
    const updatedMovie = {
      id,
      title,
      description,
      videoUrl,
      thumbnaiUrl,
      posterUrl,
      genre,
      duration,
    };
    try {
      await axios.put("/api/animeEdit", updatedMovie);
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "This anime has been edited successfully",
        showConfirmButton: false,
        timer: 1500
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 ">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
          }}
          className="flex flex-col space-y-4 bg-slate-100 p-8 rounded w-3/4 h-auto max-w-3xl "
        >
          <div className="flex justify-between items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={onClose}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <p className="font-bold text-2xl text-center flex-grow">
              {t("Edit anime")}
            </p>
          </div>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={movie?.title}
              className="p-2 border rounded w-full"
              required
              pattern=".{3,}"
              title="3 characters minimum"
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={movie?.description}
              className="p-2 border rounded w-full"
              required
              maxLength={1000}
              rows={5}
            />
            <p className="text-right">{description.length}/1000</p>
          </div>
          <div>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder={movie?.videoUrl}
              className="p-2 border rounded w-full"
              required
              pattern="https?://.+"
              title="Must be a valid URL"
            />
          </div>
          <div>
            <input
              type="text"
              value={thumbnaiUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder={movie?.thumbnaiUrl}
              className="p-2 border rounded w-full"
              required
              pattern="https?://.+"
              title="Must be a valid URL"
            />
          </div>
          <div>
            <input
              type="text"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              placeholder={movie?.posterUrl}
              className="p-2 border rounded w-full"
              required
              pattern="https?://.+"
              title="Must be a valid URL"
            />
          </div>
          <div>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder={movie?.genre}
              className="p-2 border rounded w-full"
              required
              pattern=".{3,}"
              title="3 characters minimum"
            />
          </div>
          <div>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder={movie?.duration}
              className="p-2 border rounded w-full"
              required
              pattern="\d+"
              title="Must be a number"
            />
          </div>
          <div>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Edit Anime
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
