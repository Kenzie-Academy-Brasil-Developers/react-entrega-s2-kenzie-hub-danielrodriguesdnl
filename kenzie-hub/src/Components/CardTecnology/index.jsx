import "./style.css";

const Card = ({ tecnology, removeTechs }) => {
  return (
    <div className="Div-card">
      <h3>{tecnology.title}</h3>
      <p>{tecnology.status}</p>
      <button onClick={() => removeTechs(tecnology.id)}>remover</button>
    </div>
  );
};

export default Card;
