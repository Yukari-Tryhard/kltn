import { FormControl, FormErrorMessage, FormLabel, InputGroup, Textarea, InputLeftElement, InputRightElement, Input, Select, Spinner } from '@chakra-ui/react';
import 'react-phone-number-input/style.css';
import { Field, useField } from 'formik';
import { useState } from 'react';

import RadioGenderField from '../field/RadioGenderField';
import AddressSelection from './AddressSelection';
import CustomSelection from './CustomSelection';
import NumberField from './NumberField';

function FormTextField(props) {
	const {
		leftIcon,
		rightIcon,
		hideIcon,
		isRequired,
		label,
		type,
		placeholder,
		selectionArray,
		arrayGender,
		handleOnChange,
		formik,
		size,
		isNumber,
		isDateField,
		isTextAreaField,
		isGender,
		isSelectionField,
		isCustomSelectionField,
		isAddress,
		isResize,
		isReadOnly,
		height,
		isDisabled,
		isLoading,
		isPassword,
		isTimeField
	} = props;

	const [field, meta] = useField(props);
	const [isShow, setIsShow] = useState(true);
	const handleShow = () => {
		setIsShow((prev) => !prev);
	};
	const [, setFilteredSelectionArray] = useState(selectionArray);
	const handleSearch = (value) => {
		const filteredArray = selectionArray.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
		setFilteredSelectionArray(filteredArray);
	};

	if (isDateField) {
		return (
			<FormControl
				isReadOnly={isReadOnly}
				isRequired={isRequired}
				isDisabled={isDisabled}
				isInvalid={meta.error && meta.touched}
				onChange={(e) => {
					if (handleOnChange) {
						handleOnChange(e.target.value);
					}
				}}
			>
				{label && <FormLabel>{label}</FormLabel>}
				<InputGroup>
					<Input {...field} type={type ?? 'date'} />
				</InputGroup>
				<FormErrorMessage>{meta.error}</FormErrorMessage>
			</FormControl>
		);
	} else if (isTimeField) {
		return (
			<FormControl isReadOnly={isReadOnly} isRequired={isRequired} isDisabled={isDisabled} isInvalid={meta.error && meta.touched}>
				{label && <FormLabel>{label}</FormLabel>}
				<InputGroup>
					<Input {...field} type={type ?? 'time'} />
				</InputGroup>
				<FormErrorMessage>{meta.error}</FormErrorMessage>
			</FormControl>
		);
	} else if (isTextAreaField) {
		return (
			<FormControl isReadOnly={isReadOnly} isRequired={isRequired} isDisabled={isDisabled} isInvalid={meta.error && meta.touched}>
				{label && <FormLabel>{label}</FormLabel>}
				<Textarea {...field} resize={isResize ?? 'none'} height={height ?? 'none'} size={size ?? 'md'} placeholder={placeholder ?? ''} rows={4} />
				<FormErrorMessage>{meta.error}</FormErrorMessage>
			</FormControl>
		);
	} else if (isGender) {
		return (
			<FormControl my={3} isReadOnly={isReadOnly} isRequired={isRequired} isDisabled={isDisabled} isInvalid={meta.error && meta.touched}>
				{label && <FormLabel>{label}</FormLabel>}
				<Field
					{...field}
					arrayGender={arrayGender}
					as={RadioGenderField}
					onChange={(e) => {
						formik.setFieldValue('gender', e);
					}}
					onBlur={formik.handleBlur}
				/>
			</FormControl>
		);
	} else if (isSelectionField) {
		return (
			<FormControl
				isReadOnly={isReadOnly}
				isRequired={isRequired}
				isDisabled={isDisabled}
				isInvalid={meta.error && meta.touched}
				onChange={(e) => {
					if (handleOnChange) {
						handleOnChange(e.target.value);
					}
				}}
			>
				{label && <FormLabel>{label}</FormLabel>}
				{isLoading ? (
					<Spinner />
				) : (
					<>
						<input type="text" placeholder="Search..." onChange={(e) => handleSearch(e.target.value)} />
						<Select pointerEvents={isReadOnly ? 'none' : ''} {...field} placeholder={placeholder ?? ''}>
							{selectionArray &&
								selectionArray.map((item, index) => (
									<option key={index} value={item.value}>
										{item.label}
									</option>
								))}
						</Select>
					</>
				)}
				<FormErrorMessage>{meta.error}</FormErrorMessage>
			</FormControl>
		);
	} else if (isCustomSelectionField) {
		return (
			<FormControl isReadOnly={isReadOnly} isRequired={isRequired} isDisabled={isDisabled} isInvalid={meta.error && meta.touched}>
				{label && <FormLabel>{label}</FormLabel>}
				<Field {...field} formik={formik} placeholder={placeholder} selectionArray={selectionArray} as={CustomSelection} />
				<FormErrorMessage>{meta.error}</FormErrorMessage>
			</FormControl>
		);
	} else if (isAddress) {
		return (
			<FormControl isReadOnly={isReadOnly} isRequired={isRequired} isDisabled={isDisabled} isInvalid={meta.error && meta.touched}>
				{label && <FormLabel>{label}</FormLabel>}
				<Field {...field} isDisabled={isDisabled} isReadOnly={isReadOnly} isRequired={isRequired} formik={formik} as={AddressSelection} />
				<FormErrorMessage>{meta.error}</FormErrorMessage>
			</FormControl>
		);
	} else if (isPassword) {
		return (
			<FormControl isReadOnly={isReadOnly} isRequired={isRequired} isDisabled={isDisabled} isInvalid={meta.error && meta.touched}>
				<FormLabel>{label}</FormLabel>
				<InputGroup>
					{leftIcon && <InputLeftElement pl={2} children={leftIcon} />}
					{rightIcon && hideIcon && <InputRightElement onClick={handleShow} cursor="pointer" children={isShow ? rightIcon : hideIcon} />}
					{rightIcon && !hideIcon && <InputRightElement cursor="pointer" children={rightIcon} />}
					<Input {...field} type={!isShow ? 'text' : 'password'} placeholder={placeholder ?? ''} />
				</InputGroup>
				<FormErrorMessage>{meta.error}</FormErrorMessage>
			</FormControl>
		);
	} else if (isNumber) {
		return (
			<FormControl isReadOnly={isReadOnly} isRequired={isRequired} isDisabled={isDisabled} isInvalid={meta.error && meta.touched}>
				<FormLabel>{label}</FormLabel>
				<Field {...field} formik={formik} as={NumberField} />
				<FormErrorMessage>{meta.error}</FormErrorMessage>
			</FormControl>
		);
	} else {
		return (
			<FormControl isReadOnly={isReadOnly} isRequired={isRequired} isDisabled={isDisabled} isInvalid={meta.error && meta.touched} >
				{label && <FormLabel>{label}</FormLabel>}
				<InputGroup>
					{leftIcon && <InputLeftElement pl={2} children={leftIcon} />}
					{rightIcon && <InputRightElement pr={2} children={rightIcon} />}
					<Input {...field} type={type ?? 'text'} placeholder={placeholder ?? ''} />
				</InputGroup>
				<FormErrorMessage>{meta.error}</FormErrorMessage>
			</FormControl>
		);
	}
}

export default FormTextField;
