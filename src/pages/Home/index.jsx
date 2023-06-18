import React, { useState, useEffect } from "react";
import Add from "../Add";
import Update from "../Update";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/api"; // Importa las funciones del archivo api.js

import "../../App.css";

function Home() {
  const [filter, setFilter] = useState("");
  const [activeAction, setActiveAction] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getUsers();
      const data = response.data || []; // Verificar que response.data.data no sea undefined
      setFilteredData(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function limpiar() {
    setFilter("");
  }

  function agregar() {
    setActiveAction("agregar");
  }

  async function addUser(userData) {
    try {
      const response = await createUser(userData);
      const newUser = response.data.data;
      setFilteredData([...filteredData, newUser]);
      setActiveAction(null);
    } catch (error) {
      console.error(error);
    }
  }

  function modificar(id) {
    const row = filteredData.find((item) => item.id === id);
    console.log(row);
    setSelectedRow(row);
    setActiveAction("modificar");
  }

  async function updateUserById(userId, userData) {
    try {
      await updateUser(userId, userData);
      const updatedData = filteredData.map((item) =>
        item.id === userId ? { ...item, ...userData } : item
      );
      setFilteredData(updatedData);
      setActiveAction(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminar(id) {
    try {
      await deleteUser(id);
      const newData = filteredData.filter((item) => item.id !== id);
      setFilteredData(newData);
    } catch (error) {
      console.error(error);
    }
  }

  function selectRow(index) {
    setSelectedRow(filteredData[index]);
    setSelectedRowIndex(index);
  }

  return (
    <div>
      {activeAction === "agregar" ? (
        <Add addUser={addUser} />
      ) : activeAction === "modificar" ? (
        <Update selectedRow={selectedRow} updateUser={updateUserById} />
      ) : (
        <div>
          <h1 className="grandecito">CRUD - Clientes</h1>
          <div className="filter-bar">
            <input
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Filtrar por nombre"
            />
            <button onClick={limpiar}>Limpiar</button>
          </div>
          <button onClick={agregar}>Agregar</button>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Correo electrónico</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={selectedRowIndex === index ? "selected" : ""}
                  onClick={() => selectRow(index)}
                >
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedRow && (
            <div className="action-buttons-centered">
              <button onClick={() => modificar(selectedRow.id)}>
                Modificar
              </button>
              <button onClick={() => eliminar(selectedRow.id)}>Eliminar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
