import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Signup = () => {
  const signupSchema = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .matches(
        /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
        "Senha inválida"
      ),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
      .required("Campo obrigatório"),
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
    //   history.push(pagina a ser puxada após o cadastro);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFunction)}>
      <div className="Div-input">
        <input {...register("username")} placeholder="Nome de usuário" />
        <p>{errors.username?.message}</p>
        <input {...register("email")} placeholder="Email" />
        <p>{errors.email?.message}</p>
        <input {...register("password")} placeholder="Senha" type="password" />
        <p>{errors.password?.message}</p>
        <input
          {...register("confirm_password")}
          placeholder="Confirme a senha"
          type="password"
        />
        <p>{errors.confirm_password?.message}</p>
        <select className="Select-option">
          <option defaultValue="Default">Default</option>
          <option value="Primeiro modulo">Primeiro modulo</option>
        </select>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};

export default Signup;
