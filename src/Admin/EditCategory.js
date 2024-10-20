import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import './AdminCss/EditCategory.css';

const EditCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // State để lưu trữ ID của thể loại được chọn
  const [updateStatus, setUpdateStatus] = useState(null); // State để lưu trữ trạng thái cập nhật

  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/categories");
  
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
  
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchCategories();
  }, []);

  useEffect(() => {
    // Set selected category ID when categoryId changes
    setSelectedCategoryId(categoryId);
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if selectedCategoryId is valid
      if (!selectedCategoryId || isNaN(selectedCategoryId)) {
        throw new Error("Invalid category ID");
      }
  
      const response = await fetch(`http://localhost:4000/api/categories/${selectedCategoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const data = await response.json();
      if (data.error) {
        setUpdateStatus({ success: false, message: data.error });
      } else {
        setUpdateStatus({ success: true, message: "Category updated successfully" });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setUpdateStatus({ success: false, message: "Error updating category" });
    }
  };

  return (
    <div>
      <AdminHeader />
      <h2>Edit Category</h2>
      {updateStatus && (
        <div style={{ color: updateStatus.success ? "green" : "red" }}>
          {updateStatus.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            className="lb_edit"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="lbb">Select Category:</label>
          <select className="sl"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)} // Update selectedCategoryId when the selection changes
          >
            <option value="">-- Select Category --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <button className="btn_edit" type="submit">Update Category</button>
      </form>
    </div>
  );
};

export default EditCategory;
