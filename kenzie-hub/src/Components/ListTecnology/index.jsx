import Card from "../CardTecnology";

const List = ({ listTecnology }) => {
  return (
    <div>
      {listTecnology.map((tecnology, index) => (
        <Card tecnology={tecnology} key={index} />
      ))}
    </div>
  );
};

export default List;
