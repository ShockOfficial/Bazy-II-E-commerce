import { useState } from 'react';
import {
	Container,
	UnstyledButton,
	Group,
	Text,
	Menu,
	Tabs,
	Burger,
	rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
	IconLogout,
	IconChevronDown,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { useStyles } from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../../redux/features/user/authSlice';

interface HeaderProps {
	tabs: string[];
}

export function Header({ tabs }: HeaderProps) {
	const { classes, cx } = useStyles();
	const [opened, { toggle }] = useDisclosure(false);
	const [userMenuOpened, setUserMenuOpened] = useState(false);

	const { user } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		// then method so it doesn't redirect back to home page
		dispatch(logout())
			.then(() => {
				dispatch(reset());
				navigate('/signup');
			});
	}

	const items = tabs.map((tab) => (
		<Tabs.Tab value={tab} key={tab}>
			{tab}
		</Tabs.Tab>
	));

	return (
		<div className={classes.header}>
			<Container className={classes.mainSection}>
				<Group position='apart'>
					<MantineLogo size={28} />

					<Burger
						opened={opened}
						onClick={toggle}
						className={classes.burger}
						size='sm'
					/>

					<Menu
						width={260}
						position='bottom-end'
						transitionProps={{ transition: 'pop-top-right' }}
						onClose={() => setUserMenuOpened(false)}
						onOpen={() => setUserMenuOpened(true)}
						withinPortal
					>
						<Menu.Target>
							<UnstyledButton
								className={cx(classes.user, {
									[classes.userActive]: userMenuOpened,
								})}
							>
								<Group spacing={7}>
									<Text weight={500} size='sm' sx={{ lineHeight: 1 }} mr={3}>
										{user ? user.email : `user's email`}
									</Text>
									<IconChevronDown size={rem(12)} stroke={1.5} />
								</Group>
							</UnstyledButton>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item onClick={onLogout} icon={<IconLogout size='0.9rem' stroke={1.5} />}>
								Logout
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Container>
			<Container>
				<Tabs
					defaultValue='Home'
					variant='outline'
					classNames={{
						root: classes.tabs,
						tabsList: classes.tabsList,
						tab: classes.tab,
					}}
				>
					<Tabs.List>{items}</Tabs.List>
				</Tabs>
			</Container>
		</div>
	);
}
