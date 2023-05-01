import { createStyles, rem } from '@mantine/core';
export const useStyles = createStyles((theme) => ({
	links: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none'
		}
	},

	userActive: {
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white
	},

	user: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white
		}
	},

	maxWidth: {
		width: '100%',
		minHeight: '3rem',
		[theme.fn.largerThan('xs')]: {
			display: 'none'
		}
	},
	hide: {
		[theme.fn.smallerThan('xs')]: {
			display: 'none'
		}
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: `${rem(8)} ${rem(12)}`,
		margin: 0,
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,
		cursor: 'pointer',

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[7]
					: theme.colors.gray[0]
		},

		[theme.fn.smallerThan('sm')]: {
			borderRadius: 0,
			padding: theme.spacing.md
		}
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor
			}).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
				.color
		}
	}
}));
