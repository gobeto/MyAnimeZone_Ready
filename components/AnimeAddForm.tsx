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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white p-8 rounded">
        <div>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded w-full" />
        </div>
        <div>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="p-2 border rounded w-full" />
        </div>
        <div>
          <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Video URL" className="p-2 border rounded w-full" />
        </div>
        <div>
          <input type="text" value={thumbnaiUrl} onChange={(e) => setThumbnailUrl(e.target.value)} placeholder="Image URL" className="p-2 border rounded w-full" />
        </div>
        <div>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genres" className="p-2 border rounded w-full" />
        </div>
        <div>
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" className="p-2 border rounded w-full" />
        </div>
        <div>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">Add Anime</button>
        </div>
        <div>
          <button type="button" onClick={onClose} className="p-2 bg-red-500 text-white rounded w-full">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddMovie;