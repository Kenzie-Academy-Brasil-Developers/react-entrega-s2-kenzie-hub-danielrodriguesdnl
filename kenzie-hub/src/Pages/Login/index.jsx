import * as yup from "yup";
import { useHistory, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";
import axios from "axios";

const Login = ({ authenticated, setAuthenticated }) => {
  const loginSchema = yup.object().shape({
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const history = useHistory();

  const onSubmitFunction = (user) => {
    console.log({ ...user });
    axios
      .post("https://kenziehub.herokuapp.com/sessions", { ...user })
      .then((response) => {
        console.log(response);
        window.localStorage.clear();
        window.localStorage.setItem("authToken", response.data.token);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        setAuthenticated(true);
      });
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="Div-login">
      <h1>Kenzie Hub</h1>

      <form className="Form-login" onSubmit={handleSubmit(onSubmitFunction)}>
        <h2>Login</h2>
        <div className="Div-inputs">
          <h3>Email</h3>
          <input
            name="email"
            {...register("email")}
            label="Email"
            placeholder="email@exemplo.com"
            error={errors.email?.message}
          />
          <h3>Senha</h3>
          <input
            name="password"
            {...register("password")}
            label="Senha"
            placeholder="Sua senha"
            type="password"
            error={errors.password?.message}
          />
        </div>
        <button className="Button-send" type="submit">
          Entrar
        </button>
        <span>Ainda não possui uma conta?</span>
        <button
          className="Button-singup"
          onClick={() => history.push("/signup")}
        >
          Cadastre-se
        </button>
      </form>
    </div>
  );
};

export default Login;
