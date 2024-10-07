import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (!query || query.trim() === "") return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <input
        placeholder="search"
        className="w-full px-4 py-2 border bg-transparent border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="ml-2 px-4 py-2 bg-transparent border border-solid border-gray-400 text-black dark:text-white rounded-md focus:outline-none focus:outline-2 flex items-center justify-center"
        onClick={handleSearch}
      >
        <FiSearch size={24} />
      </button>
    </div>
  );
}
