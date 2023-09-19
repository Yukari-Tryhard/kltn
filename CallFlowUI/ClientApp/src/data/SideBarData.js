import { MdAssignmentInd } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';
import { SiMagento, SiDialogflow } from 'react-icons/si';
import { MdMiscellaneousServices, MdSupervisorAccount } from 'react-icons/md';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { DiAsterisk } from 'react-icons/di';
import { IoIosSettings } from 'react-icons/io';
import { BiSolidDashboard } from 'react-icons/bi';

const iconSize = '20px';

export const SideBarData = [
    {
        title: 'Dashboard',
        url: 'dashboard',
        icon: <BiSolidDashboard fontSize={iconSize} />
    },
    {
        title: 'Account',
        url: 'account',
        icon: <MdSupervisorAccount fontSize={iconSize} />
    },
    {
        title: 'Phone Number ',
        url: 'phone-number',
        icon: <AiFillPhone fontSize={iconSize} />,
        children: [
            {
                title: 'Details',
                url: 'general-organization',
                icon: <SiMagento fontSize={iconSize} />
            },
            {
                title: 'Department',
                url: 'department-management',
                icon: <HiBuildingOffice2 fontSize={iconSize} />
            },
            {
                title: 'Assigning',
                url: 'assign-department',
                icon: <MdAssignmentInd fontSize={iconSize} />
            }
        ]
    },
    {
        title: 'Flow Design',
        url: 'flow-design',
        icon: <SiDialogflow fontSize="19px" />
    },
    {
        title: 'Setting',
        url: 'setting',
        icon: <IoIosSettings fontSize={iconSize} />,
        children: [
            {
                title: 'Asterisk',
                url: 'asterisk',
                icon: <DiAsterisk fontSize={iconSize} />
            },
            {
                title: 'Service',
                url: 'service',
                icon: <MdMiscellaneousServices fontSize={iconSize} />
            }
        ]
    }
];
