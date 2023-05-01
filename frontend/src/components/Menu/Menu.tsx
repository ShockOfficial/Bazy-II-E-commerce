import {
	Menu as MantineMenu,
	Group,
	Text,
	UnstyledButton,
	rem
} from '@mantine/core';
import {
	IconChevronDown,
	IconHeart,
	IconLogout,
	IconUser
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { AppRoutes } from '../../Routes/routes';
import { useStyles } from './styles';

const Menu = ({ maxWidth }: { maxWidth?: boolean }) => {
	const { classes, cx } = useStyles();
	const [userMenuOpened, setUserMenuOpened] = useState(false);
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const { logout } = useLogout();

	const onLogout = () => {
		logout();
		navigate(AppRoutes.LOGIN);
	};

	return (
		<MantineMenu
			width={maxWidth ? '100%' : 200}
			position="bottom-end"
			offset={0}
			transitionProps={{ transition: 'pop-top-right' }}
			onClose={() => setUserMenuOpened(false)}
			onOpen={() => setUserMenuOpened(true)}
			withinPortal
		>
			<MantineMenu.Target>
				<UnstyledButton
					className={cx(classes.user, {
						[classes.userActive]: userMenuOpened,
						[classes.maxWidth]: maxWidth,
						[classes.hide]: !maxWidth
					})}
				>
					<Group spacing={7}>
						<Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
							{user ? user.email : 'Guest'}
						</Text>
						<IconChevronDown size={rem(12)} stroke={1.5} />
					</Group>
				</UnstyledButton>
			</MantineMenu.Target>
			<MantineMenu.Dropdown>
				<MantineMenu.Item
					onClick={() => {
						// TODO: Go to profile
						console.log('GO TO PROFILE');
					}}
					icon={<IconUser size="0.9rem" stroke={1.5} />}
				>
					Profile
				</MantineMenu.Item>
				<MantineMenu.Item
					onClick={() => {
						// TODO: Go to favorites
						console.log('GO TO FAVORITES');
					}}
					icon={<IconHeart size="0.9rem" stroke={1.5} />}
				>
					Favourites Products
				</MantineMenu.Item>
				<MantineMenu.Item
					onClick={onLogout}
					icon={<IconLogout size="0.9rem" stroke={1.5} />}
				>
					Logout
				</MantineMenu.Item>
			</MantineMenu.Dropdown>
		</MantineMenu>
	);
};

export default Menu;
