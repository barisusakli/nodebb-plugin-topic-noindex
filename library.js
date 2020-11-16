'use strict';

const topics = require.main.require('./src/topics');
const privileges = require.main.require('./src/privileges');
const db = require.main.require('./src/database');
const SocketPlugins = require.main.require('./src/socket.io/plugins');

const plugin = module.exports;

plugin.filterTopicBuild = async function (hookData) {
	const noindex = parseInt(hookData.templateData.noindex, 10) === 1;
	if (noindex && hookData.res && hookData.res.locals && hookData.res.locals.metaTags) {
		hookData.res.locals.metaTags.push({
			name: 'robots',
			content: 'noindex',
		});
	}
	return hookData;
};

plugin.addThreadTool = async function (hookData) {
	const noindex = parseInt(hookData.topic.noindex, 10) === 1;
	const isAdmin = await privileges.user.isAdministrator(hookData.uid);
	if (isAdmin) {
		hookData.tools.push({
			class: 'toggleNoIndex',
			title: noindex ? 'Unset noindex' : 'Set noindex',
			icon: 'fa-tag',
		});
	}

	return hookData;
};

SocketPlugins.noindex = {};

SocketPlugins.noindex.toggleNoIndex = async function (socket, data) {
	const canEdit = await privileges.user.isAdministrator(socket.uid)
	if (!canEdit) {
		throw new Error('[[error:no-privileges]]');
	}

	return await toggleNoIndex(data.tid);
};

async function toggleNoIndex(tid) {
	let noindex = await topics.getTopicField(tid, 'noindex');
	noindex = parseInt(noindex, 10) === 1;
	if (noindex) {
		await db.deleteObjectField('topic:' + tid, 'noindex');
	} else {
		await topics.setTopicField(tid, 'noindex', 1);
	}
	return { noindex: !noindex };
}
