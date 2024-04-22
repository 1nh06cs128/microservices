import { useEffect, useState } from "react";
import axios from "axios";

interface iJokes {
  id: number;
  title: string;
  content: string;
}

const Jokes = () => {
  // when array the below definition is required for TypeScript compatibility
  const [jokes, setJokes] = useState<iJokes[]>([]);

  // when object the below definition is required for TypeScript compatibility
  // const [jokes, setJokes] = useState<iJokes>({ id:0, title: '', content:'' });

  const getJokes = async () => {
    // axios.get('http://localhost:3000/api/jokes') // gives CORS ERROR
    await axios
      .get("/api/jokes")
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    getJokes();
  }, []);

  return (
    <>
      <p> JOKES ARRAY: {jokes.length} </p>
      {/* maps expects a return value which can be done with () => () or () => { return } */}
      {jokes.map((joke, index: number) => (
        <div id={`joke_id_${index}`} key={joke.id}>
          <h3>{joke.title} : </h3>
          <span>{joke.content}</span>
        </div>
      ))}
    </>
  );
};

export default Jokes;
