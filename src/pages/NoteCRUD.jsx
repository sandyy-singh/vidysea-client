import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://vidysea-server.onrender.com/api/note"; // ✅ fixed endpoint (plural)

const NoteCRUD = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({  title: "", description: "" });
  const [editId, setEditId] = useState(null);


  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL,{withCredentials:true});
      
      setNotes(res.data.data || []);
    } catch (error) {
      console.error("Error fetching voters:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form)
    try {
      let res;
      if (editId) {
        res = await axios.put(`${API_URL}/${editId}`, form,{withCredentials:true});
      } else {
        res = await axios.post(API_URL, form,{withCredentials:true});
      }
      if (res?.data?.message) {
        alert(res.data.message);
      } else {
        alert("Operation successful!");
      }
      setForm({  title: "", description: "" });
      setEditId(null);
      fetchNotes();
    } catch (error) {
      console.error("Error saving voter:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };
  // 🟢 Edit voter
  const handleEdit = (note) => {
    setForm({ title: note.title, description: note.description });
    setEditId(note._id);
  };

  // 🟢 Delete voter
  const handleDelete = async (id) => {
    try {
   const res=   await axios.delete(`${API_URL}/${id}`,{withCredentials:true});
   alert(res.data.message)
      fetchNotes();
    } catch (error) {
      console.error("Error deleting voter:", error);
    }
  };
  // onchange

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ width: "80%", margin: "50px auto", textAlign: "center" }}>
      <h2>🗳️ NOTE CRUD (MERN)</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          placeholder="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.length > 0 ? (
            notes.map((v) => (
              <tr key={v._id}>
                <td>{v.title}</td>
                <td>{v.description}</td>
               
                <td>
                  <button onClick={() => handleEdit(v)}>✏️ Edit</button>{" "}
                  <button
                    onClick={() => handleDelete(v._id)}
                    style={{ color: "red" }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Notes Not found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NoteCRUD;
