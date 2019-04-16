import React from "react";

import { TodoItem } from "./TodoItem";

/**
 * Representa a lista de tarefas que o utilizador tem
 * para fazer.
 */
export class ListaTodos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filtroAtual: "todas"
    };
  }

  handleSetFilter(filtro) {
    this.setState({ filtroAtual: filtro });
  }

  render() {
    console.log("Render ListaTodos");

    // Criar um array com <li />, um por cada tarefa
    // que foi passada em `this.props.tarefas`.
    let listaLis = [];

    for (let i = 0; i < this.props.tarefas.length; i++) {
      let tarefa = this.props.tarefas[i];

      if (
        this.state.filtroAtual === "todas" ||
        (this.state.filtroAtual === "concluidas" &&
          tarefa.concluido === true) ||
        (this.state.filtroAtual === "porFazer" && tarefa.concluido === false)
      ) {
        listaLis.push(
          React.createElement(TodoItem, {
            tarefa: tarefa,
            onDeleteTodo: () => this.props.onDeleteTodo(i),
            onEditTodo: novoTexto => this.props.onEditTodo(i, novoTexto),
            onToggleComplete: () => this.props.onToggleCompleteTodo(i)
          })
        );
      }
    }

    return (
      <div>
        <ContadorTarefas tarefas={this.props.tarefas} />
        <ul className="lista-todos">{listaLis}</ul>

        <button type="button" onClick={() => this.handleSetFilter("todas")}>
          Todas
        </button>
        <button
          type="button"
          onClick={() => this.handleSetFilter("concluidas")}
        >
          ConcluÃ­das
        </button>
        <button type="button" onClick={() => this.handleSetFilter("porFazer")}>
          Por fazer
        </button>
      </div>
    );
  }
}

function ContadorTarefas(props) {
  return React.createElement(
    "p",
    null,
    props.tarefas.length === 0
      ? "NÃ£o tens nada para fazer!"
      : "Tens " + props.tarefas.length + " tarefas por fazer!"
  );
}
