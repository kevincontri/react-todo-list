import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./App.css";

export const TarefaItem = ({ tarefa, onToggle, onDelete, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: tarefa.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <li
      className="tarefa"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <input
        type="checkbox"
        className="checkbox"
        checked={tarefa.concluida}
        onChange={() => onToggle(tarefa.id)}
      />
      <span className={tarefa.concluida ? "concluida" : ""}>
        {tarefa.tarefa}
      </span>

      <button className="editar-tarefa" onClick={() => onEdit(tarefa)}>
        Editar
      </button>

      <button className="deletar-tarefa" onClick={() => onDelete(tarefa.id)}>
        Deletar
      </button>
    </li>
  );
};
