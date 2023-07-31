import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {SERVER_URI} from './config';

function App() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tasks, setTasks] = useState([]);

  const onTitleChange = (evnt) => setTitle(evnt.target.value);
  const onDescriptionChange = (evnt) => setDescription(evnt.target.value);

  const onFetchAllTask = async () => {
    const { data } = await axios.get(SERVER_URI);
    setTasks(data);
  };

  const onCreateTask = async () => {
    const {data} = await axios.post(SERVER_URI, {
      title,
      description,
    });
    setTasks((tasks) => [...tasks, data])
  };

  const onDeleteTask = async (id) => {
    try {
      await axios.delete(`${SERVER_URI}/${id}`);
      setTasks((tasks) => tasks.filter(({_id}) => {
        return _id !== id
      }))
    } catch(err) {
      console.log(err)
    }
  };

  useEffect(() => {
    onFetchAllTask();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          <div>
            <input
              placeholder="Title"
              type="text"
              onChange={onTitleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Description"
              onChange={onDescriptionChange}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={onCreateTask}
            disabled={!title || !description}
          >
            Create
          </button>

          <div className="tasks_container">
            {tasks.map(({ _id, title, description }) => (
              <div key={_id}>
                <div>{title}</div>
                <div>{description}</div>
                <button onClick={() => onDeleteTask(_id)}>Delete</button>
                <hr />
              </div>
            ))}
          </div>
      </header>
    </div>
  );
}

export default App;
