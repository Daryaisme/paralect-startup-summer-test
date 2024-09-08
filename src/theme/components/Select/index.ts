import { Select } from '@mantine/core';

import classes from './index.module.css';

export default Select.extend({
  defaultProps: {
    size: 'md',
    checkIconPosition: 'right',
  },
  classNames: classes,
});
