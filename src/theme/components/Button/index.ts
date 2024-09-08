import { Button } from '@mantine/core';

import classes from './index.module.css';

export default Button.extend({
  defaultProps: {
    size: 'sm',
    color: 'purple.5',
    variant: 'filled',
  },

  classNames: classes,
});
