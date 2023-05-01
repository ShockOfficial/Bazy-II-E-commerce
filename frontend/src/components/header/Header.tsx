import React, { useState } from 'react';
import {
	Container,
	Header as MantineHeader,
	Group,
	Text,
	Paper,
	Transition,
	Burger
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { HEADER_HEIGHT, useStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../Routes/routes';
import Menu from '../Menu/Menu';
import { useAuthContext } from '../../hooks/useAuthContext';

export function Header() {
	const { classes, cx } = useStyles();
	const [opened, { toggle, close }] = useDisclosure(false);
	const [active, setActive] = useState('Home');
	const navigate = useNavigate();
	const { user } = useAuthContext();
	const tabs = [
		{ title: 'Home', onClick: () => navigate(AppRoutes.HOME) },
		{ title: 'Free Drop', onClick: () => navigate(AppRoutes.FREE_DROP) },
		{ title: 'Marketplace', onClick: () => navigate(AppRoutes.MARKETPLACE) }
	];

	const items = tabs.map((tab) => (
		<p
			key={tab.title}
			onClick={() => {
				tab.onClick();
				setActive(tab.title);
				close();
			}}
			className={cx(classes.link, {
				[classes.linkActive]: active === tab.title
			})}
		>
			{tab.title}
		</p>
	));

	return (
		<MantineHeader height={HEADER_HEIGHT} className={classes.root}>
			<Container className={classes.header}>
				<MantineLogo size={28} />
				<Group spacing={5} className={classes.links}>
					{items}
				</Group>
				<Burger
					opened={opened}
					onClick={toggle}
					className={classes.burger}
					size="sm"
				/>
				<Transition transition="pop-top-right" duration={200} mounted={opened}>
					{(styles) => (
						<Paper className={classes.dropdown} style={styles}>
							{items}
							{user && <Menu maxWidth />}
						</Paper>
					)}
				</Transition>
				{user && (
					<Group position="apart" m={0}>
						<Group className={classes.walletContainer}>
							<IconCurrencyDollar size="1.5rem" stroke={1.5} color="gold" />
							<Text weight={700} size="sm" ml={0}>
								1000
							</Text>
						</Group>
						<Menu />
					</Group>
				)}
			</Container>
		</MantineHeader>
	);
}
