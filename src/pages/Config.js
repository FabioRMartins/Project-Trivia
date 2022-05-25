import React from 'react';
import propTypes from 'prop-types';

export default class Config extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <form>
          <h1 data-testid="settings-title">Configurações</h1>
          <label htmlFor="select1">
            Categoria
            <select id="select1">
              <option selected defaultValue="Todas">Todas</option>
            </select>
          </label>
          <label htmlFor="select2">
            Dificuldade
            <select id="select2">
              <option selected defaultValue="Normal">Normal</option>
            </select>
          </label>
          <label htmlFor="select3">
            Tipo
            <select id="select3">
              <option selected defaultValue="Todos">Todos</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

Config.propTypes = {
  history: propTypes.shape,
}.isRequired;
