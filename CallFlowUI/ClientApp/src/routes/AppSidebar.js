import { MdAssignmentInd } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';
import { SiMagento, SiDialogflow } from 'react-icons/si';
import { MdMiscellaneousServices, MdSupervisorAccount } from 'react-icons/md';
import { DiAsterisk } from 'react-icons/di';
import { IoIosSettings } from 'react-icons/io';
import { BiSolidDashboard } from 'react-icons/bi';

const iconClasses = `h-5 w-5`;
const submenuIconClasses = `h-4 w-4`;

const routes = [
	{
		path: '/app/dashboard',
		name: 'Dashboard',
		icon: <BiSolidDashboard className={iconClasses} />
	},
	{
		path: '/app/account',
		name: 'Account',
		icon: <MdSupervisorAccount className={iconClasses} />
	},
	{
		name: 'Phone Number ',
		icon: <AiFillPhone className={iconClasses} />,
		children: [
			{
				path: '/app/number-details',
				name: 'Details',
				icon: <SiMagento className={submenuIconClasses} />
			},
			{
				path: '/app/number-assigning',
				name: 'Assigning',
				icon: <MdAssignmentInd className={submenuIconClasses} />
			}
		]
	},
	{
		name: 'Flow Design',
		icon: <SiDialogflow className={iconClasses} />,
		path: '/app/flow-design'
	},
	{
		name: 'Setting',
		icon: <IoIosSettings className={iconClasses} />,
		children: [
			{
				path: '/app/asterisk',
				name: 'Asterisk',
				icon: <DiAsterisk className={submenuIconClasses} />
			},
			{
				path: '/app/service',
				name: 'Service',
				icon: <MdMiscellaneousServices className={submenuIconClasses} />
			}
		]
	}
];

export default routes;
