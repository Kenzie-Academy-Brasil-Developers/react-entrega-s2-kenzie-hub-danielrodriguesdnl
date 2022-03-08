import Card from "../CardTecnology";

const List = ({ listTecnology, removeTechs }) => {
  return (
    <div>
      {listTecnology.map((tecnology, index) => (
        <Card tecnology={tecnology} removeTechs={removeTechs} key={index} />
      ))}
    </div>
  );
};

export default List;
