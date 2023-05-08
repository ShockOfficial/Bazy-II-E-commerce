import { rem, createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
	quantityBox: {
		width: rem(50),
		height: rem(50),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '0',
		fontSize: rem(24),

		':disabled': {
			color: 'white'
		}
	},

	price: {
		lineHeight: rem(300),
		fontSize: rem(20)
	}
}));
