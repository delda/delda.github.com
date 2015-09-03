var currentVersion = '2.8';
var phoneVersion = currentVersion;
var localeFormat = 'en';
var dateFormat = [
	'%d-%m-%y',  // DD-MM-YY
	'%d.%m.%y',  // DD.MM.YY
	'%d/%m/%y',  // DD-MM-YY
	'%d %m %y',  // DD MM YY
	'%d-%m-%Y',  // DD-MM-YYYY
	'%d.%m.%Y',  // DD.MM.YYYY
	'%d/%m/%Y',  // DD/MM/YYYY
	'%d %m %Y',  // DD MM YYYY
	'%m-%d-%Y',  // MM-DD-YYYY
	'%m.%d.%Y',  // MM.DD.YYYY
	'%m/%d/%Y',  // MM/DD/YYYY
	'%m %d %Y',  // MM DD YYYY
	'%Y-%m-%d',  // YYYY-MM-DD
	'%Y.%m.%d',  // YYYY.MM.DD
	'%Y/%m/%d',  // YYYY/MM/DD
	'%Y %m %d',  // YYYY MM DD
	'%b/%d/%Y',  // MMM/DD/YYYY
	'%b %e, %Y', // MMM D, YYYY
	'%d %b %Y',  // DD MMM YYYY
	'%d %b, %Y', // DD MMM, YYYY
	'%e $B %Y',  // D MMMM YYYY
	'%d %B %Y',  // DD MMMM YYYY
	'%B %d, %Y', // MMMM DD, YYYY
	'%B-%d-%Y',  // MMMM-DD-YY
];
var dateFormat = [
	'l', 'L', 'll', 'LL', 'lll', 'LLL', 'llll', 'LLLL'
];

$(document).foundation();

$(document).ready(function(){
	// Version controll sign
	$('h1 .right #linkVersionInformation').text("v"+currentVersion);
	getProps = queryString();
	for(var test in getProps){
		setProperty(test, getProps[test]);
	}

	// Hidden the part of code with lower version control
    $(".delda_version").each(function(index){ 
		var version = $(this).attr('class').match(/v([0-9]\.[0-9])/);
		if(version && parseFloat(version[1]) > parseFloat(phoneVersion)){
			$(this).hide();
		}
    });

	// Add content in date select
	moment().locale(localeFormat);
	var today = new Date();
	var count = 0;
	dateListing = $('[name=date]');
	for(date of dateFormat){
		dateListing.append('<option class="delda_shape" value="'+count+'">'+moment().format(date)+'</option>');
		count++;
	}
});

function queryString(){
	var getProps = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0; i<vars.length; i++){
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof getProps[pair[0]] === "undefined") {
			getProps[pair[0]] = decodeURIComponent(pair[1]);
		// If second entry with this name
		} else if (typeof getProps[pair[0]] === "string") {
			var arr = [ getProps[pair[0]],decodeURIComponent(pair[1]) ];
			getProps[pair[0]] = arr;
		// If third or later entry with this name
		} else {
			getProps[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return getProps;
}

function saveOptions() {
	var params = {};
	$('#config').serializeArray().forEach(function(pair) {
		params[pair.name] = pair.value;
	});
	params['number'] = params['number'] ? '1' : '0';
	params['battery_modality'] = params['battery_modality'] ? '1' : '0';

	return params;
}

function setProperty(property, value){
	switch(property){
		case 'version':
			phoneVersion = value;
			if(parseFloat(currentVersion) > parseFloat(value)){
				$('#version_alert').show();
			}
			break;
		case 'platform':
			platform = (value > 1 || value < 0) ? 1 : value;
			platform = (platform == 1) ? 'aplite' : 'basalt';
			$('[name=color] .delda_'+platform).remove();
			break;
		case 'shape':
			$($('[name=shape]').val(value)).prop('selected', true);
			break;
		case 'color':
			$($('[name=color]').val(value)).prop('selected', true);
			break;
		case 'number':
			if(value == 1){
				$('#numbersCheckbox').attr('checked', true);
			}
			break;
		case 'bluetooth':
			$('#bluetooth'+value).toggleClass('delda_hover');
			$('#bluetooth').val(value);
			break;
		case 'battery':
			$('#battery'+value).toggleClass('delda_hover');
			$('#battery').val(value);
			break;
		case 'battery_modality':
			if(value == 1){
				$('#batteryCheckbox').attr('checked', true);
			}
			break;
		case 'locale':
			localeFormat = value;
			break;
	}
}

$('.bluetooth,.battery').click(function(){
	var currentId = $(this).attr('id').match('[a-z]+');
	$('.'+currentId+'.delda_hover').removeClass('delda_hover');
	$(this).toggleClass('delda_hover');
	var value = parseInt($(this).attr('id').replace(currentId, ''));
	$('#'+currentId).val(value);
});

$('#b-submit').click(function(){
	var location = "pebblejs://close#" + encodeURIComponent(JSON.stringify(saveOptions()));
	document.location = location;
});
