import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class Skill extends Component {
  render() {
    const {
      active,
      cost,
      highlight,
      name,
      onClick,
      onMouseLeave,
      onMouseOver,
      x,
      y,
    } = this.props;

    let style;
    if (cost === 2) {
      style = styles.cost_two;
    } else if (cost === 3) {
      style = styles.cost_special;
    }

    let left = (x / 6) * (window.innerWidth - 16);
    let top = y;

    return (
      <span
        className={css(
          styles.skill,
          style,
          active && styles.active,
          !active && highlight === 'hover' && styles.highlightHover,
          !active && highlight === 0 && styles.highlightFree,
          !active && highlight === 1 && styles.highlightSingle,
          !active && highlight === 2 && styles.highlightDouble,
        )}
        style={{left, top}}
        onClick={onClick}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
      >
        {name}
      </span>
    );
  }
}

const styles = StyleSheet.create({
  skill: {
    backgroundColor: 'white',
    border: '1px solid black',
    boxShadow: '5px 5px',
    cursor: 'pointer',
    fontFamily: "'Voltaire', sans-serif",
    margin: 8,
    padding: 8,
    position: 'absolute',
    textAlign: 'center',
    width: 160,
  },
  cost_two: {
    border: '1px dashed black',
  },
  cost_special: {
    border: '3px solid black',
  },
  active: {
    backgroundColor: 'yellow',
    fontWeight: 700,
  },
  highlightHover: {
    backgroundColor: 'yellow',
  },
  highlightFree: {
    backgroundColor: '#99ccff',
  },
  highlightSingle: {
    backgroundColor: '#99ccff',
  },
  highlightDouble: {
    backgroundColor: '#99ccff',
  },
})

export default Skill;
