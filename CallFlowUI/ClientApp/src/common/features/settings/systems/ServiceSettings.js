import { Formik } from 'formik';

import { Checkbox, Stack, Flex, Button } from '@chakra-ui/react';
import { LockIcon, AtSignIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import FormTextField from '../../../components/field/FormTextField';
import AuthTextField from '../../../components/field/AuthTextField';

function ServiceSettings() {
	return (
		<>
			<div className={'card w-full p-6 bg-base-100 shadow-xl mt-0'}>
				{/** Card Body */}
				<div className="h-full w-full pb-6 bg-base-100">
					<Formik>
						{(formik) => (
							<>
								<Stack flex="1" as="form" onSubmit={formik.handleSubmit}>
									<Flex gap={8} flexDirection={{ base: 'column', md: 'row' }}>
										<FormTextField name="googleKey" label="Google Key" placeholder="Enter your Google Key" isDisabled="" isTextAreaField="true" height="330px" />
									</Flex>
								</Stack>
							</>
						)}
					</Formik>
				</div>

				<div className="divider"></div>

				{/** Card Footer */}
				<div className="card-footer">
					<div className="flex justify-end">
						<Button colorScheme="green" variant="solid" size="md">
							Save
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ServiceSettings;
