import React, { useState } from "react";
import Home from "../Home";
import "../../App.css";

function Add({ addUser }) {
  const [showMain, setShowMain] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAddressChange(event) {
    setAddress(event.target.value);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
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
      await addUser(userData);
      setShowMain(true); // Redirigir a Home después de agregar el usuario
    } catch (error) {
      console.error(error);
      // Manejar el error de manera adecuada, como mostrar un mensaje de error al usuario
    }
  }

  function regresar() {
    setShowMain(true);
  }

  return (
    <div>
      {showMain ? (
        <Home />
      ) : (
        <div className="container" id="add-container">
          <h1 id="add-title">Pagina Add</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group" id="name-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group" id="address-group">
              <label htmlFor="address">Dirección:</label>
              <input
                type="text"
                id="address"
                className="form-control"
                value={address}
                onChange={handleAddressChange}
              />
            </div>
            <div className="form-group" id="phone-group">
              <label htmlFor="phone">Teléfono:</label>
              <input
                type="text"
                id="phone"
                className="form-control"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="form-group" id="email-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="text"
                id="email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <button
              id="botonPrimario"
              type="submit"
              className="btn btn-primary"
            >
              Agregar
            </button>
          </form>
          <button
            id="botonSecundario"
            type="submit"
            onClick={regresar}
            className="btn btn-secondary"
          >
            Regresar
          </button>
        </div>
      )}
    </div>
  );
}

export default Add;
