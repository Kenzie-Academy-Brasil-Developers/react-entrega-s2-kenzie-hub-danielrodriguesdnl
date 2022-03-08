import List from "../../Components/ListTecnology";
import Form from "../../Components/FormTecnology";
import "./style.css";
import { Redirect } from "react-router-dom";
import { useState } from "react";

const Dashboard = ({
  listTecnology,
  setListTecnology,
  authenticated,
  setAuthenticated,
}) => {
  const [modal, setModal] = useState(false);

  const username = window.localStorage.getItem("username");
  const modulo = window.localStorage.getItem("modulo");

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="Div-app">
      <header className="Header-dash">
        <h1>Kenzie Hub</h1>
        <button onClick={() => setAuthenticated(false)}>Sair</button>
      </header>
      <div className="Div-name">
        <h2>Olá, {username}</h2>
        <span>{modulo}</span>
      </div>
      <div className="Div-tecnology">
        <h2>Tecnologias</h2>
        <button onClick={() => setModal(true)}>+</button>
      </div>
      <div className="Div-dashboard">
        <List listTecnology={listTecnology} />
        {modal && (
          <Form
            setModal={setModal}
            listTecnology={listTecnology}
            setListTecnology={setListTecnology}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
