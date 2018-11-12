// 格式化时间段
export const formatDuration = (milliseconds, hasHours = false) => {
	if (hasHours) {
		const hours = parseInt(milliseconds / 3600 / 1000, 10);
		const minutes = parseInt(milliseconds / 60 / 1000 - hours * 60, 10);
		const seconds = parseInt(milliseconds / 1000 - hours * 3600 - minutes * 60, 10);

		return `${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
	}

	const minutes = parseInt(milliseconds / 60 / 1000, 10);
	const seconds = parseInt(milliseconds / 1000 - minutes * 60, 10);

	return `${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
	};