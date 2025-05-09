import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "./categorySlice";

export default function CategoryForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(addCategory(name));
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Tên danh mục..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Thêm
      </button>
    </form>
  );
}
