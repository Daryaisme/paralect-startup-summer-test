import { TextInput } from '@mantine/core';

import classes from './index.module.css';

export default TextInput.extend({
  defaultProps: {
    size: 'md',
  },
  classNames: classes,
});
