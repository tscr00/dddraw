import React, { Component } from 'react';
import './App.css';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/monokai';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AceEditor
          mode="yaml"
          theme="monokai"
          name="code-editor"
          width={512}
          height={512}
          showGutter={false}
          editorProps={{$blockScrolling: true}}
        />
      </div>
    );
  }
}

export default App;
