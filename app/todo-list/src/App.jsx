import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const [novaTarefa, setNovaTarefa] = useState("");

  const [tudoConcluido, setTudoConcluido] = useState(false);

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
      { id: tarefas.length + 1, tarefa: newTarefa, concluida: false },
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
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Tarefa</h2>
            <input
              type="text"
              value={tarefaEditar.tarefa}
              placeholder="Editar tarefa..."
              onChange={(e) =>
                setTarefaEditar((t) => ({ ...t, tarefa: e.target.value }))
              }
            />
            <button
              onClick={() => {
                setTarefas((t) =>
                  t.map((item) =>
                    item.id === tarefaEditar.id
                      ? { ...item, tarefa: tarefaEditar.tarefa }
                      : item,
                  ),
                );
                setShowModal(false);
              }}
            >
              Salvar
            </button>
          </div>
        </div>
      )}

      <div className="container">
        <h1>Todo List</h1>
        <p>
          {tarefas.filter((t) => t.concluida).length} de {tarefas.length}{" "}
          tarefas concluídas!
          {tarefas.filter((t) => t.concluida).length === tarefas.length &&
          tarefas.length > 0 ? (
            <div className="concluido">
              <p>Parabéns, você concluiu todas as tarefas!</p>
            </div>
          ) : (
            ""
          )}
          {tarefas.length === 0 && (
            <div className="sem-tarefas">
              <p>Você não tem tarefas, adicione uma nova tarefa!</p>
            </div>
          )}
        </p>
        {tarefas.length > 0 && (
          <div className="remover-todas">
            <button onClick={() => setTarefas([])}>Limpar tudo</button>
          </div>
        )}
        <div className="nova-tarefa">
          <input
            type="text"
            placeholder="Crie uma nova tarefa..."
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNovaTarefa(novaTarefa)}
          />
          <button onClick={() => handleNovaTarefa(novaTarefa)}>
            Adicionar
          </button>
        </div>

        <ul className="lista-tarefas">
          {tarefas.map((t) => (
            <>
              <li className="tarefa" key={t.id}>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => handleTarefaConcluida(t.id)}
                />
                <span className={t.concluida ? "concluida" : ""}>
                  {t.tarefa}
                </span>

                <button
                  className="editar-tarefa"
                  onClick={() => handleEditarTarefa(t)}
                >
                  Editar
                </button>

                <button
                  className="deletar-tarefa"
                  onClick={() => handleDeleteTarefa(t.id)}
                >
                  Deletar
                </button>
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
