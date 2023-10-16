import React from 'react';
import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, Flex, Box, Stack, Button, HStack, Heading } from '@chakra-ui/react';
import { Formik } from 'formik';
import FormTextField from '../field/FormTextField';

function DynamicDrawer(props) {
	const { isAddEditOpen, onAddEditClose, editData, setEditData, initialValues, validationSchema, drawerFieldData, position, size, handleEdit, handleCreate, titleArray, disableSubmit } = props;
	const btnRef = React.useRef();
	const handleClose = () => {
		setEditData({});
		onAddEditClose();
	};
	return (
		<Drawer isOpen={isAddEditOpen} placement={position ?? 'right'} onClose={handleClose} finalFocusRef={btnRef} size={size ?? 'md'}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerBody>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values, actions) => {
							// console.log("actions", actions);
							// alert(JSON.stringify(values, null, 2));
							if (Object.keys(editData).length > 0) {
								handleEdit(values);
							} else {
								handleCreate(values);
							}
							actions.resetForm();
						}}
					>
						{(formik) => (
							<Stack display="flex" as="form" onSubmit={formik.handleSubmit}>
								<HStack>
									<Heading flex="1" fontSize="2xl">
										{titleArray ? (Object.keys(editData).length > 0 ? titleArray[0] : titleArray[1]) : Object.keys(editData).length > 0 ? 'Edit' : 'Add'}
									</Heading>
									<Flex justifyContent="flex-end">
										<Button variant="outline" mr={3} onClick={handleClose}>
											Cancel
										</Button>
										<Button type="submit" colorScheme="blue" isDisabled={disableSubmit ? true : false}>
											Save
										</Button>
									</Flex>
								</HStack>
								<Box flex="1">{drawerFieldData && drawerFieldData.map((item) => <FormTextField formik={formik} key={item.name} {...item} />)}</Box>
							</Stack>
						)}
					</Formik>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}

export default DynamicDrawer;
