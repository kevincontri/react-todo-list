import { useState, useEffect, useRef, Fragment } from "react";
import "./App.css";
import TarefaItem from "./TarefaItem.jsx";
import Modal from "./Modal.jsx";
import TodoHeader from "./TodoHeader.jsx";

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const [novaTarefa, setNovaTarefa] = useState("");

  const [tarefaEditar, setTarefaEditar] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleNovaTarefa = (newTarefa) => {
    if (!newTarefa.trim()) return;
    if (tarefas.length == 10) {
      alert(
        "Woah! Você já tem 10 tarefas, conclua ou remova algumas para adicionar mais!",
      );
      return;
    }

    setTarefas([
      ...tarefas,
      { id: Date.now(), tarefa: newTarefa, concluida: false },
    ]);
    setNovaTarefa("");
  };

  const handleDeleteTarefa = (idTarefa) => {
    setTarefas(tarefas.filter((t) => t.id !== idTarefa));
  };

  const handleTarefaConcluida = (idTarefa) => {
    setTarefas(
      tarefas.map((t) =>
        t.id === idTarefa ? { ...t, concluida: !t.concluida } : t,
      ),
    );
  };

  const handleEditarTarefa = (tarefa) => {
    setTarefaEditar(tarefa);
    setShowModal(true);
  };

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        tarefaEditar={tarefaEditar}
        setTarefaEditar={setTarefaEditar}
        setTarefas={setTarefas}
      />

      <TodoHeader
        tarefas={tarefas}
        setTarefas={setTarefas}
        novaTarefa={novaTarefa}
        setNovaTarefa={setNovaTarefa}
        handleNovaTarefa={handleNovaTarefa}
        setShowModal={setShowModal}
        setTarefaEditar={setTarefaEditar}
        tarefaEditar={tarefaEditar}
      >
        <ul className="lista-tarefas">
          <TarefaItem
            tarefas={tarefas}
            onToggle={handleTarefaConcluida}
            onDelete={handleDeleteTarefa}
            onEdit={handleEditarTarefa}
          />
        </ul>
      </TodoHeader>
    </>
  );
}

export default App;
