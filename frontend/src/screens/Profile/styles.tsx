import { createStyles, getStylesRef, rem } from '@mantine/core';
export const useStyles = createStyles(() => ({
	avatar: {
		['&:hover .mantine-Avatar-image']: {
			transition: 'filter 200ms ease',
			filter: 'blur(8px)'
		},
		[`&:hover .${getStylesRef('avatarText')}`]: {
			opacity: 1,
			transform: 'translate(-50%, -50%) scale(1)'
		}
	},
	avatarText: {
		ref: getStylesRef('avatarText'),
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%) scale(0)',
		color: '#0f0f0f',
		opacity: 0,
		transitionProperty: 'opacity, transform',
		transitionDuration: '200ms',
		transitionTimingFunction: 'ease'
	},
	input: {
		outline: 'none',
		border: 'none',
		background: 'transparent',
		fontWeight: 700,
		textAlign: 'center',
		paddingTop: '1.5rem',
		color: 'wheat'
	}
}));
