import { MultiSelect } from '@mantine/core';

import classes from './index.module.css';

export default MultiSelect.extend({
  defaultProps: {
    size: 'md',
    checkIconPosition: 'right',
  },
  classNames: classes,
});
