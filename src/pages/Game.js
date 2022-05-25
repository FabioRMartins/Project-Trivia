import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderGame from '../components/HeaderGame';
import { fetchGetRequest, fetchGetQuestion } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: {},
      shuffledAnswers: [],
      currentQuestionIndex: 0,
      nxtButtonDisabled: true,
      questionButtonDisabled: false,
    };
  }

  componentDidMount() {
    this.fetchGetQuestion();
  }

  shuffledAnswers = () => {
    const { questions, currentQuestionIndex, questionButtonDisabled } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    const NUMBER = 0.5;
    const allAnswers = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - NUMBER);
    this.setState({
      shuffledAnswers,
    });
  }

  fetchGetQuestion = async () => {
    const { history } = this.props;
    fetchGetRequest();
    const getQuestion = await fetchGetQuestion();
    const code = 3;
    if (getQuestion.response_code === code) {
      localStorage.removeItem('token');
      history.push('/');
    }
    const questions = getQuestion.results;
    this.setState({
      questions,
    });
    this.shuffledAnswers();
  }

  checkAnswer = (e) => {
    e.preventDefault();
    const { target } = e;
    const { questions, currentQuestionIndex } = this.state;
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (target.value === correctAnswer) {
      console.log('acertou');
    } else {
      console.log('errou');
    }
    this.setState({
      nxtButtonDisabled: false,
      questionButtonDisabled: true,
    });
  }

  nextQuestion = (e) => {
    e.preventDefault();
    const { questions, currentQuestionIndex } = this.state;
    if (currentQuestionIndex < questions.length - 1) {
      this.setState({
        currentQuestionIndex: currentQuestionIndex + 1,
        nxtButtonDisabled: true,
        questionButtonDisabled: false,
      });
    } else {
      this.setState({
        nxtButtonDisabled: false,
      });
    }
  }

  renderQuestions = () => {
    const { questions, currentQuestionIndex, questionButtonDisabled } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    const NUMBER = 0.5;
    const allAnswers = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - NUMBER);
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    return (
      <div>
        <p data-testid="question-category">{currentQuestion.category}</p>
        <p data-testid="question-text">{currentQuestion.question}</p>
        <div data-testid="answer-options">
          {
            shuffledAnswers.map((answer, index) => (
              (answer !== correctAnswer)
                ? (
                  <button
                    type="submit"
                    key={ index }
                    value={ answer }
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ this.checkAnswer }
                    disabled={ questionButtonDisabled }
                  >
                    {answer}
                  </button>
                ) : (
                  <button
                    type="submit"
                    key={ index }
                    value={ answer }
                    data-testid="correct-answer"
                    onClick={ this.checkAnswer }
                    disabled={ questionButtonDisabled }
                  >
                    {answer}
                  </button>
                )
            ))
          }
        </div>
      </div>
    );
  }

  render() {
    const { questions, nxtButtonDisabled } = this.state;
    return (
      <main>
        <HeaderGame />
        <div>
          {
            questions.length > 0 ? this.renderQuestions() : <p>Carregando</p>
          }
          {
            <button
              type="submit"
              onClick={ this.nextQuestion }
              disabled={ nxtButtonDisabled }
            >
              Proximo
            </button>
          }
        </div>
      </main>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Game;
