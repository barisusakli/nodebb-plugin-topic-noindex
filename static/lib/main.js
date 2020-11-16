'use strict';

/* global $, window, socket, ajaxify, app */

$('document').ready(function () {
	$(window).on('action:topic.tools.load', function () {
		$('.toggleNoIndex').on('click', toggleNoIndex);
	});

	function toggleNoIndex() {
		var tid = ajaxify.data.tid;
		socket.emit('plugins.noindex.toggleNoIndex', { tid: tid }, function (err, data) {
			if (err) {
				return app.alertError(err);
			}

			app.alertSuccess(data.noindex ? 'noindex meta tag added' : 'noindex meta tag removed');
			ajaxify.refresh();
		});
	}
});
