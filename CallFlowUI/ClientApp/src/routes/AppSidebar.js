import { MdAssignmentInd } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';
import { SiMagento, SiDialogflow } from 'react-icons/si';
import { MdMiscellaneousServices, MdSupervisorAccount } from 'react-icons/md';
import { DiAsterisk } from 'react-icons/di';
import { IoIosSettings } from 'react-icons/io';
import { BiSolidDashboard, BiSolidReport } from 'react-icons/bi';

const iconClasses = `h-5 w-5`;
const submenuIconClasses = `h-4 w-4`;

const routes = [
	{
		path: 'dashboard',
		name: 'Dashboard',
		icon: <BiSolidDashboard className={iconClasses} />
	},
	{
		path: 'accounts',
		name: 'Account',
		icon: <MdSupervisorAccount className={iconClasses} />
	},
	{
		name: 'Phone Number ',
		icon: <AiFillPhone className={iconClasses} />,
		children: [
			{
				path: 'number-details',
				name: 'Details',
				icon: <SiMagento className={submenuIconClasses} />
			},
			{
				path: 'number-assigning',
				name: 'Assigning',
				icon: <MdAssignmentInd className={submenuIconClasses} />
			}
		]
	},
	{
		path: 'flow-design',
		name: 'Flow Design',
		icon: <SiDialogflow className={iconClasses} />
	},
	{
		path: 'report',
		name: 'Report',
		icon: <BiSolidReport className={iconClasses} />
	},
	{
		name: 'Setting',
		icon: <IoIosSettings className={iconClasses} />,
		children: [
			{
				path: 'asterisk',
				name: 'Asterisk',
				icon: <DiAsterisk className={submenuIconClasses} />
			},
			{
				path: 'service',
				name: 'Service',
				icon: <MdMiscellaneousServices className={submenuIconClasses} />
			}
		]
	}
];

export default routes;
