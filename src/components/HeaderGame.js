import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//  O header deve conter as informações sobre a pessoa jogadora, como a imagem do Gravatar, o nome e o placar

class HeaderGame extends React.Component {
  render() {
    const { player: { name, emailGravatar, score } } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(emailGravatar).toString()}` }
          data-testid="header-profile-picture"
          alt="foto do usuário"
        />
        <span>  </span>
        <span data-testid="header-player-name">{`Player Name: ${name}`}</span>
        <span>  </span>
        <span data-testid="header-score">{`Player's score: ${score}`}</span>

      </header>
    );
  }
}

HeaderGame.propTypes = {
  player: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Header);
