import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const Wrapper = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

const Modal = ({ target, resetTarget }) => {
  const onEscPress = event => {
    if (event.code !== 'Escape') return;
    resetTarget(null);
  };

  const cachedFn = useCallback(onEscPress, [resetTarget]);

  useEffect(() => {
    document.addEventListener('keydown', cachedFn);
    return () => {
      document.removeEventListener('keydown', cachedFn);
    };
  }, [cachedFn]);

  const onClick = event => {
    if (event.target.nodeName !== 'DIV') return;
    resetTarget(null);
  };

  return createPortal(
    <Overlay className="overlay" onClick={onClick}>
      <Wrapper className="modal">
        <img src={target} alt={''} />
      </Wrapper>
    </Overlay>,
    document.querySelector('#modal')
  );
};

export default Modal;

Modal.propTypes = {
  target: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onPressEsc: PropTypes.func,
};
