import { Group, Image, Title } from '@mantine/core';
import logo from '../../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';

function Logo() {
  const navigate = useNavigate();

  return (
    <Group gap={12} onClick={() => (navigate('/movies'))}>
      <Image src={logo} h={32} />
      <Title order={1} ff="Poppins" c="purple.5" fz={24} fw={600} lts={-0.5}>
        ArrowFlicks
      </Title>
    </Group>
  );
}

export default Logo;
