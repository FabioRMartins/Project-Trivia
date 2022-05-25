import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionAddEmail, actionAddName } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      btnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verify());
  }

  verify = () => {
    const { email, name } = this.state;
    const num = 1;
    const pattern = /\S+@\S+.com/;
    if (name.length >= num && pattern.test(email)) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const endpoint = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await endpoint.json();
    console.log(data);
    localStorage.setItem('token', data.token);
    history.push('/jogo');
  }

  btnConfig = () => {
    const { history } = this.props;
    history.push('/configuracao');
  }

  render() {
    const { email, name, btnDisabled } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            value={ name }
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            placeholder="insira seu nome"
          />
          <input
            type="email"
            value={ email }
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            placeholder="insira seu email"
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ btnDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            onClick={ this.btnConfig }
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(actionAddEmail(email)),
  setName: (name) => dispatch(actionAddName(name)),
});

Login.propTypes = {
  history: propTypes.shape,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
