document.addEventListener("DOMContentLoaded", function() {

	console.log("Loaded");

	var clear = document.getElementById("delete");
	var menu = document.getElementById("menu");
	var menuNav = document.getElementById("menuNav");
	var type = document.getElementById("type");
	var playground = document.getElementById('playground');

	var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];

	var Help = document.getElementById("help");
	var Export = document.getElementById("export");
	var Import = document.getElementById("import");
	var Editor = document.getElementById("editor");
	var sandbox = document.getElementById("sandbox");
	var closesb = document.getElementById("closesb");

	var input = document.getElementById("input");
	var dense = document.getElementById("dense");
	var conv2d = document.getElementById("conv2d");
	var mp2d = document.getElementById("mp2d");
	var flatten = document.getElementById("flatten");
	var activation = document.getElementById("activation");
	var reshape = document.getElementById("reshape");
	var dropout = document.getElementById("dropout");
	var lstm = document.getElementById("lstm");
	var batchnorm = document.getElementById("batchnorm");

	var loss = document.getElementById('lossfunc');
	var optimizer = document.getElementById('opt');
	var alpha = document.getElementById('alpha');
	var momentum = document.getElementById('momentum');
	var cn = document.getElementById('clipnorm');
	var cv = document.getElementById('clipvalue');

	var code = ace.edit("code");
  code.setTheme("ace/theme/xcode");
  code.getSession().setMode("ace/mode/python");
	code.insert("# Export model to generate code...");
	code.insert("\n")

	var opened = 0;
	var chain = [];
	var importChain = [];
	var compileParams = [];

	menu.addEventListener("click", function() {
		if (opened == 0){
			menu.style.transform = "rotate(-90deg)";
			menuNav.style.display = "block";
			opened = 1;
		} else {
			opened = 0;
			menu.style.transform = "rotate(0deg)";
			menuNav.style.display = "none";
		}
	});

	Export.addEventListener('click', function() {
		opened = 0;
		menu.style.transform = "rotate(0deg)";
		menuNav.style.display = "none";

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

				console.log(chain);
				console.log(compileParams);
				console.log(importChain);

				chain = [];
				compileParams = [];

				writeCode(code, importChain, chain, compileParams);

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
		opened = 0;
		menu.style.transform = "rotate(0deg)";
		menuNav.style.display = "none";
	});

	span.onclick = function() {
	    modal.style.display = "none";
			opened = 0;
			menu.style.transform = "rotate(0deg)";
			menuNav.style.display = "none";
	}

	clear.addEventListener('click', function() {
		msg = confirm("Are you sure you want to clear the sandbox?");
		if (msg == true) {
			clearPlayground(code);
			opened = 0;
			menu.style.transform = "rotate(0deg)";
			menuNav.style.display = "none";
			chain = [];
			compileParams = [];
		} else {
			opened = 0;
			menu.style.transform = "rotate(0deg)";
			menuNav.style.display = "none";
		};
	});

	Editor.addEventListener('click', function() {
		console.log('Opening editor');
		sandbox.style.visibility = "visible";
		opened = 0;
		menu.style.transform = "rotate(0deg)";
		menuNav.style.display = "none";
	});

	closesb.addEventListener('click', function() {
		console.log('Closing editor');
		sandbox.style.visibility = "hidden";
	});

	input.addEventListener('click', function() {
		chain.push("input");
		addBlock("input", chain);
		writeImports(code, "input", importChain);
	});

	dense.addEventListener('click', function() {
		chain.push("dense");
		addBlock("dense", chain);
		writeImports(code, "dense", importChain);
	});

	conv2d.addEventListener('click', function() {
		chain.push("conv2d");
		addBlock("conv2d", chain);
		writeImports(code, "conv2d", importChain);
	});

	mp2d.addEventListener('click', function() {
		chain.push("mp2d");
		addBlock("mp2d", chain);
		writeImports(code, "mp2d", importChain);
	});

	flatten.addEventListener('click', function() {
		chain.push("flatten");
		addBlock("flatten", chain);
		writeImports(code, "flatten", importChain);
	});

	activation.addEventListener('click', function() {
		chain.push("activation");
		addBlock("activation", chain);
		writeImports(code, "activation", importChain);
	});

	reshape.addEventListener('click', function() {
		chain.push("reshape");
		addBlock("reshape", chain);
		writeImports(code, "reshape", importChain);
	});

	dropout.addEventListener('click', function() {
		chain.push("dropout");
		addBlock("dropout", chain);
		writeImports(code, "dropout", importChain);
	});

	lstm.addEventListener('click', function() {
		chain.push("lstm");
		addBlock("lstm", chain);
		writeImports(code, "lstm", importChain);
	});

	batchnorm.addEventListener('click', function() {
		chain.push("batchnorm");
		addBlock("batchnorm", chain);
		writeImports(code, "batchnorm", importChain);
	});

});

function addBlock(type, chain) {
	var playground = document.getElementById('playground');
	var block = document.createElement("DIV");
	var category = document.createElement("P");
	var text = document.createTextNode(type);
	var rhook = document.createElement("DIV");
	var shook = document.createElement("DIV");
	rhook.id = "rhook";
	shook.id = "shook";

	category.appendChild(text);
	category.id = "edit_type";

	// block.appendChild(rhook);
	block.appendChild(category);
	// block.appendChild(shook);

	block.id = type;
	block.className += "editable_block";

	playground.appendChild(block);

	rhook.addEventListener('click', function() {
		console.log('Receiving synapse from previous block');
	});
	shook.addEventListener('click', function() {
		console.log('Sending synapse from', type);
	});
	block.addEventListener('dblclick', function() {
		removeBlock(playground, type, block, chain)
	});
};

function clearPlayground(code) {
	var playground = document.getElementById('playground');
	playground.style.minHeight = "400px";
	playground.innerHTML = "";
	code.setValue("");
	code.insert("# Export model to finish writing code...");
	code.insert("\n")
};

function removeBlock(playground, type, block, chain) {
	console.log('closing block type:', type);
	playground.removeChild(block);
	var i = chain.indexOf(type);
	chain.splice(i,1);
};

function writeImports(code, type, chain) {
	if (type == "input") {
		chain.push("Input");
	};

	if (type == "dense") {
		chain.push("Dense");
	};

	if (type == "conv2d") {
		chain.push("Conv2D");
	};

	if (type == "mp2d") {
		chain.push("MaxPooling2D");
	};

	if (type == "flatten") {
		chain.push("Flatten");
	};

	if (type == "activation") {
		chain.push("Activation");
	};

	if (type == "dropout") {
		chain.push("Dropout");
	};

	if (type == "lstm") {
		chain.push("LSTM");
	};

	if (type == "batchnorm") {
		chain.push("BatchNormalization");
	};

	if (type == "reshape") {
		chain.push("Reshape");
	};
};

function writeCode(code, importChain, layerChain, compileParams) {

	code.insert("import numpy as np");
	code.insert("\n");
	code.insert("import keras");
	code.insert("\n");
	code.insert("from keras.models import Sequential, Model, model_from_json");
	code.insert("\n");

	var imports = new Set(importChain);
	var finalImports = Array.from(imports);

	for (i = 0; i < finalImports.length; i++) {
		code.insert("from keras.layers import " + String(finalImports[i]));
		code.insert("\n");
	};


};
