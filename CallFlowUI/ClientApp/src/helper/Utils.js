import { URL_ENCODE_SECRET } from '../env';

// Function to get the secret key
async function getKey(secretKey) {
	const encoder = new TextEncoder();

	const secretKeyBuffer = encoder.encode(secretKey);
	const importedKey = await window.crypto.subtle.importKey(
		'raw',
		secretKeyBuffer,
		{
			name: 'RSA-OAEP'
		},
		false,
		['encrypt', 'decrypt']
	);
	return secretKeyBuffer;
}

// Function to convert file to base64 format
const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
	});

// Function to encode the array to an encrypted string
async function encodeArrayToString(array, secretKey) {
	const arrayString = JSON.stringify(array);
	const encoder = new TextEncoder();
	const data = encoder.encode(arrayString);
	const secretKeyBuffer = await getKey(secretKey);
	return await window.crypto.subtle.encrypt(
		{
			name: 'RSA-OAEP'
		},
		secretKeyBuffer,
		data
	);
}

// Function to decode the encrypted string back to the original array
async function decodeStringToArray(encryptedString, secretKey) {
	const secretKeyBuffer = await getKey(secretKey);
	return window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, secretKeyBuffer, encryptedString);
}

export { toBase64, encodeArrayToString, decodeStringToArray };
