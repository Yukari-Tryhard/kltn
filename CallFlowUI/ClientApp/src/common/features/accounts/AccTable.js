import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../../../store/common/HeaderSlice';
import TitleCard from '../../components/cards/TitleCard';
import AccTopSideButtons from './AccTopSideButtons';
import { RECENT_TRANSACTIONS } from '../../../helper/DummyData';
import DynamicTable from '../../components/tables/DynamicTable';

function AccTable() {
	const [trans, setTrans] = useState(RECENT_TRANSACTIONS);

	const removeFilter = () => {
		setTrans(RECENT_TRANSACTIONS);
	};

	const applyFilter = (params) => {
		let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
			return t.location === params;
		});
		setTrans(filteredTransactions);
	};

	// Search according to name
	const applySearch = (value) => {
		let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
			return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase());
		});
		setTrans(filteredTransactions);
	};

	return (
		<>
			<TitleCard title="Recent Transactions" topMargin="mt-2" TopSideButtons={<AccTopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter} />}>
				{/* Team Member list in table format loaded constant */}
				<div className="overflow-x-auto w-full">
					<table className="table w-full">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email Id</th>
								<th>Location</th>
								<th>Amount</th>
								<th>Transaction Date</th>
							</tr>
						</thead>
						<tbody>
							{trans.map((l, k) => {
								return (
									<tr key={k}>
										<td>
											<div className="flex items-center space-x-3">
												<div className="avatar">
													<div className="mask mask-circle w-12 h-12">
														<img src={l.avatar} alt="Avatar" />
													</div>
												</div>
												<div>
													<div className="font-bold">{l.name}</div>
												</div>
											</div>
										</td>
										<td>{l.email}</td>
										<td>{l.location}</td>
										<td>${l.amount}</td>
										<td>{moment(l.date).format('D MMM')}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</TitleCard>
		</>
	);
}

export default AccTable;
