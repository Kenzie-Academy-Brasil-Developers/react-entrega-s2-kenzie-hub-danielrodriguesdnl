import { Route, Switch } from "react-router-dom";
import Signup from "../Pages/Singup";
import Login from "../Pages/Login";
import { useState, useEffect } from "react";
import Dashboard from "../Pages/Dashborad";

const Routes = () => {
  const [listTecnology, setListTecnology] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");

    if (token) {
      setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Login
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/signup">
          <Signup authenticated={authenticated} />
        </Route>
        <Route path="/dashboard">
          <Dashboard
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            listTecnology={listTecnology}
            setListTecnology={setListTecnology}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;

//DUVIDAS REFERENTES AO PROJETO
//API (COMO CRIAR A API ONDE SERÁ ALOCADO O CADASTRO, COMO CHAMA-LÁ NA FUNÇÃO DE LOGIN)
//COMO CRIAR O FORMULARIO DE ALTERAR A TECNOLOGIA OU EXCLUIR E COMO LINCA-LO AO CARD
//LISTLECNOLOGY VAI REALMENTE FICAR NO APP.JS? SE SIM DEVO PASSAR ESSAS PROPS PARA O ROUTES PARA ALIMENTAR AS FUNÇÕES?
//POSSIVEL SOLUÇÃO PARA O HEADER É CRIAR PAGINA COM RENDERIZAÇÃO CONDICIONAL EX:(CASO ESTEJA NA PAGINA (LOGON)
//RENDERIZAR KENZIEHUB APENAS KENZIEHUB + BOTÃO SAIR)
