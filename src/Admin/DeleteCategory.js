import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import './AdminCss/DeleteCategory.css';

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/categories/${selectedCategoryId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div>
      <AdminHeader />
      <h2>Delete Category</h2>
      <div>
        <label>Select Category:</label>
        <select className="sl_dl" value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
          <option value="">-- Select Category --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn" onClick={handleDelete}>Delete Category</button>
      {deleteSuccess && <p>Category deleted successfully.</p>}
    </div>
  );
};

export default DeleteCategory;
