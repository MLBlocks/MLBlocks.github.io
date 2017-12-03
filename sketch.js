document.addEventListener("DOMContentLoaded", function() {

	console.log("Loaded");

	var ISSUE = {
		desc:"",
		color:""
	};

	var clear = document.getElementById("newProject");
	var type = document.getElementById("type");
	var playground = document.getElementById('playground');

	var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];

	var Help = document.getElementById("help");
	var Export = document.getElementById("export");
	var Import = document.getElementById("import");
	var Palette = document.getElementById("palette");
	var Editor = document.getElementById("editor");
	var Control = document.getElementById("control");
	var sandbox = document.getElementById("sandbox");
	var controlPanel = document.getElementById("controlPanel");
	var scroller = document.getElementById("scroller");
	var closesb = document.getElementById("closesb");
	var closecp = document.getElementById("closecp");
	var closepal = document.getElementById("closepal");

	var issues = document.getElementById("issues");
	var layers = document.getElementById("layerInfo");
	var issuesPanel = document.getElementById("issuesPanel");
	var layerPanel = document.getElementById("layerPanel");

	var input = document.getElementById("Input");
	var optimizer = document.getElementById("Optimizer");
	var dense = document.getElementById("Dense");
	var conv2d = document.getElementById("Conv2D");
	var mp2d = document.getElementById("MaxPooling2D");
	var flatten = document.getElementById("Flatten");
	var activation = document.getElementById("Activation");
	var reshape = document.getElementById("Reshape");
	var dropout = document.getElementById("Dropout");
	var lstm = document.getElementById("LSTM");
	var batchnorm = document.getElementById("BatchNormalization");

	var loss = document.getElementById('lossfunc');

	var code = ace.edit("code");
  code.setTheme("ace/theme/xcode");
  code.getSession().setMode("ace/mode/python");
	code.insert("# Export model to generate code...");
	code.insert("\n")

	var opened = 0;
	var chain = [];
	var compileParams = [];

	Export.addEventListener('click', function() {

		if (chain.length != 0) {
			var msg = confirm("Are you sure you want to export this model?");
			if (msg == true) {
				var lossChoice = loss.value;
				var optChoice = optimizer.value;
				var lr = alpha.value;
				var mom = momentum.value;
				var clipnorm = cn.value;
				var clipvalue = cv.value;

				if (lr == "" || mom == "" || clipnorm == "" || clipvalue == "") {
					lr = 0.01;
					mom = 0.9;
					clipnorm = 1.0;
					clipvalue = 0.5;
				}

				compileParams.push(lossChoice);
				compileParams.push(optChoice);
				compileParams.push(lr);
				compileParams.push(mom);
				compileParams.push(clipnorm);
				compileParams.push(clipvalue);

				imports = yieldImports(chain);

				console.log(chain);
				console.log(compileParams);
				console.log(imports);

				writeImports(code, imports);
				writeModel(code, chain);
				compileModel(code, compileParams);
				fitModel(code);

				chain = [];
				compileParams = [];

			} else {
				alert("Canceling model export.");
			};
		} else {
			alert("Model has to be built before being exported.");
		};
	});

	help.addEventListener('click', function() {
		console.log("Help");
		modal.style.display = "block";
	});

	span.onclick = function() {
	    modal.style.display = "none";
	}

	clear.addEventListener('click', function() {
		msg = confirm("Are you sure you want to clear the sandbox?");
		if (msg == true) {
			clearPlayground(code);
			chain = [];
			compileParams = [];
		} else {
		};
	});

	Palette.addEventListener('click', function() {
		console.log('Opening palette');
		scroller.style.visibility = "visible";
		playground.style.left = "225px";
	});

	Editor.addEventListener('click', function() {
		console.log('Opening editor');
		sandbox.style.visibility = "visible";
	});

	Control.addEventListener('click', function() {
		console.log('Opening control panel');
		controlPanel.style.visibility = "visible";
	});

	closesb.addEventListener('click', function() {
		console.log('Closing editor');
		sandbox.style.visibility = "hidden";
	});

	closecp.addEventListener('click', function() {
		console.log('Closing control panel');
		controlPanel.style.visibility = "hidden";
	});

	closepal.addEventListener('click', function() {
		console.log('Closing control panel');
		scroller.style.visibility = "hidden";
		playground.style.left = "0";
	});

	issues.addEventListener('click', function() {
		issues.style.backgroundColor = "#89C4F4";
		issues.style.color = "white";
		issues.style.opacity = "1.0";

		layerInfo.style.color = "white";
		layerInfo.style.opacity = "0.8";
		layerInfo.style.background = "none";

		issuesPanel.style.display = "block";
		layerPanel.style.display = "none";
	});

	layerInfo.addEventListener('click', function() {
		layerInfo.style.backgroundColor = "#89C4F4";
		layerInfo.style.color = "white";
		layerInfo.style.opacity = "1.0";

		issues.style.color = "white";
		issues.style.opacity = "0.8";
		issues.style.background = "none";

		layerPanel.style.display = "block";
		issuesPanel.style.display = "none";
	});

	function getBlockInfo(type, chain) {
		var index = chain.indexOf(type);
		var category = type;
		var neurones;
	};

	function showBlockInfo(type, chain) {
		layerInfo.style.backgroundColor = "#89C4F4";
		layerInfo.style.color = "white";
		layerInfo.style.opacity = "1.0";

		issues.style.color = "white";
		issues.style.opacity = "0.8";
		issues.style.background = "none";

		layerPanel.style.display = "block";
		issuesPanel.style.display = "none";
	};

	function addBlock(type, chain) {
		var playground = document.getElementById('playground');
		var block = document.createElement("DIV");
		var category = document.createElement("P");
		var text = document.createTextNode(type);

		category.appendChild(text);
		category.id = "edit_type";

		block.appendChild(category);

		block.id = type;
		block.className += "editable_block";

		playground.appendChild(block);

		block.addEventListener('click', function() {
			showBlockInfo(type, chain)
			if (controlPanel.style.visibility = "hidden") {
				controlPanel.style.visibility = "visible";
			};
		});
		block.addEventListener('dblclick', function() {
			removeBlock(playground, type, block, chain);
		});
	};

	input.addEventListener('click', function() {
		chain.push("Input");
		addBlock("Input", chain);
	});

	optimizer.addEventListener('click', function() {
		chain.push("Optimizer");
		addBlock("Optimizer", chain);
	});

	dense.addEventListener('click', function() {
		chain.push("Dense");
		addBlock("Dense", chain);
	});

	conv2d.addEventListener('click', function() {
		chain.push("Conv2D");
		addBlock("Conv2D", chain);
	});

	mp2d.addEventListener('click', function() {
		chain.push("MaxPooling2D");
		addBlock("MaxPooling2D", chain);
	});

	flatten.addEventListener('click', function() {
		chain.push("Flatten");
		addBlock("Flatten", chain);
	});

	activation.addEventListener('click', function() {
		chain.push("Activation");
		addBlock("Activation", chain);
	});

	reshape.addEventListener('click', function() {
		chain.push("Reshape");
		addBlock("Reshape", chain);
	});

	dropout.addEventListener('click', function() {
		chain.push("Dropout");
		addBlock("Dropout", chain);
	});

	lstm.addEventListener('click', function() {
		chain.push("LSTM");
		addBlock("LSTM", chain);
	});

	batchnorm.addEventListener('click', function() {
		chain.push("BatchNormalization");
		addBlock("BatchNormalization", chain);
	});

});

