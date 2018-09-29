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
        NodeContainer({
          name: "user",
          label: "user",
          x: 0,
          y: 256,
          width: 96,
          height: 48
        })
      ],
      [
        "loadbalancer",
        NodeContainer({
          name: "loadbalancer",
          label: "load balancer",
          x: 128,
          y: 256,
          width: 96,
          height: 48
        })
      ],
      [
        "appserver1",
        NodeContainer({
          name: "appserver1",
          label: "appserver",
          x: 256,
          y: 196,
          width: 96,
          height: 48
        })
      ],
      [
        "appserver2",
        new NodeContainer({
          name: "appserver2",
          label: "appserver",
          x: 256,
          y: 256,
          width: 96,
          height: 48
        })
      ],
      [
        "appserver3",
        new NodeContainer({
          name: "appserver3",
          label: "appserver",
          x: 256,
          y: 320,
          width: 96,
          height: 48
        })
      ],
      [
        "db",
        new NodeContainer({
          name: "db",
          label: "database",
          x: 512,
          y: 256,
          width: 96,
          height: 48
        })
      ]
    ]);

    let edges = Map([
      [
        "user-load",
        EdgeContainer({ name: "request", from: "user", to: "loadbalancer" })
      ],
      [
        "load-app1",
        new EdgeContainer({
          name: "loadbalancer",
          from: "loadbalancer",
          to: "appserver1"
        })
      ],
      [
        "load-app2",
        new EdgeContainer({
          name: "loadbalancer",
          from: "loadbalancer",
          to: "appserver2"
        })
      ],
      [
        "load-app3",
        new EdgeContainer({
          name: "loadbalancer",
          from: "loadbalancer",
          to: "appserver3"
        })
      ]
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

    let edgeElements = <Edge gridStep={gridStep} paths={paths} />;

    return (
      <div className="App">
        {edgeElements}
        {nodeElements}
      </div>
    );
  }
}

export default App;
