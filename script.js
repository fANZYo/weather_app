$(function(){

	const routine = (data) => {
		const $icon = $('.icon');
		const $name = $('.name');
		const $temp = $('.temp');
		const $wind = $('.wind');
		const $windDirection = $('.wind-direction');
		const $time = $('.current-time');
		const $day = $('.day');

		$icon.attr('src', 'http:' + data.current.condition.icon);
		$icon.attr('alt', data.current.condition.text);
		$name.html(`${data.location.name}, ${data.location.country.match(/\b(\w)/g).join('')}`);

		let currentFormat = 'C';
		let cToF = `<a class="format" href="#">${currentFormat}</a>`;
		$temp.html(data.current.temp_c + cToF);

		$('.temp').on('click', (event) => {
			currentFormat = currentFormat == 'F' ? 'C' : 'F';
			cToF = `<a class="format" href="#">${currentFormat}</a>`;

			if(currentFormat === 'C'){
				$temp.html(data.current.temp_c + cToF);
			}else if(currentFormat === 'F') {
				$temp.html(data.current.temp_f + cToF);
			}
		});

		$wind.append(' ' + data.current.wind_kph + 'kmh');
		$windDirection.css({'transform' : 'rotate(' + (data.current.wind_degree + 135) + 'deg)'});

		const time = new Date();
		const weekDay = [
			'Mon',
			'Tue',
			'Wed',
			'Thu',
			'Fri',
			'Sat',
			'Sun'
		];
		const month = [
			'Jan',
			'Feb',
			'Mar',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Sep',
			'Dec'
		]
		$day.html(weekDay[time.getDay() - 1] + ', ' + month[time.getMonth() - 1] + ' ' + time.getDate());
		$time.html(('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2));
	};

	const geo = (location) => {
		const lon = location.coords.longitude;
		const lat = location.coords.latitude;

		$.ajax({
			type: 'GET',
			url: `https://api.apixu.com/v1/current.json?key=e65ddae768664418a80154646171907&q=${lat} ${lon}`,
			success: routine
		});
	};

	navigator.geolocation.getCurrentPosition(geo);
});
