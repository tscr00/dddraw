import React, { Component } from 'react';
import './App.css';

import updateLayout from './common/graph';
import Node from './Node';
import Edge from './Edge';

import {NodeContainer, EdgeContainer, Scene} from './common/containers';

// import brace from 'brace';
// import AceEditor from 'react-ace';
// import 'brace/mode/yaml';
// import 'brace/theme/monokai';


class App extends Component {

  constructor(props) {
    super(props);

    // temporary settings for testing
    let nodes = [
      new NodeContainer('user', null, 'user', 0, 0, 128, 64),
      new NodeContainer('loadbalancer', null, 'load balancer', 0, 0, 128, 64),
      new NodeContainer('appserver1', null, 'appserver', 0, 0, 128, 64),
      new NodeContainer('appserver2', null, 'appserver', 0, 0, 128, 64),
      new NodeContainer('appserver3', null, 'appserver', 0, 0, 128, 64),
      new NodeContainer('db', null, 'database', 0, 0, 128, 64),
    ];

    let edges = [
      new EdgeContainer('user', 'loadbalancer', 'request', 0, 0),
      new EdgeContainer('loadbalancer', 'appserver1', 'forward', 0, 0),
      new EdgeContainer('loadbalancer', 'appserver2', 'forward', 0, 0),
      new EdgeContainer('loadbalancer', 'appserver3', 'forward', 0, 0),
      new EdgeContainer('appserver1', 'db', 'sql', 0, 0),
      new EdgeContainer('appserver2', 'db', 'sql', 0, 0),
      new EdgeContainer('appserver3', 'db', 'sql', 0, 0),
    ];

    let scene = new Scene(nodes, edges);

    updateLayout(scene.nodes, scene.edges);

    this.state = {
      scene
    };
  }

  render() {
    let {
      nodes,
      edges,
    } = this.state.scene;

    let nodeElements = nodes.map(node => <Node key={node.name} nodeContainer={node} />);
    let edgeElements = edges.map(edge => <Edge key={`${edge.from}-${edge.to}`} edgeContainer={edge} />);

    return (
      <div className="App">
        {nodeElements}
        {edgeElements}
      </div>
    );
  }
}

export default App;
