module.exports = Object.freeze({
	MODAL_BODY_TYPES: {
		USER_DETAIL: 'USER_DETAIL',
		ADD_NEW: 'ADD_NEW',
		EDIT: 'EDIT',
		CONFIRMATION: 'CONFIRMATION',
		DEFAULT: ''
	},

	RIGHT_DRAWER_TYPES: {
		NOTIFICATION: 'NOTIFICATION',
		CALENDAR_EVENTS: 'CALENDAR_EVENTS'
	},

	CONFIRMATION_MODAL_CLOSE_TYPES: {
		LEAD_DELETE: 'LEAD_DELETE'
	},

	AXIOS_HELPER: {
		BEARER: 'Bearer',
		JWT_AUTHENTICATION: 'jwt_authentication',
		ACCESS_TOKEN: 'accessToken',
		SIGN_IN: '/sign-in'
	},

	DASHBOARD_DATA: [
		{
			title: 'Asterisk',
			icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Eo_circle_orange_asterisk.svg',
			bgColor: '#ffff',
			isActive: false
		},
		{
			title: 'Asterisk Connector',
			icon: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Globe_icon_2.svg',
			bgColor: '#ffff',
			isActive: false
		}
	]
});
