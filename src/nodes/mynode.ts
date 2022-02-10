import {
  INodeFunctionBaseParams,
  createNodeDescriptor,
} from '@cognigy/extension-tools';
import axios from 'axios';

export interface IMyNodeParams extends INodeFunctionBaseParams {
  config: {
    text?: string;
  };
}

export interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export const myNode = createNodeDescriptor({
  type: 'myNode',
  defaultLabel: 'My Node',
  fields: [
    {
      key: 'userId',
      label: 'Enter UserId',
      type: 'cognigyText',
      description: 'User Id to fetch User details',
    },
  ],
  function: async ({ cognigy, config }: IMyNodeParams) => {
    const { api } = cognigy;
    const { text } = config;

    const res: User = await axios.get(
      'https://jsonplaceholder.typicode.com/users/1'
    );
    api.say &&
      api.say(
        `Hello ${res.name}
    username: ${res.username}
    email: ${res.email}
    phone: ${res.phone}`,
        null
      );
  },
});
