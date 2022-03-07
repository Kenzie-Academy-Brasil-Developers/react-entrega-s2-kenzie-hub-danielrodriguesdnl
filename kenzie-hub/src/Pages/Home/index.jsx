import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  return (
    <div>
      <h3>Home</h3>
      <ul>
        <li>
          <button onClick={() => history.push("/signup")}>Signup</button>
        </li>
      </ul>
    </div>
  );
};

export default Home;
