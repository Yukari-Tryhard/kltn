import { AiFillPhone } from 'react-icons/ai';
import { SiDialogflow } from 'react-icons/si';
import { MdMiscellaneousServices, MdSupervisorAccount } from 'react-icons/md';
import { DiAsterisk } from 'react-icons/di';
import { IoIosSettings } from 'react-icons/io';
import { BiSolidDashboard, BiSolidReport } from 'react-icons/bi';
import { AiOutlineLink } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';

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
				path: 'trunk',
				name: 'Trunk',
				icon: <AiOutlineLink className={submenuIconClasses} />
			},
			{
				path: 'phone-number',
				name: 'Phone Number',
				icon: <FiPhoneCall className={submenuIconClasses} />
			}
		]
	},
	{
		path: 'studio',
		name: 'Studio',
		icon: <SiDialogflow className={iconClasses} />
	},
	{
		path: 'report',
		name: 'Report',
		icon: <BiSolidReport className={iconClasses} />
	},
	{
		path: 'settings',
		name: 'Settings',
		icon: <IoIosSettings className={iconClasses} />
	}
];

export default routes;
