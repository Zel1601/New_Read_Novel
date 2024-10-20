import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import "./AdminCss/AddCategory.css"; // Import CSS file

const AddCategory = () => {
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error("Failed to add category");
      }
      setSuccessMessage("Category added successfully");
      setName(""); // Clear the input field
    } catch (error) {
      console.error("Error adding category:", error);
      setErrorMessage("Failed to add category");
    }
  };

  return (
    <div><AdminHeader />
    <div className="container">
      <h2>Add Category</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="name">Name:</label>
          <input
            id="name"
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">Add Category</button>
      </form>
    </div>
    </div>
  );
};

export default AddCategory;
