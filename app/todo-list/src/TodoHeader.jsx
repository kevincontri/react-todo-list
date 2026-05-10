import "./App.css";

// Container principal da aplicação, contendo o título, contagem de tarefas e a lista de tarefas

export default function TodoHeader({
  tarefas,
  setTarefas,
  novaTarefa,
  setNovaTarefa,
  handleNovaTarefa,
  children,
}) {
  return (
    <div className="container">
      <h1>Todo List</h1>
      <p>
        {tarefas.filter((t) => t.concluida).length} de {tarefas.length} tarefas
        concluídas!
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
        <button onClick={() => handleNovaTarefa(novaTarefa)}>Adicionar</button>
      </div>
      {children}
    </div>
  );
}
