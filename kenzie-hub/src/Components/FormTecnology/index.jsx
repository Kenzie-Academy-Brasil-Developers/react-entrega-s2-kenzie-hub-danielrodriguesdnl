import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";

const Form = ({ setModal }) => {
  const loginSchema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    status: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmitFunction = (techs) => {
    console.log({ ...techs });
    axios
      .post("https://kenziehub.herokuapp.com/users/techs", { ...techs })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="Div-Card">
      <div className="Div-header">
        <h2>Cadastrar Tecnologia</h2>
        <button onClick={() => setModal(false)}>X</button>
      </div>
      <form
        className="Form-insertCard"
        onSubmit={handleSubmit(onSubmitFunction)}
      >
        <div className="Div-insertCard">
          <h3>Nome</h3>
          <input
            {...register("title")}
            label="Title"
            placeholder="Typescript"
            error={errors.title?.message}
          />
          <h3>Selecionar status</h3>
          <select
            {...register("status")}
            label="stats"
            error={errors.status?.message}
          >
            <option defaultValue="Default">Default</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediario">Intermediario</option>
            <option value="Avançado">Avançado</option>
          </select>
        </div>
        <button type="submit">Cadastrar Tecnologia</button>
      </form>
    </div>
  );
};

export default Form;
