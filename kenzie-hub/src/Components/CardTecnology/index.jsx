import "./style.css";

const Card = ({ tecnology }) => {
  return (
    <div className="Div-card">
      <h3>{tecnology.name}</h3>
      <p>{tecnology.status}</p>
    </div>
  );
};

export default Card;
