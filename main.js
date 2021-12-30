prediction1 = "";
prediction2 = "";

Webcam.set ({
	width: 350,
  	height: 300,
	image_format: 'png',
	image_quality: 100
});

camera = document.getElementById('camera');
Webcam.attach('#camera');

function capture() {
	Webcam.snap(function(data_uri) {
		document.getElementById('result').innerHTML = '<img id="captured_image" src="' + data_uri + '">';
	});
}

console.log('ml5V = ' + ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ICoHOxFdb/model.json', modelLoaded);

function modelLoaded() {
	console.log('model loaded');
}

function talk() {
	var synth = window.speechSynthesis;
	speak_data_1 = "The first prediction is" + prediction1;
	speak_data_2 = "And the second prediction is" + prediction2;
	var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
	utterThis.rate = 0.5;
	synth.speak(utterThis);
}

function identify() {
	img = document.getElementById('captured_image');
	classifier.classify(img, gotResult);
}

function gotResult(error, results) {
	if(error) {
		console.error('error');
	} else {
		console.log(results);
		document.getElementById('ren').innerHTML = results[0].label;
		document.getElementById('ren2').innerHTML = results[1].label;
		
		prediction1 = results[0].label;
		prediction2 = results[1].label;

		talk();

		if(prediction1 == 'Happy') {
			document.getElementById('update_emoji').innerHTML = '&#128522;';
		} else if(prediction1 == 'Sad') {
			document.getElementById('update_emoji').innerHTML = '&#128532;';
		} else if(prediction1 == 'Angry') {
			document.getElementById('update_emoji').innerHTML = '&#128545;';
		}

		if(prediction2 == 'Happy') {
			document.getElementById('update_emoji2').innerHTML = '&#128512;';
		} else if(prediction2 == 'Sad') {
			document.getElementById('update_emoji2').innerHTML = '&#128546;';
		} else if(prediction2 == 'Angry') {
			document.getElementById('update_emoji2').innerHTML = '&#128548;';
		}
	}
}