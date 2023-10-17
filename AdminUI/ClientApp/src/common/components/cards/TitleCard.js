import { Box, Flex } from '@chakra-ui/react';
import Subtitle from '../typography/Subtitle';

function TitleCard({ title, children, topMargin, TopSideButtons }) {
	return (
		<div className={'card w-full p-6 bg-base-100 shadow-xl ' + (topMargin || 'mt-6')}>
			{/* Title for Card */}
			<div className="flex justify-between items-center">
				<Flex justifyContent="space-between">
					<Box>
						<Flex gap="10px" p={2} w="fit-content">
							<Box w="10px" bg="green.700" borderRadius="5px"></Box>
							<Subtitle styleClass="text-left">{title} </Subtitle>
						</Flex>
					</Box>
				</Flex>

				{/* Top side button, show only if present */}
				{TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>}
			</div>

			<div className="divider mt-2"></div>

			{/** Card Body */}
			<div className="h-full w-full pb-6 bg-base-100">{children}</div>
		</div>
	);
}

export default TitleCard;
