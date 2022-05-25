import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import HeaderGame from '../components/HeaderGame';
import { fetchGetRequest, fetchGetQuestion } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      question: [''],
      answers: [''],
      qNumber: 0,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    fetchGetRequest();
    const getQuestion = fetchGetQuestion();
    const code = 3;
    if (getQuestion.response_code === code) {
      localStorage.removeItem('token');
      history.push('/');
    }

  }

  render() {
    return (
      <div>
        <form>
          <p data-testid="question-category">teste</p>
          <p data-testid="question-text">teste</p>
          <p>Answers</p>
          <div>
            <li><button type="submit" data-testid="answer-options">1</button></li>
            <li><button type="submit" data-testid="answer-options">2</button></li>
            <li><button type="submit" data-testid="answer-options">3</button></li>
            <li><button type="submit" data-testid="answer-options">4</button></li>
          </div>
        </form>

      </div>

    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Game;
