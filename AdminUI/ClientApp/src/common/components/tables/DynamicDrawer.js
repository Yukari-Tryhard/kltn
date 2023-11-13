import React from 'react';
import { Drawer, DrawerHeader, DrawerBody, DrawerOverlay, DrawerContent, Flex, Box, Stack, Button, HStack, Heading } from '@chakra-ui/react';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';

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
		<Drawer isOpen={isAddEditOpen} placement={position ?? 'right'} onClose={handleClose} finalFocusRef={btnRef} size={size ?? 'sm'}>
			<DrawerOverlay />
			<DrawerContent>
				{/* Header */}
				<DrawerHeader>
					<HStack display="flex" width="100%" className="tool-bar" alignItems="center" gap="15px">
						<HStack display="flex" flex="1" alignItems="center">
							<Flex minWidth="max-content" alignItems="center" gap="2">
								<Flex gap={2}>
									<Box w="10px" bg="green.700" borderRadius="5px" />
									<Heading flex="1" fontSize="2xl">
										{titleArray ? (Object.keys(editData).length > 0 ? titleArray[0] : titleArray[1]) : Object.keys(editData).length > 0 ? 'Edit' : 'Create New'}
									</Heading>
								</Flex>
							</Flex>
						</HStack>

						<HStack
							spacing="10px"
							display="flex"
							gap="10px"
							flex="1"
							marginLeft="0px !important"
							alignItems="center"
							flexDirection={{
								base: 'column',
								md: 'row'
							}}
							justifyContent={{
								base: 'flex-start',
								md: 'flex-end'
							}}
						>
							<HStack marginRight="5px !important">
								<Button leftIcon={<MdOutlineCancel size={18} className="mt-0.5" />} variant="outline" onClick={handleClose} size="md" shadow="2xl" fontSize="xs">
									Cancel
								</Button>
								<Button leftIcon={<AiOutlineCheckCircle size={18} className="mt-0.5" />} type="submit" colorScheme="green" isDisabled={disableSubmit ? true : false} size="md" shadow="2xl" fontSize="xs">
									Save
								</Button>
							</HStack>
						</HStack>
					</HStack>
				</DrawerHeader>

				{/* Body */}
				<DrawerBody borderTopWidth="1px">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values, actions) => {
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
								{drawerFieldData && drawerFieldData.map((item) => <FormTextField formik={formik} key={item.name} {...item} />)}
							</Stack>
						)}
					</Formik>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}

export default DynamicDrawer;
