import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'devicon/devicon.css';
import 'devicon/devicon-colors.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
