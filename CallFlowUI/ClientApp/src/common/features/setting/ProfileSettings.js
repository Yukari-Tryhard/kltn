import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showNotification } from '../../../store/common/HeaderSlice';
import TitleCard from '../../components/cards/TitleCard';
import InputText from '../../components/field/InputText';
import TextAreaInput from '../../components/field/TextAreaInput';
import ToggleInput from '../../components/field/ToggleInput';

function ProfileSettings() {
	const dispatch = useDispatch();

	// Call API to update profile settings changes
	const updateProfile = () => {
		dispatch(showNotification({ message: 'Profile Updated', status: 1 }));
	};

	const updateFormValue = ({ updateType, value }) => {
		console.log(updateType);
	};

	return (
		<>
			<TitleCard title="Profile Settings" topMargin="mt-2">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<InputText labelTitle="Name" defaultValue="Alex" updateFormValue={updateFormValue} />
					<InputText labelTitle="Email Id" defaultValue="alex@dashwind.com" updateFormValue={updateFormValue} />
					<InputText labelTitle="Title" defaultValue="UI/UX Designer" updateFormValue={updateFormValue} />
					<InputText labelTitle="Place" defaultValue="California" updateFormValue={updateFormValue} />
					<TextAreaInput labelTitle="About" defaultValue="Doing what I love, part time traveler" updateFormValue={updateFormValue} />
				</div>
				<div className="divider"></div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<InputText labelTitle="Language" defaultValue="English" updateFormValue={updateFormValue} />
					<InputText labelTitle="Timezone" defaultValue="IST" updateFormValue={updateFormValue} />
					<ToggleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue} />
				</div>

				<div className="mt-16">
					<button className="btn btn-primary float-right" onClick={() => updateProfile()}>
						Update
					</button>
				</div>
			</TitleCard>
		</>
	);
}

export default ProfileSettings;
