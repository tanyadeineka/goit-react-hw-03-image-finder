import React, { Component } from 'react';
import css from './Modal.module.css';
import propTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleClickOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleClickOverlay}>
        <div className={css.Modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
} 

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  handleClose: propTypes.func.isRequired,
};
