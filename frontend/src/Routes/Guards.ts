const getUserInfo = () => {
	const user = localStorage.getItem('user');

	if (!user) return null;

	return JSON.parse(user);
};

export const checkAuthToken = () => {
	const user = getUserInfo();

	if (!user) return false;
	const { token } = user;
	return token ? true : false;
};
