import { Formik } from 'formik';

import { Checkbox, Stack, Flex, Button } from '@chakra-ui/react';
import { LockIcon, AtSignIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import FormTextField from '../../../components/field/FormTextField';
import AuthTextField from '../../../components/field/AuthTextField';

function AsteriskSettings() {
	return (
		<>
			<div className={'card w-full p-6 bg-base-100 shadow-xl mt-0'}>
				{/** Card Body */}
				<div className="h-full w-full pb-6 bg-base-100">
					<Formik>
						{(formik) => (
							<>
								<Stack flex="1" as="form" onSubmit={formik.handleSubmit}>
									<Stack spacing={5}>
										<Checkbox size="lg" colorScheme="green" spacing="1rem" className="text-md font-semibold">
											Use local Asterisk server
										</Checkbox>
										<Flex gap={8} flexDirection={{ base: 'column', md: 'row' }}>
											<FormTextField name="server" label="Server" placeholder="Enter your Full Name" isDisabled="" />
											<FormTextField name="sshPort" label="SSH Port" placeholder="abc@gmail.com" isDisabled="" />
											<FormTextField name="connectorPort" label="Connector Port" placeholder="abc@gmail.com" isDisabled="" />
										</Flex>
										<Flex gap={8} flexDirection={{ base: 'column', md: 'row' }}>
											<AuthTextField name="email" label="Email" placeholder="Email" leftIcon={<AtSignIcon />} />
											<AuthTextField name="password" label="Password" placeholder="********" type="password" leftIcon={<LockIcon />} rightIcon={<ViewIcon />} hideIcon={<ViewOffIcon />} />
										</Flex>
									</Stack>
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

export default AsteriskSettings;
