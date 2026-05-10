import { Fragment } from "react";
import "./App.css";

export default function TarefaItem({ tarefas, onToggle, onDelete, onEdit }) {
  return (
    <>
      <ul className="lista-tarefas">
        {tarefas.map((t) => (
          <Fragment key={t.id}>
            <li className="tarefa">
              <input
                type="checkbox"
                className="checkbox"
                checked={t.concluida}
                onChange={() => onToggle(t.id)}
              />
              <span className={t.concluida ? "concluida" : ""}>{t.tarefa}</span>

              <button className="editar-tarefa" onClick={() => onEdit(t)}>
                Editar
              </button>

              <button className="deletar-tarefa" onClick={() => onDelete(t.id)}>
                Deletar
              </button>
            </li>
          </Fragment>
        ))}
      </ul>
    </>
  );
}
