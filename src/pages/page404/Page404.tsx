import { FC } from 'react';
import { Box, Button, Center, Image, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './Page404.module.css';
import Logo from '../../components/logo/Logo';
import noData from '../../assets/images/404.svg';

const Page404: FC = () => {
  const navigate = useNavigate();

  return (
    <Center className={classes.container}>
      <Box className={classes.logoContainer}>
        <Logo />
      </Box>

      <Image src={noData} w={656} />

      <Stack gap={16} align="center">
        <Text fw={600} fz={20}>
          We can’t find the page you are looking for
        </Text>

        <Button
          variant="filled"
          px={20}
          py={10}
          onClick={() => navigate('/')}
        >
          Go Home
        </Button>
      </Stack>
    </Center>
  );
}

export default Page404;
