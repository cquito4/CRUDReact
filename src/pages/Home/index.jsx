import React, { useState, useEffect } from "react";
import AddForm from "../Add/index";
import UpdateForm from "../Update/index";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/api";
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
      const data = response.data ?? [];
      setFilteredData(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function clearFilter() {
    setFilter("");
  }

  function addRecord() {
    setActiveAction("add");
  }

  function editRecord(id) {
    const row = filteredData.find((item) => item.id === id);
    setSelectedRow(row);
    setActiveAction("edit");
  }

  async function deleteRecord(id) {
    try {
      await deleteUser(id);
      fetchData(); // Actualizar los datos en la tabla llamando a fetchData
    } catch (error) {
      console.error(error);
    }
  }

  function selectRow(index) {
    setSelectedRow(filteredData[index]);
    setSelectedRowIndex(index);
  }

  async function updateUserData(userId, userData) {
    try {
      await updateUser(userId, userData);
      fetchData(); // Actualizar los datos en la tabla llamando a refreshData
      setActiveAction(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {activeAction === "add" ? (
        <AddForm />
      ) : activeAction === "edit" ? (
        <UpdateForm
          selectedRow={selectedRow}
          updateUser={updateUserData}
          cancel={() => setActiveAction(null)}
        />
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
            <button onClick={clearFilter}>Limpiar</button>
          </div>
          <button onClick={addRecord}>Agregar</button>
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
              {filteredData && filteredData.length === 0 ? (
                <tr>
                  <td colSpan="4">No se encontraron datos</td>
                </tr>
              ) : (
                filteredData &&
                filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={selectedRowIndex === index ? "selected" : ""}
                    onClick={() => selectRow(index)}
                  >
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {selectedRow && (
            <div className="action-buttons-centered">
              <button onClick={() => editRecord(selectedRow.id)}>
                Modificar
              </button>
              <button onClick={() => deleteRecord(selectedRow.id)}>
                Eliminar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
