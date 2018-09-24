import React, { Component } from "react";
import "./App.css";

import Draggable from "react-draggable";
import { Map } from "immutable";

import rerouteEdges from "./common/graph";
import Node from "./Node";
import Edge from "./Edge";
import { NodeContainer, EdgeContainer, Scene } from "./common/containers";

class App extends Component {
  constructor(props) {
    super(props);

    // temporary settings for testing
    let nodes = Map([
      [
        "user",
        NodeContainer({ name: "user", label: "user", width: 96, height: 64 })
      ],
      [
        "loadbalancer",
        NodeContainer({
          name: "loadbalancer",
          label: "load balancer",
          width: 96,
          height: 64
        })
      ],
      [
        "appserver1",
        NodeContainer({
          name: "appserver1",
          label: "appserver",
          width: 96,
          height: 64
        })
      ]
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

    let edges = Map([
      [
        "user-load",
        EdgeContainer({ name: "request", from: "user", to: "loadbalancer" })
      ]
      // new EdgeContainer('loadbalancer', 'appserver1', 'forward', 0, 0),
      // new EdgeContainer('loadbalancer', 'appserver2', 'forward', 0, 0),
      // new EdgeContainer('loadbalancer', 'appserver3', 'forward', 0, 0),
      // new EdgeContainer('appserver1', 'db', 'sql', 0, 0),
      // new EdgeContainer('appserver2', 'db', 'sql', 0, 0),
      // new EdgeContainer('appserver3', 'db', 'sql', 0, 0),
    ]);

    let scene = Scene({ nodes: nodes, edges: edges });

    this.state = {
      scene
    };
  }

  render() {
    const gridStep = 16;
    let scene = this.state.scene;

    const paths = rerouteEdges(scene.nodes, scene.edges, gridStep);

    let {
      scene: { nodes, edges }
    } = this.state;

    let nodeElements = Array.from(nodes.values()).map(node => {
      const changeCoords = (e, ui) => {
        const x = Math.max(0, ui.x);
        const y = Math.max(0, ui.y);

        const translatedNode = node.set("x", x).set("y", y);
        const updatedNodes = nodes.set(node.name, translatedNode);
        const updatedScene = scene.set("nodes", updatedNodes);

        this.setState(state => {
          return { scene: updatedScene };
        });
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
      <Edge key={`${edge.from}-${edge.to}`} gridStep={gridStep} paths={paths} />
    ));

    return (
      <div className="App">
        {edgeElements}
        {nodeElements}
      </div>
    );
  }
}

export default App;
