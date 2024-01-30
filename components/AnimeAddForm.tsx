import React, { useState } from 'react';
import axios from 'axios';

interface AddMovieProps {
  onClose: () => void;
}

function AddMovie({ onClose }: AddMovieProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnaiUrl, setThumbnailUrl] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!title || !description || !videoUrl || !thumbnaiUrl || !genre || !duration) {
      alert('Please fill out all fields');
      return;
    }
  
    const movie = { title, description, videoUrl, thumbnaiUrl, genre, duration };
    try {
      await axios.post('/api/animeAdd', movie);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 " >
      {/* bg-[url('/images/SAOcastle.png')] bg-auto bg-center bg-no-repeat */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-slate-100 p-8 rounded w-3/4 h-auto max-w-3xl ">
         
          <div className="flex justify-between items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={onClose}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /> 
            </svg>
            <p className="font-bold text-2xl text-center flex-grow">Add new anime</p>
          </div>
          <div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded w-full" required pattern=".{3,}" title="3 characters minimum" />
          </div>
          <div>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="p-2 border rounded w-full" required maxLength={1000} rows={2}/>
            <p className="text-right">{description.length}/1000</p>
          </div>
          <div>
            <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Video URL" className="p-2 border rounded w-full" required pattern="https?://.+" title="Must be a valid URL" />
          </div>
          <div>
            <input type="text" value={thumbnaiUrl} onChange={(e) => setThumbnailUrl(e.target.value)} placeholder="Image URL" className="p-2 border rounded w-full" required pattern="https?://.+" title="Must be a valid URL" />
          </div>
          <div>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genres" className="p-2 border rounded w-full" required pattern=".{3,}" title="3 characters minimum" />
          </div>
          <div>
            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration ( episodes )" className="p-2 border rounded w-full" required pattern="\d+" title="Must be a number" />
          </div>
          <div>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">Add Anime</button>
          </div>
          {/* <div>
            <button type="button" onClick={onClose} className="p-2 bg-red-500 text-white rounded w-full">Cancel</button>
          </div> */}
        </form>
      </div>
    </div>
    
  );
}

export default AddMovie;