import {
  INodeFunctionBaseParams,
  createNodeDescriptor,
} from '@cognigy/extension-tools';
import axios, { AxiosResponse } from 'axios';

export interface IMyNodeParams extends INodeFunctionBaseParams {
  config: {
    text: string;
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
      key: 'text',
      label: 'Enter UserId',
      type: 'cognigyText',
      description: 'User Id to fetch User details',
    },
  ],
  function: async ({ cognigy, config }: IMyNodeParams) => {
    const { api } = cognigy;
    const { text } = config;

    const res: AxiosResponse<User> = await axios.get(
      `https://jsonplaceholder.typicode.com/users/3`
    );
    api.output(text, null);
    api.output(
      `Hello ${res.data.name}
      Username: ${res.data.username}
      email: ${res.data.email}
      phone: ${res.data.phone}`,
      null
    );
  },
});
