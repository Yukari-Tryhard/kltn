import React from 'react';
import DashboardCardGrid from '../../components/DashboardCardGrid';
import { DASHBOARD_DATA } from '../../../helper/constants/GlobalConstantUtil';

function Dashboard() {
	return <DashboardCardGrid dashboardData={DASHBOARD_DATA} />;
}

export default Dashboard;
