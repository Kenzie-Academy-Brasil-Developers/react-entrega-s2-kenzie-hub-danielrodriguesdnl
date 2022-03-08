import List from "../../Components/ListTecnology";
import Form from "../../Components/FormTecnology";
import "./style.css";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ authenticated, setAuthenticated }) => {
  const [modal, setModal] = useState(false);
  const [listTecnology, setListTecnology] = useState([]);

  const user = JSON.parse(window.localStorage.getItem("user")) || {};

  const loadTechs = () => {
    axios
      .get(`https://kenziehub.herokuapp.com/users/${user.id}`)
      .then((response) => setListTecnology(response.data.techs))
      .catch((err) => console.log(err));
  };

  const removeTechs = (tech_id) => {
    const token = window.localStorage.getItem("authToken");
    axios
      .delete(`https://kenziehub.herokuapp.com/users/techs/${tech_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => loadTechs())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadTechs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <h2>Olá, {user.name}</h2>
        <span>{user.course_module}</span>
      </div>
      <div className="Div-tecnology">
        <h2>Tecnologias</h2>
        <button onClick={() => setModal(true)}>+</button>
      </div>
      <div className="Div-dashboard">
        <List listTecnology={listTecnology} removeTechs={removeTechs} />
        {modal && <Form setModal={setModal} loadTechs={loadTechs} />}
      </div>
    </div>
  );
};

export default Dashboard;
