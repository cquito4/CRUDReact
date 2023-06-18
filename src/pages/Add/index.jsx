import React, { useState } from 'react';
import Home from '../Home';
import '../../App.css';

function Add() {
    const [showMain, setShowMain] = useState(false);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

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

    function handleSubmit() {
        // CQ aqui le modificas en la BD
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
                                onChange={handleNameChange} // Actualizar el estado "name"
                            />
                        </div>
                        <div className="form-group" id="address-group">
                            <label htmlFor="address">Dirección:</label>
                            <input
                                type="text"
                                id="address"
                                className="form-control"
                                value={address}
                                onChange={handleAddressChange} // Actualizar el estado "address"
                            />
                        </div>
                        <div className="form-group" id="phone-group">
                            <label htmlFor="phone">Teléfono:</label>
                            <input
                                type="text"
                                id="phone"
                                className="form-control"
                                value={phone}
                                onChange={handlePhoneChange} // Actualizar el estado "phone"
                            />
                        </div>
                        <div className="form-group" id="email-group">
                            <label htmlFor="email">Correo electrónico:</label>
                            <input
                                type="text"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={handleEmailChange} // Actualizar el estado "email"
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