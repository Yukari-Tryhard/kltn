import React, { useState, useEffect } from 'react';

function ErrorBoundary(props) {
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		setHasError(false);
	}, [props.children]);

	return hasError ? <div>Something went wrong!</div> : props.children;
}

export default ErrorBoundary;
