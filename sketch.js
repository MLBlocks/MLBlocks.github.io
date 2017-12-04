document.addEventListener("DOMContentLoaded", function() {

	console.log("Loaded");

	var clear = document.getElementById("newProject");
	var type = document.getElementById("type");
	var playground = document.getElementById('playground');

	var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];

	var Help = document.getElementById("help");
	var Export = document.getElementById("apply");
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
	var optimizer = document.getElementById('optimizer');

	var code = ace.edit("code");
  code.setTheme("ace/theme/xcode");
  code.getSession().setMode("ace/mode/python");
	code.insert("# Export model to generate code...");
	code.insert("\n")

	var chain = [];
	var compileParams = [];
	var issuesChain = [];

	Export.addEventListener('click', function() {

		if (chain.length != 0) {
			if (issuesChain.length == 0) {
				var msg = confirm("Are you sure you want to export this model?");
				if (msg == true) {
					var lossChoice = loss.value;
					var optimizerChoice = optimizer.value;

					if (lossChoice == "" || optimizerChoice == "") {
						lossChoice = "binary_crossentropy";
						optimizerChoice = "Adam";
					};

					compileParams.push(lossChoice);
					compileParams.push(optimizerChoice);

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
					issuesChain = [];

				} else {
					alert("Canceling model export.");
				};
			} else {
				alert("Fix all issues in the model architecture before exporting.")
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
			$('#lossfunc option').prop('selected', function() {
				return this.defaultSelected;
			});

			$('#optimizer option').prop('selected', function() {
				return this.defaultSelected;
			});

			clearPlayground(code);
			chain = [];
			compileParams = [];
			issuesChain = [];
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

		if (type == "Input") {
			console.log('Editing Input');
		};

		if (type == "Dense") {
			console.log('Editing Dense');
		};

		if (type == "Conv2D") {
			console.log('Editing Conv2D');
		};

		if (type == "MaxPooling2D") {
			console.log('Editing MaxPooling2D');
		};

		if (type == "Flatten") {
			console.log('Editing Flatten');
		};

		if (type == "Dropout") {
			console.log('Editing Dropout');
		};

		if (type == "LSTM") {
			console.log('Editing LSTM');
		};

		if (type == "BatchNormalization") {
			console.log('Editing BatchNormalization');
		};

		if (type == "Reshape") {
			console.log('Editing Reshape');
		};

		if (type == "Activation") {
			console.log('Editing Activation');
		};
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
		console.log(chain);

		block.addEventListener('click', function() {
			showBlockInfo(type, chain);
			controlPanel.style.visibility = "visible";
		});

		raiseIssue(issuesPanel, chain, issuesChain);
	};

	input.addEventListener('click', function() {
		chain.push("Input");
		addBlock("Input", chain);
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

function raiseIssue(container, chain, issuesChain) {

	if (chain[0] != "Input") {
		if (issuesChain.includes("No input block at beginning.") == false) {
			issue = document.createElement("DIV");
			issueDesc = document.createElement("P");
			issueTXT = document.createTextNode("No input block at beginning.");
			issueDesc.appendChild(issueTXT);
			issueDesc.id = "inputIssueDesc";
			issue.appendChild(issueDesc);
			issue.id = "inputIssue";
			container.appendChild(issue);
			issuesChain.push("No input block at beginning.");
		};
	};

	for (i = 0; i < chain.length; i++) {
		if (chain[i] == chain[i+1]) {
			if (issuesChain.includes(`Illegal synapse at block ${i+1} and ${i+2}`) == false) {
				issue = document.createElement("DIV");
				issueDesc = document.createElement("P");
				issueTXT = document.createTextNode(`Illegal synapse at block ${i+1} and ${i+2}`);
				issueDesc.appendChild(issueTXT);
				issueDesc.id = "illegalIssueDesc";
				issue.appendChild(issueDesc);
				issue.id = "illegalIssue";
				container.appendChild(issue);
				issuesChain.push(`Illegal synapse at block ${i+1} and ${i+2}`);
			};
		};
	};
};
