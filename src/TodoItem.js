import React from "react";

export class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editar: false,
      texto: props.tarefa.texto
    };
  }

  render() {
    if (this.state.editar) {
      return React.createElement(
        "li",
        null,
        React.createElement("input", {
          type: "text",
          value: this.state.texto,
          onChange: evt => this.handleTextChange(evt)
        }),
        React.createElement(
          "button",
          { type: "button", onClick: evt => this.onSaveEdit(evt) },
          "✔"
        ),
        React.createElement(
          "button",
          { type: "button", onClick: evt => this.onCancelEdit(evt) },
          "❌"
        )
      );
    } else {
      return (
        <li
          style={{
            textDecoration: this.props.tarefa.concluido
              ? "line-through"
              : undefined
          }}
        >
          {this.props.tarefa.texto}

          <button type="button" onClick={this.props.onToggleComplete}>
            ✔
          </button>

          <button type="button" onClick={evt => this.onEditTodo(evt)}>
            ✏
          </button>
          <button type="button" onClick={evt => this.props.onDeleteTodo()}>
            🗑
          </button>
        </li>
      );
    }
  }

  onEditTodo(evt) {
    this.setState({ editar: true });
  }

  onCancelEdit(evt) {
    this.setState({ editar: false });
  }

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} evt
   */
  handleTextChange(evt) {
    let texto = evt.target.value;

    this.setState({ texto: texto });
  }

  onSaveEdit(evt) {
    this.setState({ editar: false });
    this.props.onEditTodo(this.state.texto);
  }
}
