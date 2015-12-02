var currentVersion = '3.4';
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

var options = [ 'shape', 'color', 'number', 'bluetooth', 'battery', 'battery_modality', 'date', 'help_num' ];
var optionsObj = {
	extend: function(settings){
		var that = this;
		for(var key in settings){
			that[settings[key]] = 0;
		}
		return that;
	},
	saveOptions(options){
		var params = {};
		var that = this;
		options.forEach(function(pair){
			if(that.hasOwnProperty(pair.name)){
				params[pair.name] = pair.value;
			}
		});
		params.number = params.number ? '1' : '0';
		params.help_num = params.help_num ? '1' : '0';
		return params;
	}
};
var helper = [
	['3.4', 'DIC 02, 2015', 'Added five new colors template'],
	['3.3', 'NOV 10, 2015', 'Interface correction on all three platforms'],
	['3.2', 'NOV 09, 2015', 'Bug fix: date correction on Chalk'],
	['3.1', 'NOV 01, 2015', 'Added new feature: enable/disable numerical value for each bit'],
	['3.0', 'OCT 21, 2015', 'Watch upgrade for Pebble Time Round'],
	['2.11', 'OCT 05, 2015', 'Added five new shapes'],
	['2.10', 'SEP 15, 2015', 'Added three new shapes: rectangle, triangle and rhombus'],
	['2.9', 'SEP 07, 2015', 'Choose the date format between 38 different formats'],
	['2.8', 'AUG 28, 2015', 'Added battery meter'],
	['2.7', 'AUG 19, 2015', 'Bluetooth connection notification'],
	['2.6', 'AUG 12, 2015', 'Added six different patterns color'],
	['2.5', 'AUG 03, 2015', 'You can add a decimal time on background'],
	['2.4', 'JUL 22, 2015', 'First color release'],
	['2.3', 'JUL 16, 2015', 'Added settings communication from smartwatch to smartphone'],
	['2.2', 'JUL 13, 2015', 'Choose your favourite shape: you can get circle or square'],
	['2.1', 'JUN 08, 2015', 'Added supports 12/24 hr'],
	['2.0', 'JUN 05, 2015', 'Upgrade to SDK 3.0'],
	['1.2', 'MAR 13, 2015', 'First complete release'],
].forEach(compileHelper);

$(document).foundation();

$(document).ready(function(){

	// Version controll sign
	$('h1 .right #linkVersionInformation').text("v"+currentVersion);
	getProps = queryString();
	dateSelected = 0;
	for(var test in getProps){
		setProperty(test, getProps[test]);
	}

	// Hidden the part of code with lower version control
	var appVersion = phoneVersion.match(/([0-9]\.[0-9]{1,2})/);
    $(".delda_version").each(function(index){ 
		var elementVersion = $(this).attr('class').match(/v([0-9]\.[0-9]{1,2})/);
		if(versionCompare(elementVersion[1], appVersion[1]) > 0){
			$(this).hide();
		}
    });

	// Add content in date select
	moment.locale(localeFormat);
	var today = new Date();
	var count = 1;
	var strint2Append = '';
	dateListing = $('[name=date]');
	for(date of dateFormat){
		string2Append = '<option class="delda_shape" value="'+count+'"';
		if(count == dateSelected){
			string2Append += ' selected="selected"';
		}
		string2Append += '>'+moment().format(date)+'</option>';
		dateListing.append(string2Append);
		count++;
	}
});

function queryString(){
	var getProps = {};
	var query = window.location.search.substring(1);
	var vars = Array();
	if(query){
		vars = query.split("&");
	}
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
			$('#battery_modality'+value).toggleClass('delda_hover');
			$('#battery_modality').val(value);
			break;
		case 'locale':
			localeFormat = value;
			break;
		case 'date':
			dateSelected = value;
			break;
		case 'help_num':
			if(value == 1){
				$('#help_numCheckbox').attr('checked', true);
			}
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

function compileHelper(changeLog){
	father = $('#versionInformation > .row :last-child');
	father = $('#versionInformation');
	var div1 = document.createElement('div');
	$(div1).addClass('row delda_modal_version')
	       .html('<div class="small-12 columns"><div class="left">VERSION '+changeLog[0]+'</div><div class="right">'+changeLog[1]+'</div></div>');
	var div2 = document.createElement('div');
	$(div2).addClass('row delda_modal_text')
	       .html('<div class="small-12 columns">v'+changeLog[0]+'</br>* '+changeLog[2]+'</div></div>');
	father.append(div1);
	father.append(div2);
}
$('.bluetooth,.battery,.battery_modality').click(function(){
	var currentId = $(this).attr('id').match('[a-z_]+');
	$('.'+currentId+'.delda_hover').removeClass('delda_hover');
	$(this).toggleClass('delda_hover');
	var value = parseInt($(this).attr('id').replace(currentId, ''));
	$('#'+currentId).val(value);
});

$('#b-submit').click(function(){
	var location = "pebblejs://close#" + encodeURIComponent(JSON.stringify(optionsObj.extend(options).saveOptions($('#config').serializeArray())));
	document.location = location;
});
