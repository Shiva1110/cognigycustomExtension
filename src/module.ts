import { createExtension } from '@cognigy/extension-tools/build';
import { myNode } from './nodes/mynode';

export default createExtension({
  nodes: [myNode],
  connections: [],
});
