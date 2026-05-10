import "./App.css";

// Modal para edição de tarefa, exibido quando "showModal" é verdadeiro

export default function Modal({
  showModal,
  setShowModal,
  tarefaEditar,
  setTarefaEditar,
  setTarefas,
}) {
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
                setShowModal(false);
              }}
            >
              Cancelar
            </button>

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
    </>
  );
}
