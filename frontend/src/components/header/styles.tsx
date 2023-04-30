import { createStyles, rem } from '@mantine/core';

// export const useStyles = createStyles((theme) => ({
// 	header: {
// 		paddingTop: theme.spacing.sm,
// 		backgroundColor:
// 			theme.colorScheme === 'dark'
// 				? theme.colors.dark[6]
// 				: theme.colors.gray[0],
// 		borderBottom: `${rem(1)} solid ${
// 			theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
// 		}`,
// 		marginBottom: rem(10),
// 	},

// 	mainSection: {
// 		paddingBottom: theme.spacing.sm,
// 	},

// 	user: {
// 		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
// 		padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
// 		borderRadius: theme.radius.sm,
// 		transition: 'background-color 100ms ease',

// 		'&:hover': {
// 			backgroundColor:
// 				theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
// 		},

// 		[theme.fn.smallerThan('xs')]: {
// 			display: 'none',
// 		},
// 	},

// 	burger: {
// 		[theme.fn.largerThan('xs')]: {
// 			display: 'none',
// 		},
// 	},

// 	userActive: {
// 		backgroundColor:
// 			theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
// 	},

// 	tabs: {
// 		[theme.fn.smallerThan('sm')]: {
// 			display: 'none',
// 		},
// 	},

// 	tabsList: {
// 		borderBottom: '0 !important',
// 	},

// 	tab: {
// 		fontWeight: 500,
// 		height: rem(38),
// 		backgroundColor: 'transparent',

// 		'&:hover': {
// 			backgroundColor:
// 				theme.colorScheme === 'dark'
// 					? theme.colors.dark[5]
// 					: theme.colors.gray[1],
// 		},

// 		'&[data-active]': {
// 			backgroundColor:
// 				theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
// 			borderColor:
// 				theme.colorScheme === 'dark'
// 					? theme.colors.dark[7]
// 					: theme.colors.gray[2],
// 		},
// 	},
// }));

export const HEADER_HEIGHT = 95;

export const useStyles = createStyles((theme) => ({
	root: {
		position: 'relative',
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[6]
				: theme.colors.gray[0],
		borderBottom: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
		}`,
		zIndex: 1
	},

	dropdown: {
		position: 'absolute',
		top: HEADER_HEIGHT,
		left: 0,
		right: 0,
		zIndex: 0,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopWidth: 0,
		overflow: 'hidden',
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[6]
				: theme.colors.gray[0],
		borderBottom: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
		}`,

		[theme.fn.largerThan('sm')]: {
			display: 'none'
		}
	},

	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%'
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none'
		}
	},

	burger: {
		[theme.fn.largerThan('sm')]: {
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
		},

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
	},

	tabs: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none'
		}
	},

	tabsList: {
		borderBottom: '0 !important'
	},

	tab: {
		fontWeight: 500,
		height: rem(38),
		backgroundColor: 'transparent',

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[1]
		},

		'&[data-active]': {
			backgroundColor:
				theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
			borderColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[7]
					: theme.colors.gray[2]
		}
	},

	walletContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '1.5rem 1rem',
		borderRadius: '0.5rem',
		gap: 0,
		backgroundColor: theme.colors.dark[7]
	}
}));
