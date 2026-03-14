import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Admin = () => {
  const [poems, setPoems] = useState([]);

  const loadPoems = async () => {
    const querySnapshot = await getDocs(collection(db, "poems"));
    const poemsArray = [];

    querySnapshot.forEach((d) => {
      poemsArray.push({ id: d.id, ...d.data() });
    });

    setPoems(poemsArray);
  };

  const deletePoem = async (id) => {
    await deleteDoc(doc(db, "poems", id));
    loadPoems();
  };

  useEffect(() => {
    loadPoems();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Panel</h1>

      {poems.map((p) => (
        <div key={p.id} style={{ marginBottom: "20px" }}>
          <h3>{p.title}</h3>
          <p>{p.poem}</p>

          <button onClick={() => deletePoem(p.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Admin;
