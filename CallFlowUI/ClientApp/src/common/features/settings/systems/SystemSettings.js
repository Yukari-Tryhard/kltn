import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AsteriskSettings from './AsteriskSettings';
import ServiceSettings from './ServiceSettings';

function SystemSettings() {
	return (
		<>
			<Tabs isFitted variant="line" colorScheme="green">
				{/* Tab bar */}
				<TabList mb="1em">
					<Tab>ASTERISK</Tab>
					<Tab>SERVICE</Tab>
				</TabList>

				{/* Tab panels */}
				<TabPanels>
					<TabPanel>
						<AsteriskSettings />
					</TabPanel>
					<TabPanel>
						<ServiceSettings />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	);
}

export default SystemSettings;
