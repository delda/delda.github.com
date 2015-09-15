var currentVersion = '2.10';
var phoneVersion = currentVersion;
var localeFormat = 'en';
var dateFormat = [
	'DD-MM-YY',            // DD-MM-YY
	'DD.MM.YY',            // DD.MM.YY
	'DD/MM/YY',            // DD-MM-YY
	'DD MM YY',            // DD MM YY
	'DD-MM-YYYY',          // DD-MM-YYYY
	'DD.MM.YYYY',          // DD.MM.YYYY
	'DD/MM/YYYY',          // DD/MM/YYYY
	'DD MM YYYY',          // DD MM YYYY
	'MM-DD-YYYY',          // MM-DD-YYYY
	'MM.DD.YYYY',          // MM.DD.YYYY
	'MM/DD/YYYY',          // MM/DD/YYYY
	'MM DD YYYY',          // MM DD YYYY
	'YYYY-MM-DD',          // YYYY-MM-DD
	'YYYY.MM.DD',          // YYYY.MM.DD
	'YYYY/MM/DD',          // YYYY/MM/DD
	'YYYY MM DD',          // YYYY MM DD
	'MMM/DD/YYYY',         // MMM/DD/YYYY
	'MMM D, YYYY',         // MMM D, YYYY
	'DD MMM YYYY',         // DD MMM YYYY
	'DD MMM, YYYY',        // DD MMM, YYYY
	'ddd, MMM/DD/YYYY',    // MMM/DD/YYYY
	'ddd, MMM D, YYYY',    // MMM D, YYYY
	'ddd, DD MMM YYYY',    // DD MMM YYYY
	'ddd, DD MMM, YYYY',   // DD MMM, YYYY
	'D MMMM YYYY',         // D MMMM YYYY
	'DD MMMM YYYY',        // DD MMMM YYYY
	'MMMM DD, YYYY',       // MMMM DD, YYYY
	'MMMM-DD-YYYY',        // MMMM-DD-YY
	'ddd, D MMMM YYYY',    // D MMMM YYYY
	'ddd, DD MMMM YYYY',   // DD MMMM YYYY
	'ddd, MMMM DD, YYYY',  // MMMM DD, YYYY
	'ddd, MMMM-DD-YYYY',   // MMMM-DD-YY
	'dddd, D MMMM YYYY',   // D MMMM YYYY
	'dddd, DD MMMM YYYY',  // DD MMMM YYYY
	'dddd, MMMM DD, YYYY', // MMMM DD, YYYY
	'dddd, MMMM-DD-YYYY',  // MMMM-DD-YY
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
	var appVersion = phoneVersion.match(/([0-9]\.[0-9]{1,2})/);
    $(".delda_version").each(function(index){ 
		var elementVersion = $(this).attr('class').match(/v([0-9]\.[0-9]{1,2})/);
		console.log($(this));
		console.log('version compare ' + elementVersion[1] + ' vs ' + appVersion[1] + ': ' + versionCompare(elementVersion[1], appVersion[1]));
		if(versionCompare(elementVersion[1], appVersion[1]) > 0){
			$(this).hide();
		}
    });

	// Add content in date select
	moment.locale(localeFormat);
	var today = new Date();
	var count = 1;
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
			if(versionCompare(value, currentVersion) < 0){
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
		case 'date':
			$('select[name=date] option:eq('+value+')').prop('selected', true);
			break;
	}
}

function versionCompare(version1, version2){
	var v1 = version1.match(/([0-9])\.([0-9]{1,2})/);
	var v2 = version2.match(/([0-9])\.([0-9]{1,2})/);
	if(parseInt(v1[1]) > parseInt(v2[1])){
		return 1;
	}else if(parseInt(v1[1]) < parseInt(v2[1])){
		return -1;
	}else{
		if(parseInt(v1[2]) > parseInt(v2[2])){
			return 1;
		}else if(parseInt(v1[2]) < parseInt(v2[2])){
			return -1;
		}
		return 0;
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
