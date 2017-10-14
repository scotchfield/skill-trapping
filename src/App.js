import React, { Component } from 'react';
import Skill from './Skill.js';
import { StyleSheet, css } from 'aphrodite';

const skills = [
  {name: 'Initiative (Physical)', cost: 2, x: 1.5, y: 0},
  {name: 'Initiative (Mental)', cost: 2, x: 1, y: 60},
  {name: 'Initiative (Social)', cost: 2, x: 2, y: 60},
  {name: 'Resist Damage', cost: 2, x: 0, y: 0},
  {name: 'Stress Cap. (Health)', cost: 2, x: 0, y: 60},
  {name: 'Physical Force', cost: 1, x: 0, y: 120},
  {name: 'Leap', cost: 1, x: 1, y: 120},
  {name: 'Climb', cost: 1, x: 0, y: 180},
  {name: 'Move', cost: 1, x: 1, y: 180},
  {name: 'Dodge', cost: 2, x: 2, y: 180},
  {name: 'Stealth', cost: 1, x: 1, y: 240},
  {name: 'Parry', cost: 1, x: 2, y: 240},
  {name: 'Security', cost: 1, x: 0, y: 300},
  {name: 'Dexterity', cost: 1, x: 1, y: 300},
  {name: 'Strike', cost: 1, x: 2, y: 300},
  {name: 'Notice', cost: 1, x: 0, y: 360},
  {name: 'Shoot', cost: 2, x: 2, y: 360},
  {name: 'Examine', cost: 1, x: 0, y: 420},
  {name: 'Languages', cost: 1, x: 2, y: 420},
  {name: 'Information', cost: 1, x: 0, y: 480},
  {name: 'Research', cost: 1, x: 1, y: 480},
  {name: 'Treatment (Scope)', cost: 2, x: 2, y: 480},
  {name: 'Stress Cap. (Reputation)', cost: 2, x: 3, y: 480},
  {name: 'Wealth', cost: 1, x: 4, y: 480},
  {name: 'Environment', cost: 1, x: 2, y: 540},
  {name: 'Esteem', cost: 1, x: 3, y: 540},
  {name: 'Networking', cost: 1, x: 4, y: 540},
  {name: 'Influence', cost: 1, x: 5, y: 540},
  {name: 'Transport', cost: 1, x: 2, y: 600},
  {name: 'Insight', cost: 1, x: 3, y: 600},
  {name: 'Conversation', cost: 1, x: 4, y: 600},
  {name: 'Menace', cost: 1, x: 5, y: 600},
  {name: 'Minions', cost: 0, x: 2, y: 660, special: true},
  {name: 'Dismantle', cost: 1, x: 3, y: 660},
  {name: 'Convince', cost: 1, x: 4, y: 660},
  {name: 'Inspire', cost: 1, x: 5, y: 660},
  {name: 'Variable', cost: 0, x: 2, y: 720, special: true},
  {name: 'Repair', cost: 1, x: 3, y: 720},
  {name: 'Guile', cost: 1, x: 4, y: 720},
  {name: 'Willpower', cost: 1, x: 5, y: 720},
  {name: 'Craft', cost: 1, x: 3, y: 780},
  {name: 'Disguise', cost: 1, x: 4, y: 780},
  {name: 'Stress Cap. (Composure)', cost: 2, x: 5, y: 780},
  {name: 'Workspace', cost: 1, x: 3, y: 840},
];

const edges = [
  ['Initiative (Physical)', 'Initiative (Mental)', 2],
  ['Initiative (Physical)', 'Initiative (Social)', 2],
  ['Initiative (Mental)', 'Initiative (Social)', 2],
  ['Resist Damage', 'Stress Cap. (Health)', 1],
  ['Stress Cap. (Health)', 'Physical Force', 2],
  ['Physical Force', 'Leap', 1],
  ['Physical Force', 'Climb', 1],
  ['Leap', 'Move', 1],
  ['Climb', 'Move', 1],
  ['Move', 'Dodge', 0],
  ['Move', 'Stealth', 2],
  ['Stealth', 'Dexterity', 1],
  ['Dexterity', 'Strike', 2],
  ['Parry', 'Strike', 0],
  ['Security', 'Dexterity', 1],
  ['Security', 'Notice', 1],
  ['Notice', 'Shoot', 2],
  ['Examine', 'Information', 1],
  ['Information', 'Research', 1],
  ['Stress Cap. (Reputation)', 'Esteem', 1],
  ['Wealth', 'Networking', 1],
  ['Esteem', 'Networking', 1],
  ['Networking', 'Influence', 1],
  ['Networking', 'Conversation', 1],
  ['Insight', 'Conversation', 1],
  ['Conversation', 'Convince', 0],
  ['Menace', 'Inspire', 1],
  ['Convince', 'Inspire', 1],
  ['Convince', 'Guile', 1],
  ['Inspire', 'Willpower', 1],
  ['Willpower', 'Stress Cap. (Composure)', 2],
  ['Guile', 'Disguise', 1],
  ['Dismantle', 'Repair', 0],
  ['Repair', 'Craft', 1],
  ['Craft', 'Workplace', 1],
];

