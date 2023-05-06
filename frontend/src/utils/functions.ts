export const convertToBase64 = (imgFile: File) => {
	if (!imgFile) return null;

	const blob = new Blob([imgFile], { type: 'image/png' });
	const reader = new FileReader();
	reader.readAsDataURL(blob);

	return new Promise((resolve, reject) => {
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = (error) => {
			reject(error);
		};
	});
};
