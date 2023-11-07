import { useState } from 'react';
import { useDispatch } from 'react-redux';

import TitleCard from '../../components/cards/TitleCard';
import { showNotification } from '../../../modules/store/common/HeaderSlice';

const INITIAL_DASHBOARD_LIST = [
	{ name: 'Asterisk', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Eo_circle_orange_asterisk.svg', isActive: true, description: 'DEAD' },
	{ name: 'Asterisk Connector', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Globe_icon_2.svg', isActive: false, description: 'RUNNING' }
];

function Dashboard() {
	const dispatch = useDispatch();

	const [dashboardList, setIntegrationList] = useState(INITIAL_DASHBOARD_LIST);

	const updateIntegrationStatus = (index) => {
		let dashboard = dashboardList[index];
		setIntegrationList(
			dashboardList.map((i, k) => {
				if (k === index) return { ...i, isActive: !i.isActive };
				return i;
			})
		);
		dispatch(showNotification({ message: `${dashboard.name} ${dashboard.isActive ? 'Dead' : 'Running'}`, status: 1 }));
	};

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{dashboardList.map((i, k) => {
					return (
						<TitleCard key={k} title={i.name} topMargin={'mt-3'}>
							<div className="flex items-center justify-between">
								<p className="flex items-center">
									<img alt="icon" src={i.icon} className="w-14 h-14 inline-block mr-5" />
									<span className="text-gray-600 font-bold text-xl">{i.description}</span>
								</p>
								<div className="mt-6 text-right">
									<input type="checkbox" className="toggle toggle-success toggle-lg" checked={i.isActive} onChange={() => updateIntegrationStatus(k)} />
								</div>
							</div>
						</TitleCard>
					);
				})}
			</div>
		</>
	);
}

export default Dashboard;
