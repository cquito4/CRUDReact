import React, { useState } from "react";
import PropTypes from "prop-types";
import Home from "../Home";
import "../../App.css";
import { createUser } from "../../services/api";

function AddForm() {
  const [showMain, setShowMain] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function regresar() {
    setShowMain(true);
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
      await createUser(userData);
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
        <div className="container" id="add-container">
          <h1 id="add-title">Agregar Usuario</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group" id="name-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={handleNameChange}
                required
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
                required
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
                required
              />
            </div>
            <div className="form-group" id="email-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-buttons">
              <button
                id="botonPrimario"
                type="submit"
                className="btn btn-primary"
              >
                Agregar
              </button>
              <button
                id="botonSecundario"
                type="button"
                className="btn btn-secondary"
                onClick={regresar}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddForm;
