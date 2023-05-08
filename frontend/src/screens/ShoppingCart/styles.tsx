import { rem, createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
	tableHead: {
		lineHeight: rem(50)
	},

	spacer: {
		borderTop: '0.0625rem solid #373A40'
	},

	box: {
		display: 'flex',
		alignItems: 'center',
		padding: rem(15),
		width: rem(200),
		marginTop: rem(25)
	},

	priceBox: {
		justifyContent: 'space-between',
		border: '0.0625rem solid #373A40'
	},

	checkoutBox: {
		padding: 0,
		paddingBottom: rem(25),
		gap: rem(4)
	},

	checkoutIcon: {
		background: '#1971c2',
		height: '100%',
		width: '20%',
		padding: rem(4)
	},

	checkoutButton: {
		borderRadius: '0',
		width: '80%',
		height: '100%'
	}
}));
