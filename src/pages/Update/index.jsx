import React, { useState } from "react";
import Home from "../Home";
import "../../App.css";
import { updateUser } from "../../services/api";

function Update({ selectedRow }) {
  const [showMain, setShowMain] = useState(false);
  const [name, setName] = useState(selectedRow ? selectedRow.name : "");
  const [address, setAddress] = useState(selectedRow ? selectedRow.address : "");
  const [phone, setPhone] = useState(selectedRow ? selectedRow.phone : "");
  const [email, setEmail] = useState(selectedRow ? selectedRow.email : "");

  function regresar() {
    setShowMain(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      name,
      address,
      phone,
      email,
    };
    try {
      await updateUser(selectedRow.id, userData);
      // Limpiar los campos después de agregar el usuario
      setName("");
      setAddress("");
      setPhone("");
      setEmail("");
    } catch (error) {
      console.error(error);
      // Manejar el error de manera adecuada, como mostrar un mensaje de error al usuario
    }
    setShowMain(true);
  }

  return (
    <div>
      {showMain ? (
        <Home />
      ) : (
        <div className="container" id="update-container">
          <h1 id="update-title">Pagina Update</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección:</label>
              <input
                type="text"
                id="address"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono:</label>
              <input
                type="text"
                id="phone"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="text"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Actualizar
            </button>
            <button onClick={regresar} className="btn btn-secondary">
              Regresar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Update;
