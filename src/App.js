import { useState } from "react";
import "./App.css";

function Buttons(props) {
  return (
    <div className="buttons">
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={(e) => {
          props.onAdd();
        }}
      >
        Add
      </button>
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={(e) => {
          props.onDelete();
        }}
      >
        Delete
      </button>
    </div>
  );
}

function Thead() {
  return (
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">#</th>
        <th scope="col">title</th>
        <th scope="col">Description</th>
        <th scope="col"></th>
      </tr>
    </thead>
  );
}

function Tbody(props) {
  const trList = [];
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  if (props.mode === "ADD") {
    trList.push(
      <tr key="9999999999">
        <th></th>
        <th scope="row"></th>
        <td>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title || ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control"
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="body"
            placeholder="body"
            value={body || ""}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            className="form-control"
          ></input>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            onClick={(e) => {
              if (title === undefined || title === "") {
                props.onAlert("Title is empty!!!");
                return false;
              }
              if (body === undefined || body === "") {
                props.onAlert("Body is empty!!!");
                return false;
              }
              props.onDone(title, body);
              setTitle("");
              setBody("");
            }}
          >
            Done
          </button>
        </td>
      </tr>
    );
  }

  for (let i = 0; i < props.topics.length; i++) {
    const t = props.topics[i];
    trList.push(
      <tr key={t.id}>
        <th>
          <input
            type="checkbox"
            onChange={(e) => {
              props.checkedItemHandler(e.currentTarget.checked, t.id);
            }}
          ></input>
        </th>
        <th scope="row">{props.topics.length - i}</th>
        <td>{t.title}</td>
        <td>{t.body}</td>
        <td>
          <button type="button" className="btn btn-outline-warning btn-sm">
            Update
          </button>
        </td>
      </tr>
    );
  }
  return <tbody>{trList}</tbody>;
}

function Table(props) {
  return (
    <table className="table">
      <colgroup>
        <col width="50px" />
        <col width="50px" />
        <col width="200px" />
        <col width="" />
        <col width="50px" />
      </colgroup>
      <Thead></Thead>
      <Tbody
        topics={props.topics}
        mode={props.mode}
        onDone={(title, body) => {
          props.addTopics(title, body);
        }}
        onAlert={props.onAlert}
        addTopics={props.addTopics}
        checkedItemHandler={props.checkedItemHandler}
      ></Tbody>
    </table>
  );
}

function Alert(props) {
  return (
    <div id="myModal" className="modalA" style={props.style}>
      <div className="modalA-content">
        <div>{props.message}</div>
        <span className="close" onClick={props.closeAlert}>
          &times;
        </span>
      </div>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [style, setStyle] = useState({ display: "none" });
  const [message, setMessage] = useState("");
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [topics, setTopics] = useState([
    { id: 3, title: "javascript", body: "javascript is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 1, title: "html", body: "html is ..." }
  ]);
  if (mode === "DELETE") {
    let newTopics = [...topics];
    checkedItems.forEach((e) => {
      newTopics = newTopics.filter((el) => el.id !== e);
    });
    setTopics(newTopics);
    setMode("");
  }
  return (
    <div className="container">
      <header className="header">
        <h1>Simple Board</h1>
      </header>
      <div className="container">
        <Buttons
          onAdd={() => {
            setMode("ADD");
          }}
          onDelete={() => {
            setMode("DELETE");
          }}
        ></Buttons>
        <Table
          topics={topics}
          mode={mode}
          changeMode={(mode) => {
            setMode(mode);
          }}
          addTopics={(title, body) => {
            const newTopics = [
              { id: nextId, title: title, body: body },
              ...topics
            ];
            setNextId(nextId + 1);
            setTopics(newTopics);
            setMode("");
          }}
          checkedItemHandler={(checked, id) => {
            if (checked) {
              checkedItems.add(id);
              setCheckedItems(checkedItems);
            } else {
              checkedItems.delete(id);
              setCheckedItems(checkedItems);
            }
          }}
          onAlert={(message) => {
            setMessage(message);
            setStyle({ display: "block" });
          }}
        ></Table>
      </div>
      <Alert
        style={style}
        message={message}
        closeAlert={() => {
          setStyle({ display: "none" });
        }}
      ></Alert>
    </div>
  );
}

export default App;
