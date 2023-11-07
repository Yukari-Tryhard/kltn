import React from 'react';

function LogoutDialog({ onLogout, setShowLogoutDialog }) {
	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen">
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-[112.5%] font-medium text-gray-900 mb-4">Are you sure you want to log out?</h2>
					<div className="flex justify-end">
						<button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={onLogout}>
							Yes, log out
						</button>
						<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setShowLogoutDialog(false)}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LogoutDialog;
