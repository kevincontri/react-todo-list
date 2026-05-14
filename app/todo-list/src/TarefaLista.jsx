import "./App.css";
import { useSortable } from "@dnd-kit/sortable";
import { TarefaItem } from "./TarefaItem";

export default function TarefaLista({ tarefas, onToggle, onDelete, onEdit }) {
  return (
    <>
      <ul className="lista-tarefas">
        {tarefas.map((t) => (
          <TarefaItem
            key={t.id}
            tarefa={t}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </>
  );
}
