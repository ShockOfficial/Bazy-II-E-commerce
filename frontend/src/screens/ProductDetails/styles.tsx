import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	carousel: {
		flexBasis: '50%',
		[theme.fn.smallerThan('sm')]: {
			flexBasis: '100%'
		}
	},

	space: {
		paddingBlock: 40,
		[theme.fn.smallerThan('sm')]: {
			flexBasis: '100%',
			flexDirection: 'column'
		}
	},

	informations: {
		flexBasis: '50%',
		paddingLeft: '10%',
		paddingRight: '4%',
		marginTop: rem(16),
		[theme.fn.smallerThan('sm')]: {
			flexBasis: '100%'
		}
	},

	title: {
		fontFamily: 'serif'
	},

	name: {
		fontFamily: 'sans-serif',
		fontSize: rem(24),
		fontWeight: 'bold'
	},

	price: {
		fontSize: rem(24),
		fontWeight: 'bold',
		color: '#de000c'
	},

	span: {
		fontSize: '12px',
		fontWeight: 600,
		color: '#d7d8da',
		marginTop: rem(6)
	},

	rating: {
		display: 'flex',
		justifyContent: 'flex-start',
		marginBlock: rem(60)
	},

	reviewsNumber: {
		fontSize: rem(28),
		fontWeight: 600,
		marginLeft: '16px'
	}
}));
