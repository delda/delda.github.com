var currentVersion = '2.7';
var phoneVersion = currentVersion;

$(document).foundation();

$(document).ready(function(){
	$('h1 .right #linkVersionInformation').text("v"+currentVersion);
	getProps = queryString();
	for(var test in getProps){
		setProperty(test, getProps[test]);
	}
    $(".delda_version").each(function(index){ 
		var version = $(this).attr('class').match(/v([0-9]\.[0-9])/);
		if(version && parseFloat(version[1]) > parseFloat(phoneVersion)){
			$(this).hide();
		}
    });
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
