import React, { Component } from 'react';
import './App.css';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/monokai';

let dagre = require("dagre");

class App extends Component {
  render() {
    let g = new dagre.graphlib.Graph();

    g.setGraph({});

    g.setDefaultEdgeLabel(function() { return {}; });

    g.setNode("in1", { label: "in node 1", width: 128, height: 128 });
    g.setNode("in2", { label: "in node 2", width: 128, height: 128 });
    g.setNode("out1", { label: "out node 1", width: 128, height: 128 });

    g.setEdge("in1", "out1");
    g.setEdge("in1", "out1");

    dagre.layout(g);

    let nodes = g.nodes().map(nodeName => {
        let node = g.node(nodeName);
        let style = {
          left: node.x,
          top: node.y,
          position: 'absolute',
          width: node.width,
          height: node.height,
          backgroundColor: "#555555"
        };
        return (
          <div style={style}>
            <p>{node.label}</p>
          </div>
        );
      }
    );

    return (
      <div className="App">
        {nodes}
      </div>
    );
  }
}

export default App;
