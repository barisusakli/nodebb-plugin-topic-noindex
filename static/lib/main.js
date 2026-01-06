'use strict';

$('document').ready(function () {
	$(window).on('action:topic.tools.load', function () {
		$('.toggleNoIndex').on('click', toggleNoIndex);
	});

	function showAlert(type, msg) {
		require(['alerts'], function (alerts) {
			alerts[type](msg);
		});
	}

	function toggleNoIndex() {
		socket.emit('plugins.noindex.toggleNoIndex', { tid: ajaxify.data.tid }, function (err, data) {
			if (err) {
				return showAlert('error', err);
			}

			showAlert('success', data.noindex ? 'noindex meta tag added' : 'noindex meta tag removed');
			ajaxify.refresh();
		});
	}
});
