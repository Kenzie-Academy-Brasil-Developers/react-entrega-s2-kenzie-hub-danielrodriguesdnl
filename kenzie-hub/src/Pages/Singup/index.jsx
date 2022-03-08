import * as yup from "yup";
import { Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import "./style.css";

const Signup = ({ authenticated }) => {
  const signupSchema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .matches(
        /^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
        "Senha inválida, necessario 6 digitos, letra maiuscula, minuscula e 1 caracter especial"
      ),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
      .required("Campo obrigatório"),
    course_module: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const history = useHistory();

  const onSubmitFunction = (data) => {
    delete data.confirm_password;
    data.bio = "Lorem ipsum dolor emet";
    data.contact = "linkedin/in/johndoe";

    console.log(data);
    axios
      .post("https://kenziehub.herokuapp.com/users", data)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="Div-app">
      <div className="Div-Header">
        <h1>Kenzie Hub</h1>
        <button onClick={() => history.push("/")}>Voltar</button>
      </div>
      <form className="Form-singup" onSubmit={handleSubmit(onSubmitFunction)}>
        <h2>Crie sua conta</h2>
        <span>Rapido e grátis, vamos nessa</span>
        <div className="Div-input">
          <h3>Nome</h3>
          <input {...register("name")} placeholder="Nome de usuário" />
          <p>{errors.name?.message}</p>
          <h3>Email</h3>
          <input {...register("email")} placeholder="Email" />
          <p>{errors.email?.message}</p>
          <h3>Senha</h3>
          <input
            {...register("password")}
            placeholder="Senha"
            type="password"
          />
          <p>{errors.password?.message}</p>
          <h3>Confirmar senha</h3>
          <input
            {...register("confirm_password")}
            placeholder="Confirme a senha"
            type="password"
          />
          <p>{errors.confirm_password?.message}</p>
          <h3>Confirmar módulo</h3>
          <select className="Select-option" {...register("course_module")}>
            <option defaultValue="Default">Default</option>
            <option value="Primeiro módulo (Introdução ao Frontend)">
              Primeiro módulo (Introdução ao Frontend)
            </option>
            <option value="Segundo módulo (Frontend Avançado)">
              Segundo módulo (Frontend Avançado)
            </option>
            <option value="Terceiro módulo (Introdução ao Backend)">
              Terceiro módulo (Introdução ao Backend)
            </option>
            <option value="Quarto módulo (Backend Avançado)">
              Quarto módulo (Backend Avançado)
            </option>
          </select>
          <p>{errors.course_module?.message}</p>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Signup;
