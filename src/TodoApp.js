import React from "react";

import { ListaTodos } from "./ListaTodos";

/**
 * Representa o ponto de arranque da aplicaÃ§Ã£o de tarefas.
 *
 * Ã responsÃ¡vel por definir a estrutura da aplicaÃ§Ã£o, e a gestÃ£o
 * das tarefas que sÃ£o manipuladas pelo utilizador.
 */
export class TodoApp extends React.Component {
  /**
   *
   * @param {object} props Valor inicial (ou por defeito) das propriedades
   * que vÃ£o inicializar o objeto. Podem, por exemplo, ser usadas para definir
   * variÃ¡veis no `this.state`.
   */
  constructor(props) {
    super(props);

    // `this.state` Ã© obrigatÃ³riamente um objeto.
    // Se nÃ£o for definido, toma o valor de `null`.
    this.state = {
      /**
       * Representa as tarefas que o utilizador tem para fazer.
       */
      listaTarefas: [
        { texto: "Dar de comer ao gato", concluido: false },
        { texto: "Estudar TI2", concluido: true }
      ]
    };
  }

  // Define o que tem que ser colocado no ecrÃ£.
  render() {
    console.log("Render TodoApp");

    /*
    <div>
      <input type="text" id="txtDescricaoTarefa" />
      <button type="button" onClick={(evt) => this.handleAddClick(evt)}>
        +
      </button>
      <ListaTodos tarefas={this.state.listaTarefas} />
    </div>
    */

    return React.createElement(
      "div",
      null,
      React.createElement("input", { type: "text", id: "txtDescricaoTarefa" }),
      React.createElement(
        "button",
        {
          type: "button",
          onClick: evt => this.handleAddClick(evt)
        },
        "➕"
      ),
      React.createElement(ListaTodos, {
        tarefas: this.state.listaTarefas,
        // A prop `onDeleteTodo` serve como "intermediÃ¡rio",
        // ou "canal de comunicaÃ§Ã£o" entre a `ListaTodos` e o `TodoApp`.
        // Quando o utilizador clica no botÃ£o para apagar uma tarefa,
        // a funÃ§Ã£o que estÃ¡ nesta `prop` Ã© chamada com o Ã­ndice `idx`.
        // (ver o `onClick` do botÃ£o de eliminar no `ListaTodos`).
        onDeleteTodo: idx => this.handleDeleteTodo(idx),
        onEditTodo: (idx, novoTexto) => this.handleEditTodo(idx, novoTexto),
        onToggleCompleteTodo: idx => this.handleToggleCompleteTodo(idx)
      }),
      <button type="button" onClick={() => this.handleDeleteCompleted()}>
        Apagar terminadas
      </button>
    );
  }

  handleDeleteCompleted() {
    this.setState({
      listaTarefas: this.state.listaTarefas.filter(tarefa => !tarefa.concluido)
    });
  }

  /**
   * Adiciona o texto da caixa de texto Ã  lista de tarefas.
   *
   * @param {Event} evt
   */
  handleAddClick(evt) {
    console.log("Click");
    let textoTarefa = document.getElementById("txtDescricaoTarefa").value;

    // A criaÃ§Ã£o de um array auxiliar Ã© porque nÃ£o se deve alterar
    // os valores presentes em `this.props` ou `this.state`.
    // A alteraÃ§Ã£o destes valores, por limitaÃ§Ãµes do JS, nÃ£o seria
    // detectada pelo React, e o componente nÃ£o se iria atualizar.
    // A modificaÃ§Ã£o (adiÃ§Ã£o da nova tarefa) Ã© feita no array auxiliar.
    let copia = this.state.listaTarefas.slice();

    copia.push({ texto: textoTarefa, concluido: false });

    // Guardar o novo valor (isto Ã©, a nova lista de tarefas)
    // e atualizar o componente.
    this.setState({
      listaTarefas: copia
    });
  }

  /**
   * Apaga uma tarefa da lista.
   *
   * @param {number} index Ãndice do array para apagar na
   * lista de tarefas.
   */
  handleDeleteTodo(index) {
    let aux = this.state.listaTarefas.slice();

    // Remover 1 elemento de `aux`, a partir do Ã­ndice `index`
    // ou seja, estou a remover uma tarefa na posiÃ§Ã£o determinada pelo
    // utilizador.
    aux.splice(index, 1);

    this.setState({
      listaTarefas: aux
    });
  }

  handleEditTodo(index, novoTexto) {
    let aux = this.state.listaTarefas.slice();

    aux[index] = {
      texto: novoTexto,
      concluido: aux[index].concluido
    };

    this.setState({ listaTarefas: aux });
  }

  handleToggleCompleteTodo(index) {
    let aux = [...this.state.listaTarefas];

    aux[index] = {
      texto: aux[index].texto,
      concluido: !aux[index].concluido
    };

    this.setState({ listaTarefas: aux });
  }
}