class App extends Component {
  constructor(props) {
    super(props);

    const nodeEdges = {};
    edges.forEach(edge => {
      nodeEdges[edge[0]] = nodeEdges[edge[0]] || [];
      nodeEdges[edge[1]] = nodeEdges[edge[1]] || [];
      nodeEdges[edge[0]].push([edge[1], edge[2]]);
      nodeEdges[edge[1]].push([edge[0], edge[2]]);
    })

    this.state = {
      active: {},
      highlight: {},
      nodeEdges: nodeEdges,
      points: [0, false],
    };
  }
  shortestPath(name) {
    const {nodeEdges} = this.state;
    const dist = {[name]: 0};
    let done = false, queue = [];

    if (!nodeEdges[name]) {
      return dist;
    }

    nodeEdges[name].forEach(node => queue.push(node));
    while (!done) {
      if (queue.length) {
        let [nodeName, nodeCost] = queue[0];
        queue = queue.slice(1);

        if (dist[nodeName] === undefined) {
          dist[nodeName] = nodeCost;

          nodeEdges[nodeName].forEach(
            node => queue.push([node[0], node[1] + nodeCost])
          )
        }
      } else {
        done = true;
      }
    }
    return dist;
  }
  toggleSkill(name) {
    let newActive = this.state.active;

    if (this.state.active[name]) {
      console.log('deleting ' + name);
      delete newActive[name];
    } else {
      console.log('activating ' + name);
      newActive = {
        ...newActive,
        [name]: true
      };
    }

    console.log('shortest path');
    console.log(this.shortestPath(name));
    let points = [0, false];
    let activeSkills = Object.keys(newActive);
    let activeSkillsByName = skills.reduce(
      (acc, cur) => activeSkills.indexOf(cur.name) > -1
        ? {...acc, [cur.name]: cur}
        : acc
      , {}
    );

    const infinity = 9999999; // this is basically infinity
    let addedSkills = [];
    while (activeSkills.length > 0) {
      let nextSkill = {cost: infinity}, pos;
      activeSkills.forEach((skill, i) => {
        let activeSkill = activeSkillsByName[skill];
        let cost = activeSkill.cost;
        let pathCost = infinity;

        if (addedSkills.length) {
          let paths = this.shortestPath(activeSkill.name);
          addedSkills.forEach(addedSkill => {
            if (
              addedSkill !== activeSkill.name &&
              paths[addedSkill] &&
              paths[addedSkill] < pathCost
            ) {
              pathCost = paths[addedSkill];
            }
          });
          console.log(pathCost);
        }

        if (pathCost < infinity) {
          cost = pathCost;
        }
        if (cost < nextSkill.cost) {
          nextSkill = {...activeSkill};
          if (pathCost < infinity) {
            nextSkill.cost += cost;
          }
          pos = i;
        }
      });

      let special = points[1] || nextSkill.special === true;
      let newTotal = special ? points[0] : points[0] + nextSkill.cost;
      points = [newTotal, special];

      addedSkills.push(nextSkill.name);
      activeSkills = activeSkills.slice(0, pos).concat(activeSkills.slice(pos + 1));
    }

    this.setState({
      active: newActive,
      points,
    });
  }
  highlightSkills(skills) {
    skills = skills || [];
    let highlight = {};
    skills.forEach(skill => highlight[skill[0]] = skill[1]);
    this.setState({highlight});
  }
  render() {
    const {active, highlight, nodeEdges, points} = this.state;

    return (
      <div className='diagram'>
        <div className={css(styles.legend)}>
          {points[0]} total point{points[0] !== 1 ? 's' : ''}
          {points[1] && <p><b>Special Modifier</b></p>}
        </div>
        {skills.map(
          skill => <Skill
            key={skill.name} {...skill}
            active={active[skill.name]}
            highlight={highlight[skill.name]}
            onClick={() => this.toggleSkill(skill.name)}
            onMouseLeave={() => this.highlightSkills([])}
            onMouseOver={() => this.highlightSkills(nodeEdges[skill.name])}
          />
        )}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  legend: {
    backgroundColor: 'white',
    border: '1px solid black',
    boxShadow: '5px 5px',
    fontFamily: "'Voltaire', sans-serif",
    fontSize: '18pt',
    left: '65%',
    padding: 16,
    position: 'absolute',
    textAlign: 'center',
    top: 100,
    width: 200,
  },
});

export default App;
