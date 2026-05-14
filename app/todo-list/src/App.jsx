import { useState, useEffect, useRef, Fragment } from "react";
import "./App.css";
import TarefaLista from "./TarefaLista.jsx";
import Modal from "./Modal.jsx";
import TodoHeader from "./TodoHeader.jsx";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
} from "@dnd-kit/core";

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

  const sensors = useSensors(
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor),
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Verifica se o item foi solto sobre um alvo válido
    if (!over) return;

    // Se o item foi solto sobre ele mesmo, não faz nada
    if (active.id === over.id) return;

    // Encontra os índices dos itens arrastado e alvo para reordenar a lista
    if (active.id !== over.id) {
      const oldIndex = tarefas.findIndex((t) => t.id === active.id);
      const newIndex = tarefas.findIndex((t) => t.id === over.id);
      const newArray = arrayMove(tarefas, oldIndex, newIndex);
      setTarefas(newArray);
    }
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
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
          sensors={sensors}
        >
          <SortableContext
            items={tarefas.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <TarefaLista
              tarefas={tarefas}
              onToggle={handleTarefaConcluida}
              onDelete={handleDeleteTarefa}
              onEdit={handleEditarTarefa}
            />
          </SortableContext>
        </DndContext>
      </TodoHeader>
    </>
  );
}

export default App;
