import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import "./App.css";
import { CREATE_USER } from "./mutations/user";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS /*, {pollInterval:500} буде виконувати запит кожних пів секунди, тим самим обновляючи данні*/);
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [age, setAge] = React.useState(0);

  console.log(oneUser);

  React.useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age: +age,
        },
      },
    }).then(() => {
      setUsername("");
      setAge(0);
    });
  };

  const getAll = e => {
    e.preventDefault();
    refetch();
  }

  return (
    <div className="App">
      <form>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
        />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Create</button>
          <button onClick={(e) => getAll(e)}>Get</button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <div key={user.id} className="user">
            {user.id} {user.username} {user.age}{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