function clearPlayground(code) {
	var playground = document.getElementById('playground');
	playground.style.minHeight = "400px";
	playground.innerHTML = "";
	code.setValue("");
	code.insert("# Export model to finish writing code...");
	code.insert("\n")
};

function removeBlock(palyground, type, block, chain) {
	console.log('Removing block of type:', type);
	playground.removeChild(block);
	var i = chain.indexOf(type);
	chain.splice(i,1);
};

function yieldImports(layerChain) {
	var importChain = new Set(layerChain);
	var	importChain = Array.from(importChain);
	return importChain;
};

function writeImports(code, importChain) {
	code.insert("import numpy as np");
	code.insert("\n");
	code.insert("import keras");
	code.insert("\n");
	code.insert("import keras.backend as K");
	code.insert("\n");
	code.insert("from keras.models import Sequential, Model, model_from_json");
	code.insert("\n");
	code.insert("\n");
	for (i = 0; i < importChain.length; i++) {
		code.insert("from keras.layers import " + String(importChain[i]));
		code.insert("\n");
	};
};

function writeModel(code, chain) {
	code.insert("\n");
	code.insert("model = Sequential()");
	code.insert("\n");
	for (i = 0; i < chain.length; i++) {
		var current = chain[i];
		if (current == "Input") {
			code.insert("model.add(Input(shape=[]))");
			code.insert("\n");
		};
		if (current == "Dense") {
			code.insert("model.add(Dense(100))");
			code.insert("\n");
		};
		if (current == "Conv2D") {
			code.insert("model.add(Conv2D(32, (3,3)))");
			code.insert("\n");
		};
		if (current == "MaxPooling2D") {
			code.insert("model.add(MaxPooling2D(pool_size=(2,2)))");
			code.insert("\n");
		};
		if (current == "Flatten") {
			code.insert("model.add(Flatten())");
			code.insert("\n");
		};
		if (current == "Activation") {
			code.insert("model.add(Activation('relu'))");
			code.insert("\n");
		};
		if (current == "Reshape") {
			code.insert("model.add(Reshape())");
			code.insert("\n");
		};
		if (current == "Dropout") {
			code.insert("model.add(Dropout(0.25))");
			code.insert("\n");
		};
		if (current == "LSTM") {
			code.insert("model.add(LSTM(100))");
			code.insert("\n");
		};
		if (current == "BatchNormalization") {
			code.insert("model.add(BatchNormalization())");
			code.insert("\n");
		};
	};
};

function compileModel(code, compileParams) {
	var loss = compileParams[0];
	var optimizer = 'keras.optimizers.' + compileParams[1] + '()';
	code.insert(`model.compile(loss='${loss}', optimizer=${optimizer})`);
	code.insert("\n");
};

function fitModel(code) {
	var verbose = 1;
	var epochs = 10;
	var batch_size = 128;
	code.insert("\n");
	code.insert(`model.fit(X_train, y_train, verbose=${verbose}, epochs=${epochs}, batch_size=${batch_size})`);
	code.insert("\n");
};
