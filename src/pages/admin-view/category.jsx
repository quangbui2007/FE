import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory } from "./categorySlice";
import CategoryForm from "./CategoryForm";

export default function CategoryPage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc chắn muốn xoá?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Quản lý Danh mục</h1>
      <CategoryForm />

      <div className="mt-6">
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <ul className="space-y-2">
            {list.map((cat) => (
              <li
                key={cat.id}
                className="flex justify-between border p-3 rounded"
              >
                <span>{cat.name}</span>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-red-500 hover:underline"
                >
                  Xoá
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
