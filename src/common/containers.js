import { Record, Map } from 'immutable';

export const NodeContainer = Record({
  name: '',
  icon: null,
  label: 'block',
  x: 0,
  y: 0,
  width: 128,
  height: 64
});

export const EdgeContainer = Record({
  name: '',
  from: null,
  to: null,
  label: '',
  points: []
});

export const Scene = Record({ nodes: Map(), edges: Map() });
