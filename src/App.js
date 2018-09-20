import React, { Component } from "react";
import "./App.css";

import Draggable from "react-draggable";

import updateLayout from "./common/graph";
import Node from "./Node";
import Edge from "./Edge";
import { NodeContainer, EdgeContainer, Scene } from "./common/containers";

class App extends Component {
  constructor(props) {
    super(props);

    // temporary settings for testing
    let nodes = new Map([
      ["user", new NodeContainer("user", null, "user", 0, 0, 96, 64)],
      [
        "loadbalancer",
        new NodeContainer("loadbalancer", null, "load balancer", 0, 0, 96, 64)
      ],
      // [
      //   "appserver1",
      //   new NodeContainer("appserver1", null, "appserver", 0, 0, 96, 64)
      // ],
      // [
      //   "appserver2",
      //   new NodeContainer("appserver2", null, "appserver", 0, 0, 96, 64)
      // ],
      // [
      //   "appserver3",
      //   new NodeContainer("appserver3", null, "appserver", 0, 0, 96, 64)
      // ],
      // ["db", new NodeContainer("db", null, "database", 0, 0, 96, 64)]
    ]);

    let edges = [
      new EdgeContainer("user", "loadbalancer", "request", 0, 0)
      // new EdgeContainer('loadbalancer', 'appserver1', 'forward', 0, 0),
      // new EdgeContainer('loadbalancer', 'appserver2', 'forward', 0, 0),
      // new EdgeContainer('loadbalancer', 'appserver3', 'forward', 0, 0),
      // new EdgeContainer('appserver1', 'db', 'sql', 0, 0),
      // new EdgeContainer('appserver2', 'db', 'sql', 0, 0),
      // new EdgeContainer('appserver3', 'db', 'sql', 0, 0),
    ];

    let scene = new Scene(nodes, edges);

    this.state = {
      scene
    };
  }

  render() {
    let scene = this.state.scene;

    updateLayout(scene.nodes, scene.edges, 16);

    let { nodes, edges } = this.state.scene;

    let nodeElements = Array.from(nodes.values()).map(node => {
      const changeCoords = (e, ui) => {
        node.x = ui.x;
        node.y = ui.y;
        this.setState({});
      };

      return (
        <Draggable
          position={{ x: node.x, y: node.y }}
          grid={[16, 16]}
          onDrag={changeCoords}
        >
          <div>
            <Node key={node.name} nodeContainer={node} />
          </div>
        </Draggable>
      );
    });

    let edgeElements = edges.map(edge => (
      <Edge key={`${edge.from}-${edge.to}`} edgeContainer={edge} />
    ));

    return (
      <div className="App">
        {nodeElements}
        {edgeElements}
      </div>
    );
  }
}

export default App;
