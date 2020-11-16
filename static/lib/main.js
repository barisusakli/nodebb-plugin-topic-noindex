'use strict';

/* global $, window, socket, ajaxify, app */

$('document').ready(function () {
	$(window).on('action:topic.tools.load', function () {
		$('.toggleIndex').on('click', toggleIndex);
	});

	function toggleIndex() {
		var tid = ajaxify.data.tid;
		socket.emit('plugins.noindex.toggleIndex', { tid: tid }, function (err, data) {
			if (err) {
				return app.alertError(err);
			}

			app.alertSuccess(data.noindex ? 'noindex meta tag added' : 'noindex meta tag removed');
			ajaxify.refresh();
		});
	}
});
