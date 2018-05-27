document.addEventListener('DOMContentLoaded', function() {

	console.log('Beginning session...');

	var num_input = 0;
	var num_compile = 0;
	var num_dense = 0;
	var num_activation = 0;
	var num_conv2d = 0;
	var num_maxpool2d = 0;
	var num_flatten = 0;
	var num_lstm = 0;
	var num_dropout = 0;
	var num_batchnorm = 0;

	// -----------------------------------------------------------------------------------------------

	var inputBlock = document.getElementById('Input');
	var compileBlock = document.getElementById('Compile');
	var denseBlock = document.getElementById('Dense');
	var activationBlock = document.getElementById('Activation');
	var conv2dBlock = document.getElementById('Conv2D');
	var maxpool2dBlock = document.getElementById('MaxPool2D');
	var flattenBlock = document.getElementById('Flatten');
	var lstmBlock = document.getElementById('LSTM');
	var dropoutBlock = document.getElementById('Dropout');
	var batchnormBlock = document.getElementById('BatchNorm');
	var playground = document.getElementById('playground');

	// -----------------------------------------------------------------------------------------------
	
	var programName = document.getElementById('programName');

	var palette = document.getElementById('palette');
	var paletteClose = document.getElementById('closePalette');
	var paletteOpen = document.getElementById('openPalette');

	var controlPanel = document.getElementById('control');
	var controlClose = document.getElementById('closeControl');
	var controlOpen = document.getElementById('openControl');
	var tracker = document.getElementById('tracker');
	var errors = document.getElementById('errors');

	var editor = document.getElementById('editor');
	var programTitle = document.getElementById('programTitle');
	var editorClose = document.getElementById('closeEditor');

	// -----------------------------------------------------------------------------------------------

	var exportBTN = document.getElementById('exportBTN');

	var newBTN = document.getElementById('newBTN');
	var editorBTN = document.getElementById('editorBTN');
	var panelBTN = document.getElementById('panelBTN');
	var aboutBTN = document.getElementById('aboutBTN');

	var downloadBTN = document.getElementById('downloadCode');

	// -----------------------------------------------------------------------------------------------

	var blocks = [];
	var layers = [];

	// -----------------------------------------------------------------------------------------------

	var codeEditor = ace.edit("codeEditor");
	codeEditor.setTheme("ace/theme/xcode");
	codeEditor.getSession().setMode("ace/mode/python");
	codeEditor.insert("# Export model to generate code...");
	codeEditor.insert("\n")

	// -----------------------------------------------------------------------------------------------

	paletteClose.addEventListener('click', function() {
		console.log('Closing Palette');
		palette.style.display = 'none';

		playground.style.left = '65px';
		playground.style.right = '300px';

		paletteOpen.style.display = 'block';
	})

	controlClose.addEventListener('click', function() {
		console.log('Closing Control Panel');
		controlPanel.style.display = 'none';
		playground.style.right = '0';
	})

	editorClose.addEventListener('click', function() {
		console.log('Closing Editor');
		editor.style.display = 'none';
		controlPanel.style.display = 'block';
		playground.style.right = '300px';
	})

	// -----------------------------------------------------------------------------------------------

	openPalette.addEventListener('click', function() {
		console.log('Opening Palette');

		palette.style.display = 'block';
		paletteOpen.style.display = 'none';

		playground.style.left = '220px';
	})

	openControl.addEventListener('click', function() {
		console.log('Opening Control Panel');

		controlPanel.style.display = 'block';

		playground.style.right = '300px';
		editor.style.display = 'none';
	})

  newBTN.addEventListener('click', function() {
		prompt = window.confirm('Are you sure you want to start afresh?')
		if (prompt) {
			console.log('Creating new project');

			blocks = [];
			layers = [];
			
			palette.style.display = 'block';
			paletteOpen.style.display = 'none';

			playground.style.left = '220px';
			playground.style.bottom = '0';
			playground.style.right = '300px';

			codeEditor.setValue("");
			codeEditor.insert("# Export model to generate code...");
			editor.style.display = 'none';

			controlPanel.style.display = 'block';

			playground.innerHTML = '';
			tracker.innerHTML = '';
			errors.innerHTML = "";
			programTitle.innerText = 'main.py';
			programName.value = "";
		}
	})

	editorBTN.addEventListener('click', function() {
		console.log('Opening Editor');
		editor.style.display = 'block';
		controlPanel.style.display = 'none';
		playground.style.right = '500px';
	})

	exportBTN.addEventListener('click', function() {
		console.log('Exporting code');
		var prompt = window.confirm('Are you sure you want to export the model?');
		if (prompt) {
			var title = programName.value;
			
			if (blocks.length == 0){
				window.alert('Model must be completed and compiled before exporting...')
			} else {
				if (title == "") {
					window.alert('Name your model before exporting...');
				} else {
					writeImports(blocks, codeEditor);
					setParams(blocks, layers);
					writeModel(blocks, layers, codeEditor);
					window.alert('Check the editor to see the code for your model!')
				}
			}
		}
	})

	// -----------------------------------------------------------------------------------------------

	downloadBTN.addEventListener('click', function() {
		console.log('Downloading code...');
	})
	
	programName.addEventListener('change', function() {
		var title = programName.value;
		setTitle(title);
	})

	// -----------------------------------------------------------------------------------------------

	inputBlock.addEventListener('click', function() {
		num_input += 1;
		var input = new Input();
		input.addBlock(playground);
		var inputID = input.blockID;
		blocks.push(input.blockID);
		layers.push(input);
		console.log("blocks: " + blocks);
		console.log("layers: " + layers);
		trackerLogs(tracker, 'Adding Input block with ID ' + inputID);
		trackErrors();

		input.newBlock.addEventListener('dblclick', function() {
			console.log(inputID + ' deleted');
			trackerLogs(tracker, 'Removing Input block with ID ' + inputID, "neg");
			var index = blocks.indexOf(inputID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_input -= 1;
			playground.removeChild(input.newBlock);
			console.log("blocks: " + blocks);
			console.log("layers: " + layers);
		})
	})

	compileBlock.addEventListener('click', function() {
		num_compile += 1;
		var compile = new Compile();
		compile.addBlock(playground);
		var compileID = compile.blockID;
		blocks.push(compileID);
		layers.push(compile);
		console.log("blocks: " + blocks);
		console.log("layers: " + layers);
		trackerLogs(tracker, 'Adding Compile block with ID ' + compileID);
		trackErrors();

		compile.newBlock.addEventListener('dblclick', function() {
			console.log(compileID + ' deleted');
			trackerLogs(tracker, 'Removing compile block with ID ' + compileID, "neg");
			var index = blocks.indexOf(compileID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_compile -= 1;
			playground.removeChild(compile.newBlock);
			console.log("blocks: " + blocks);
			console.log("layers: " + layers);
		})
	})

	denseBlock.addEventListener('click', function() {
		num_dense += 1;
		var dense = new Dense();
		dense.addBlock(playground);
		var denseID = dense.blockID;
		blocks.push(denseID);
		layers.push(dense);
		console.log("blocks: " + blocks);
		console.log("layers: " + layers);
		trackerLogs(tracker, 'Adding Dense block with ID ' + denseID);
		trackErrors();

		dense.newBlock.addEventListener('dblclick', function() {
			console.log(denseID + ' deleted');
			trackerLogs(tracker, 'Removing Dense block with ID ' + denseID, "neg");
			var index = blocks.indexOf(denseID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_dense -= 1;
			playground.removeChild(dense.newBlock);
			console.log("blocks: " + blocks);
			console.log("layers: " + layers);
		})
	})

	activationBlock.addEventListener('click', function() {
		num_activation += 1
		var activation = new Activation();
		activation.addBlock(playground);
		var activationID = activation.blockID;
		blocks.push(activationID);
		layers.push(activation);
		console.log("blocks: " + blocks);
		console.log("layers: " + layers);
		trackerLogs(tracker, 'Adding Activation block with ID ' + activationID);
		trackErrors();

		activation.newBlock.addEventListener('dblclick', function() {
			console.log(activationID + ' deleted');
			trackerLogs(tracker, 'Removing Activation block with ID ' + activationID, "neg");
			var index = blocks.indexOf(activationID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_activation -= 1
			playground.removeChild(activation.newBlock);
			console.log("blocks: " + blocks);
			console.log("layers: " + layers);
		})
	})

	conv2dBlock.addEventListener('click', function() {
		num_conv2d += 1;
		var conv2d = new Conv2D();
		conv2d.addBlock(playground);
		var conv2dID = conv2d.blockID;
		blocks.push(conv2d.blockID);
		layers.push(conv2d);
		console.log("blocks: " + blocks);
		console.log("layers: " + layers);
		trackerLogs(tracker, 'Adding Convolution2D block with ID ' + conv2dID);
		trackErrors();

		conv2d.newBlock.addEventListener('dblclick', function() {
			console.log(conv2dID + ' deleted');
			trackerLogs(tracker, 'Removing Convolution2D block with ID ' + conv2dID), "neg";
			var index = blocks.indexOf(conv2dID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_conv2d -= 1;
			playground.removeChild(conv2d.newBlock);
			console.log("blocks: " + blocks);
			console.log("layers: " + layers);
		})
	})

	maxpool2dBlock.addEventListener('click', function() {
		num_maxpool2d += 1;
		var maxpool2d = new MaxPool2D();
		maxpool2d.addBlock(playground);
		var maxpool2dID = maxpool2d.blockID;
		blocks.push(maxpool2dID);
		layers.push(maxpool2d);
		console.log("blocks: " + blocks);
		console.log("layers: " + layers);
		trackerLogs(tracker, 'Adding MaxPool2D block with ID ' + maxpool2dID);
		trackErrors();

		maxpool2d.newBlock.addEventListener('dblclick', function() {
			console.log(maxpool2d + ' deleted');
			trackerLogs(tracker, 'Removing MaxPool2D block with ID ' + maxpool2dID, "neg");
			var index = blocks.indexOf(maxpool2dID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_maxpool2d -= 1;
			playground.removeChild(maxpool2d.newBlock);
			console.log("blocks: " + blocks);
			console.log("layers: " + layers);
		})
	})
	
	flattenBlock.addEventListener('click', function() {
		num_flatten += 1;
		var flatten = new Flatten();
		flatten.addBlock(playground);
		var flattenID = flatten.blockID;
		blocks.push(flattenID);
		layers.push(flatten);
		console.log("blocks: " + blocks);
		console.log("layers: " + layers);
		trackerLogs(tracker, 'Adding Flatten block with ID ' + flattenID);
		trackErrors();

		flatten.newBlock.addEventListener('dblclick', function() {
			console.log(flatten + ' deleted');
			trackerLogs(tracker, 'Removing Flatten block with ID ' + flattenID, "neg");
			var index = blocks.indexOf(flattenID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_flatten -= 1;
			playground.removeChild(flatten.newBlock);
			console.log("blocks: " + blocks);
			console.log("layers: " + layers);
		})
	})

	lstmBlock.addEventListener('click', function() {
		trackErrors();
		console.log('LSTM');
	})

	dropoutBlock.addEventListener('click', function() {
		num_dropout += 1;
		var dropout = new Dropout();
		dropout.addBlock(playground);
		var dropoutID = dropout.blockID;
		blocks.push(dropoutID);
		layers.push(dropout);
		console.log("blocks: " + blocks);
		console.log("layers: " + layers);
		trackerLogs(tracker, 'Adding Dropout block with ID ' + dropoutID);
		trackErrors();

		dropout.newBlock.addEventListener('dblclick', function() {
			console.log(dropout + ' deleted');
			trackerLogs(tracker, 'Removing Dropout block with ID ' + dropoutID, "neg");
			var index = blocks.indexOf(dropoutID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_dropout -= 1;
			playground.removeChild(dropout.newBlock);
			console.log("blocks: " + blocks);
			console.log("layers: " + layers);
		})
	})

	batchnormBlock.addEventListener('click', function() {
		trackErrors();
		console.log('BatchNorm');
	})

	// -----------------------------------------------------------------------------------------------

	function writeImports(blocks, editor) {
		editor.setValue("");
		raw_blocks = [];
		editor.insert('# Writing Imports\n')
		editor.insert('import numpy as np\n')
		editor.insert('import keras\n')
		editor.insert('from keras.models import Sequential\n')

		for (i = 0; i < blocks.length; i++) {
			if (blocks[i].includes('Input')) {
				if (raw_blocks.includes('Input') == false) {
					raw_blocks.push('Input');
				}
			}
			else if (blocks[i].includes('Dense')) {
				if (raw_blocks.includes('Dense') == false) {
					raw_blocks.push('Dense');
				}
			}
			else if (blocks[i].includes('Activation')) {
				if (raw_blocks.includes('Activation') == false) {
					raw_blocks.push('Activation');
				}
			}
			else if (blocks[i].includes('Conv2D')) {
				if (raw_blocks.includes('Conv2D') == false) {
					raw_blocks.push('Conv2D');
				}
			}
			else if (blocks[i].includes('MaxPool2D')) {
				if (raw_blocks.includes('MaxPool2D') == false) {
					raw_blocks.push('MaxPool2D');
				}
			}
			else if (blocks[i].includes('Flatten')) {
				if (raw_blocks.includes('Flatten') == false) {
					raw_blocks.push('Flatten');
				}
			}
		}

		console.log(raw_blocks);

		for (j = 0; j < raw_blocks.length; j++) {
			if (raw_blocks[j] == 'Input') {
				editor.insert('from keras.layers import Input\n')
			}
			else if (raw_blocks[j] == 'Dense') {
				editor.insert('from keras.layers import Dense\n')
			}
			else if (raw_blocks[j] == 'Activation') {
				editor.insert('from keras.layers import Activation\n')
			}
			else if (raw_blocks[j] == 'Conv2D') {
				editor.insert('from keras.layers import Conv2D\n')
			}
			else if (raw_blocks[j] == 'MaxPool2D') {
				editor.insert('from keras.layers import MaxPool2D\n')
			}
			else if (raw_blocks[j] == 'Flatten') {
				editor.insert('from keras.layers import Flatten\n')
			}
		}

		editor.insert('\n');
	}

	// -----------------------------------------------------------------------------------------------

	function setParams(blocks, layers) {

		console.log(blocks);
		console.log(layers);

		for (i = 0; i < blocks.length; i++) {
			if (blocks[i].includes('Input')) {
				var inputDims = layers[i].newBlock.childNodes[1].value;
				layers[i].setInputDim(inputDims);
			}
			else if (blocks[i].includes('Dense')) {
				var noUnits = layers[i].newBlock.childNodes[1].value;
				layers[i].setUnits(noUnits);
			}
			else if (blocks[i].includes('Activation')) {
				var actFunc = layers[i].newBlock.childNodes[1].value;
				layers[i].setActivationFunction(actFunc);
			}
			else if (blocks[i].includes('Compile')) {
				var lossFunc = layers[i].newBlock.childNodes[1].value;
				var optimizer = layers[i].newBlock.childNodes[2].value;
				layers[i].setLoss(lossFunc);
				layers[i].setOptimizer(optimizer);
			}
			else if (blocks[i].includes('Conv2D')) {
				var filter = layers[i].newBlock.childNodes[1].value;
				var kernel = layers[i].newBlock.childNodes[2].value;
				layers[i].setFilter(filter);
				layers[i].setKernel(kernel);
			}
			else if (blocks[i].includes('MaxPool2D')) {
				var kernel = layers[i].newBlock.childNodes[1].value;
				layers[i].setKernel(kernel);
			}
		}
	}

	// -----------------------------------------------------------------------------------------------

	function writeModel(blocks, layers, editor) {
		editor.insert('# Writing model\n');
		editor.insert('model = Sequential()\n');

		for (i = 0; i < blocks.length; i++) {
			if (blocks[i].includes('Input')) {
				var inputDims = layers[i].inputDim;
				editor.insert('model.add(Input(' + inputDims + '))\n');
			}
			else if (blocks[i].includes('Dense')) {
				var units = layers[i].units;
				editor.insert('model.add(Dense(' + units + '))\n');
			}
			else if (blocks[i].includes('Activation')) {
				var actFunc = layers[i].activationFunc;
				editor.insert('model.add(Activation("' + actFunc + '"))\n');
			}
			else if (blocks[i].includes('Conv2D')) {
				var kernel = layers[i].kernel;
				var filter = layers[i].filter;
				editor.insert('model.add(Conv2D(' + filter + ', ' + kernel + '))\n');
			}
			else if (blocks[i].includes('MaxPool2D')) {
				var kernel = layers[i].kernel;
				editor.insert('model.add(MaxPool2D(pool_size=' + kernel + '))\n');
			}
			else if (blocks[i].includes('Flatten')) {
				editor.insert('model.add(Flatten())\n');
			}
			else if (blocks[i].includes('Compile')) {
				var lossFunc = layers[i].lossFunction;
				var optimizer = layers[i].optimizer;
				editor.insert('model.compile(loss="' + lossFunc + '", optimizer="' + optimizer + '")\n');
			}
		}

		console.log(blocks);
		console.log(layers);
	}

	// -----------------------------------------------------------------------------------------------

	function Input() {
		this.title = 'Input';
		this.inputDim = 0;
	}

	Input.prototype.setInputDim = function(inputDim) {
		this.inputDim = inputDim;
	}

	Input.prototype.getInputDim = function() {
		return this.inputDim;
	};

	Input.prototype.addBlock = function(playground) {
		this.newBlock = document.createElement('div');
		this.newBlock.style.width = '150px';
		this.newBlock.style.borderRadius = '5px';
		this.newBlock.style.height = '90px';
		this.newBlock.style.margin = '20px';
		this.newBlock.style.textAlign = 'center';
		this.newBlock.style.color = 'white';
		this.newBlock.style.opacity = '0.7';
		this.newBlock.style.backgroundColor = '#10ac84';
		this.newBlock.style.cursor = "move"

		this.newTitleNode = document.createElement('p');
		this.newTitleNode.style.paddingTop = '20px';
		this.newTitleNode.style.fontSize = '15px';

		this.newInput = document.createElement('input');
		this.newInput.setAttribute('type', 'text');
		this.newInput.setAttribute('placeholder', 'set input dims');
		this.newInput.style.width = '140px';
		this.newInput.style.height = '30px';
		this.newInput.style.marginTop = '-5px';
		this.newInput.style.textAlign = 'center';
		this.newInput.style.border = 'none';
		this.newInput.style.fontSize = '12px';
		this.newInput.style.fontFamily = 'Avenir Next';
		this.newInput.style.borderRadius = '15px';

		this.blockID = this.title + '_' + num_input
		this.newTitle = document.createTextNode(this.title);
		this.newTitleNode.appendChild(this.newTitle);
		this.newBlock.id = this.blockID;

		this.newBlock.appendChild(this.newTitleNode);
		this.newBlock.appendChild(this.newInput)
		playground.appendChild(this.newBlock);
		// draggable(this.newBlock.id);
	}

	// -----------------------------------------------------------------------------------------------

	function Dense() {
		this.title = 'Dense';
		this.units = 0;
	}

	Dense.prototype.setUnits = function(units) {
		this.units = units;
	}

	Dense.prototype.getUnits = function() {
		return this.units;
	};

	Dense.prototype.addBlock = function(playground) {
		this.newBlock = document.createElement('div');
		this.newBlock.style.width = '150px';
		this.newBlock.style.height = '90px';
		this.newBlock.style.borderRadius = '5px';
		this.newBlock.style.margin = '20px';
		this.newBlock.style.textAlign = 'center';
		this.newBlock.style.opacity = '0.7';
		this.newBlock.style.color = 'white';
		this.newBlock.style.backgroundColor = '#2e86de';
		this.newBlock.style.cursor = "move"

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_dense
		this.newTitle = document.createTextNode(this.title);
		this.newBlock.id = this.blockID;
		this.newTitleNode.style.color = 'white';
		this.newTitleNode.style.paddingTop = '20px';
		this.newTitleNode.style.fontSize = '15px';

		this.newInput = document.createElement('input');
		this.newInput.setAttribute('type', 'text');
		this.newInput.setAttribute('placeholder', 'set num. units');
		this.newInput.style.width = '140px';
		this.newInput.style.height = '30px';
		this.newInput.style.marginTop = '-5px';
		this.newInput.style.textAlign = 'center';
		this.newInput.style.border = 'none';
		this.newInput.style.fontSize = '12px';
		this.newInput.style.fontFamily = 'Avenir Next';
		this.newInput.style.borderRadius = '15px';

		this.newTitleNode.appendChild(this.newTitle);
		this.newBlock.appendChild(this.newTitleNode);
		this.newBlock.appendChild(this.newInput);
		playground.appendChild(this.newBlock);
	}

	// -----------------------------------------------------------------------------------------------

	function Activation() {
		this.title = 'Activation';
		this.activationFunc = 'relu';
	}

	Activation.prototype.setActivationFunction = function(actFunc) {
		this.activationFunc = actFunc;
	}

	Activation.prototype.getActivationFunction = function() {
		return this.activationFunc;
	};

	Activation.prototype.addBlock = function(playground) {
		this.newBlock = document.createElement('div');
		this.newBlock.style.width = '150px';
		this.newBlock.style.height = '90px';
		this.newBlock.style.borderRadius = '5px';
		this.newBlock.style.margin = '20px';
		this.newBlock.style.textAlign = 'center';
		this.newBlock.style.opacity = '0.7';
		this.newBlock.style.color = 'white';
		this.newBlock.style.backgroundColor = '#feca57';
		this.newBlock.style.cursor = "move"

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_activation
		this.newBlock.id = this.blockID;
		this.newTitle = document.createTextNode(this.title);
		this.newTitleNode.style.color = 'white';
		this.newTitleNode.style.paddingTop = '20px';
		this.newTitleNode.style.fontSize = '15px';

		this.newSelect = document.createElement("select");
		this.newSelect.style.border = "none";
		this.newSelect.style.width = "140px";
		this.newSelect.style.height = "30px";	

		var z1 = document.createElement("option");
		z1.setAttribute("value", "softmax");
		var t1 = document.createTextNode("softmax");
		z1.appendChild(t1);

		var z2 = document.createElement("option");
		z2.setAttribute("value", "elu");
		var t2 = document.createTextNode("elu");
		z2.appendChild(t2);

		var z3 = document.createElement("option");
		z3.setAttribute("value", "selu");
		var t3 = document.createTextNode("selu");
		z3.appendChild(t3);	
		
		var z4 = document.createElement("option");
		z4.setAttribute("value", "softplus");
		var t4 = document.createTextNode("softplus");
		z4.appendChild(t4);	

		var z5 = document.createElement("option");
		z5.setAttribute("value", "softsign");
		var t5 = document.createTextNode("softsign");
		z5.appendChild(t5);	

		var z6 = document.createElement("option");
		z6.setAttribute("value", "relu");
		var t6 = document.createTextNode("relu");
		z6.appendChild(t6);	

		var z7 = document.createElement("option");
		z7.setAttribute("value", "tanh");
		var t7 = document.createTextNode("tanh");
		z7.appendChild(t7);	

		var z8 = document.createElement("option");
		z8.setAttribute("value", "sigmoid");
		var t8 = document.createTextNode("sigmoid");
		z8.appendChild(t8);	

		var z9 = document.createElement("option");
		z9.setAttribute("value", "linear");
		var t9 = document.createTextNode("linear");
		z9.appendChild(t9);	

		var z10 = document.createElement("option");
		z10.setAttribute("value", "hard_sigmoid");
		var t10 = document.createTextNode("hard_sigmoid");
		z10.appendChild(t10);	
		
		this.newTitleNode.appendChild(this.newTitle);
		this.newBlock.appendChild(this.newTitleNode);
		this.newSelect.appendChild(z1);
		this.newSelect.appendChild(z2);
		this.newSelect.appendChild(z3);
		this.newSelect.appendChild(z4);
		this.newSelect.appendChild(z5);
		this.newSelect.appendChild(z6);
		this.newSelect.appendChild(z7);
		this.newSelect.appendChild(z8);
		this.newSelect.appendChild(z9);
		this.newSelect.appendChild(z10);
		this.newBlock.appendChild(this.newSelect);
		// this.newBlock.appendChild(this.newInput);
		playground.appendChild(this.newBlock);
	};

	// -----------------------------------------------------------------------------------------------

	function Compile() {
		this.title = 'Compile';
		this.lossFunction = 'categorical_crossentropy';
		this.optimizer = 'adam';
	}

	Compile.prototype.setLoss = function(lossFunc) {
		this.lossFunction = lossFunc;
	};

	Compile.prototype.setOptimizer = function(opt) {
		this.optimizer = opt;
	};

	Compile.prototype.getLoss = function() {
		return this.lossFunction;
	}

	Compile.prototype.getOptimizer = function() {
		return this.optimizer;
	}

	Compile.prototype.addBlock = function(playground) {
		this.newBlock = document.createElement('div');
		this.newBlock.style.width = '150px';
		this.newBlock.style.height = '125px';
		this.newBlock.style.borderRadius = '5px';
		this.newBlock.style.margin = '20px';
		this.newBlock.style.textAlign = 'center';
		this.newBlock.style.opacity = '0.7';
		this.newBlock.style.color = 'white';
		this.newBlock.style.backgroundColor = '#5f27cd';
		this.newBlock.style.cursor = "move"

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_compile
		this.newBlock.id = this.blockID;
		this.newTitle = document.createTextNode(this.title);
		this.newTitleNode.style.color = 'white';
		this.newTitleNode.style.paddingTop = '20px';
		this.newTitleNode.style.fontSize = '15px';

		this.newSelect = document.createElement("select");
		this.newSelect.style.border = "none";
		this.newSelect.style.width = "140px";
		this.newSelect.style.height = "30px";	

		var z1 = document.createElement("option");
		z1.setAttribute("value", "mean_squared_error");
		var t1 = document.createTextNode("mean_squared_error");
		z1.appendChild(t1);

		var z2 = document.createElement("option");
		z2.setAttribute("value", "mean_absolute_error");
		var t2 = document.createTextNode("mean_absolute_error");
		z2.appendChild(t2);

		var z3 = document.createElement("option");
		z3.setAttribute("value", "mean_absolute_percentage_error");
		var t3 = document.createTextNode("mean_absolute_percentage_error");
		z3.appendChild(t3);	
		
		var z4 = document.createElement("option");
		z4.setAttribute("value", "mean_squared_logarithmic_error");
		var t4 = document.createTextNode("mean_squared_logarithmic_error");
		z4.appendChild(t4);	

		var z5 = document.createElement("option");
		z5.setAttribute("value", "hinge");
		var t5 = document.createTextNode("hinge");
		z5.appendChild(t5);	

		var z6 = document.createElement("option");
		z6.setAttribute("value", "logcosh");
		var t6 = document.createTextNode("logcosh");
		z6.appendChild(t6);	

		var z7 = document.createElement("option");
		z7.setAttribute("value", "categorical_crossentropy");
		var t7 = document.createTextNode("categorical_crossentropy");
		z7.appendChild(t7);	

		var z8 = document.createElement("option");
		z8.setAttribute("value", "sparse_categorical_crossentropy");
		var t8 = document.createTextNode("sparse_categorical_crossentropy");
		z8.appendChild(t8);	

		var z9 = document.createElement("option");
		z9.setAttribute("value", "linear");
		var t9 = document.createTextNode("linear");
		z9.appendChild(t9);	

		var z10 = document.createElement("option");
		z10.setAttribute("value", "binary_crossentropy");
		var t10 = document.createTextNode("binary_crossentropy");
		z10.appendChild(t10);

		var z11 = document.createElement("option");
		z11.setAttribute("value", "kullback_leibler_divergence");
		var t11 = document.createTextNode("kullback_leibler_divergence");
		z11.appendChild(t11);

		var z121 = document.createElement("option");
		z121.setAttribute("value", "binary_crossentropy");
		var t121 = document.createTextNode("binary_crossentropy");
		z121.appendChild(t121);

		var z13 = document.createElement("option");
		z13.setAttribute("value", "poisson");
		var t13 = document.createTextNode("poisson");
		z13.appendChild(t13);

		var z14 = document.createElement("option");
		z14.setAttribute("value", "cosine_proximity");
		var t14 = document.createTextNode("cosine_proximity");
		z14.appendChild(t14);

		this.newSelect2 = document.createElement("select");
		this.newSelect2.style.border = "none";
		this.newSelect2.style.width = "140px";
		this.newSelect2.style.height = "30px";	
		this.newSelect2.style.marginTop = "5px";

		var z12 = document.createElement("option");
		z12.setAttribute("value", "sgd");
		var t12 = document.createTextNode("sgd");
		z12.appendChild(t12);

		var z22 = document.createElement("option");
		z22.setAttribute("value", "adagrad");
		var t22 = document.createTextNode("adagrad");
		z22.appendChild(t22);

		var z32 = document.createElement("option");
		z32.setAttribute("value", "adadelta");
		var t32 = document.createTextNode("adadelta");
		z32.appendChild(t32);	
		
		var z42 = document.createElement("option");
		z42.setAttribute("value", "adam");
		var t42 = document.createTextNode("adam");
		z42.appendChild(t42);	

		var z52 = document.createElement("option");
		z52.setAttribute("value", "adamax");
		var t52 = document.createTextNode("adamax");
		z52.appendChild(t52);	

		var z62 = document.createElement("option");
		z62.setAttribute("value", "nadam");
		var t62 = document.createTextNode("nadam");
		z62.appendChild(t62);	

		this.newTitleNode.appendChild(this.newTitle);
		this.newBlock.appendChild(this.newTitleNode);
		this.newSelect.appendChild(z1);
		this.newSelect.appendChild(z2);
		this.newSelect.appendChild(z3);
		this.newSelect.appendChild(z4);
		this.newSelect.appendChild(z5);
		this.newSelect.appendChild(z6);
		this.newSelect.appendChild(z7);
		this.newSelect.appendChild(z8);
		this.newSelect.appendChild(z9);
		this.newSelect.appendChild(z10);
		this.newSelect2.appendChild(z12);
		this.newSelect2.appendChild(z22);
		this.newSelect2.appendChild(z32);
		this.newSelect2.appendChild(z42);
		this.newSelect2.appendChild(z52);
		this.newSelect2.appendChild(z62);
		this.newBlock.appendChild(this.newSelect);
		this.newBlock.appendChild(this.newSelect2);
		// this.newBlock.appendChild(this.newInput);
		// this.newBlock.appendChild(this.newInput2);
		playground.appendChild(this.newBlock);
	};
	
	// -----------------------------------------------------------------------------------------------
	
	function Conv2D() {
		this.title = 'Conv2D';
		this.filter = 32;
		this.kernel = [2,2];
	}
	
	Conv2D.prototype.setFilter = function(fil) {
		this.filter = fil;
	}
	
	Conv2D.prototype.setKernel = function(ker) {
		this.kernel = ker;
	}
	
	Conv2D.prototype.getFilter = function() {
		return this.filter;
	}
	
	Conv2D.prototype.getKernel = function() {
		return this.kernel;
	}
	
	Conv2D.prototype.addBlock = function(playground) {
		this.newBlock = document.createElement('div');
		this.newBlock.style.width = '150px';
		this.newBlock.style.height = '125px';
		this.newBlock.style.borderRadius = '5px';
		this.newBlock.style.margin = '20px';
		this.newBlock.style.textAlign = 'center';
		this.newBlock.style.opacity = '0.7';
		this.newBlock.style.color = 'white';
		this.newBlock.style.backgroundColor = '#0abde3';
		this.newBlock.style.cursor = "move"

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_conv2d
		this.newBlock.id = this.blockID;
		this.newTitle = document.createTextNode(this.title);
		this.newTitleNode.style.color = 'white';
		this.newTitleNode.style.paddingTop = '20px';
		this.newTitleNode.style.fontSize = '15px';

		this.newInput = document.createElement('input');
		this.newInput.setAttribute('type', 'text');
		this.newInput.setAttribute('placeholder', 'set filters');
		this.newInput.style.width = '140px';
		this.newInput.style.height = '30px';
		this.newInput.style.marginTop = '-5px';
		this.newInput.style.textAlign = 'center';
		this.newInput.style.border = 'none';
		this.newInput.style.fontFamily = 'Avenir Next';
		this.newInput.style.fontSize = '12px';
		this.newInput.style.borderRadius = '15px';

		this.newInput2 = document.createElement('input');
		this.newInput2.setAttribute('type', 'text');
		this.newInput2.setAttribute('placeholder', 'set kernel size');
		this.newInput2.style.width = '140px';
		this.newInput2.style.height = '30px';
		this.newInput2.style.marginTop = '5px';
		this.newInput2.style.textAlign = 'center';
		this.newInput2.style.border = 'none';
		this.newInput2.style.fontFamily = 'Avenir Next';
		this.newInput2.style.fontSize = '12px';
		this.newInput2.style.borderRadius = '15px';

		this.newTitleNode.appendChild(this.newTitle);
		this.newBlock.appendChild(this.newTitleNode);
		this.newBlock.appendChild(this.newInput);
		this.newBlock.appendChild(this.newInput2);
		playground.appendChild(this.newBlock);
	}
	
	// -----------------------------------------------------------------------------------------------
	
	function MaxPool2D() {
		this.title = 'MaxPool2D';
		this.kernel = [2,2];
	}

	MaxPool2D.prototype.setKernel = function(ker) {
		this.kernel = ker;
	}

	MaxPool2D.prototype.getKernel = function() {
		return this.kernel;
	};

	MaxPool2D.prototype.addBlock = function(playground) {
		this.newBlock = document.createElement('div');
		this.newBlock.style.width = '150px';
		this.newBlock.style.height = '90px';
		this.newBlock.style.borderRadius = '5px';
		this.newBlock.style.margin = '20px';
		this.newBlock.style.textAlign = 'center';
		this.newBlock.style.opacity = '0.7';
		this.newBlock.style.color = 'white';
		this.newBlock.style.backgroundColor = '#ff9f43';
		this.newBlock.style.cursor = "move"

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_maxpool2d
		this.newBlock.id = this.blockID;
		this.newTitle = document.createTextNode(this.title);
		this.newTitleNode.style.color = 'white';
		this.newTitleNode.style.paddingTop = '20px';
		this.newTitleNode.style.fontSize = '15px';

		this.newInput = document.createElement('input');
		this.newInput.setAttribute('type', 'text');
		this.newInput.setAttribute('placeholder', 'set pooling kernel');
		this.newInput.style.width = '140px';
		this.newInput.style.height = '30px';
		this.newInput.style.marginTop = '-5px';
		this.newInput.style.textAlign = 'center';
		this.newInput.style.border = 'none';
		this.newInput.style.fontSize = '12px';
		this.newInput.style.fontFamily = 'Avenir Next';
		this.newInput.style.borderRadius = '15px';

		this.newTitleNode.appendChild(this.newTitle);
		this.newBlock.appendChild(this.newTitleNode);
		this.newBlock.appendChild(this.newInput);
		playground.appendChild(this.newBlock);
	}

	// -----------------------------------------------------------------------------------------------
	
	function Dropout() {
		this.title = 'Dropout';
		this.dropoutValue = 0.5;
	}
	
	Dropout.prototype.setDropoutValue = function(dropoutVal) {
		this.dropoutValue = dropoutVal;
	}
	
	Dropout.prototype.getDropoutValue = function() {
		return this.dropoutValue;
	}
	
	Dropout.prototype.addBlock = function(playground) {
		this.newBlock = document.createElement('div');
		this.newBlock.style.width = '150px';
		this.newBlock.style.height = '90px';
		this.newBlock.style.borderRadius = '5px';
		this.newBlock.style.margin = '20px';
		this.newBlock.style.textAlign = 'center';
		this.newBlock.style.opacity = '0.7';
		this.newBlock.style.color = 'white';
		this.newBlock.style.backgroundColor = '#58B19F';
		this.newBlock.style.cursor = "move"

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_dropout
		this.newBlock.id = this.blockID;
		this.newTitle = document.createTextNode(this.title);
		this.newTitleNode.style.color = 'white';
		this.newTitleNode.style.paddingTop = '20px';
		this.newTitleNode.style.fontSize = '15px';

		this.newInput = document.createElement('input');
		this.newInput.setAttribute('type', 'text');
		this.newInput.setAttribute('placeholder', 'Set Dropout value');
		this.newInput.style.width = '140px';
		this.newInput.style.height = '30px';
		this.newInput.style.marginTop = '-5px';
		this.newInput.style.textAlign = 'center';
		this.newInput.style.border = 'none';
		this.newInput.style.fontSize = '12px';
		this.newInput.style.fontFamily = 'Avenir Next';
		this.newInput.style.borderRadius = '15px';

		this.newTitleNode.appendChild(this.newTitle);
		this.newBlock.appendChild(this.newTitleNode);
		this.newBlock.appendChild(this.newInput);
		playground.appendChild(this.newBlock);
	}
	
	// -----------------------------------------------------------------------------------------------
	
	function Flatten() {
		this.title = 'Flatten';
	}
	
	Flatten.prototype.addBlock = function(playground) {
		this.newBlock = document.createElement('div');
		this.newBlock.style.width = '150px';
		this.newBlock.style.height = '50px';
		this.newBlock.style.borderRadius = '5px';
		this.newBlock.style.margin = '20px';
		this.newBlock.style.textAlign = 'center';
		this.newBlock.style.opacity = '0.7';
		this.newBlock.style.color = 'white';
		this.newBlock.style.backgroundColor = '#778beb';
		this.newBlock.style.cursor = "move"

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_dropout
		this.newBlock.id = this.blockID;
		this.newTitle = document.createTextNode(this.title);
		this.newTitleNode.style.color = 'white';
		this.newTitleNode.style.paddingTop = '15px';
		this.newTitleNode.style.fontSize = '15px';

		this.newTitleNode.appendChild(this.newTitle);
		this.newBlock.appendChild(this.newTitleNode);
		playground.appendChild(this.newBlock);
	}
	
	// -----------------------------------------------------------------------------------------------
	
	function setTitle(title) {
		if (title == "") {
			trackerLogs(tracker, "Please name your model...", "neg");
		} else {
			var message = 'Renaming model to "' + title + '"';
			title = title.split(" ");
			title = title.join("_");
			trackerLogs(tracker, message);
			title = title + '.py'
			programTitle.innerHTML = title;
		}
	}

	function trackerLogs(tracker, bashMsg, side="pos") {
		var bash = document.createElement('p');
		var bashNode = document.createTextNode(bashMsg);
		bash.style.width = '80%';
		bash.style.margin = '20px auto';

		if (side == "pos") {
			bash.style.border = '1px solid #218c74';
			bash.style.color = "#218c74";
		} else if (side == "neg") {
			bash.style.border = '1px solid #ee5253';
			bash.style.color = "#ee5253";
		}

		bash.style.borderRadius = '5px';
		bash.style.padding = '10px';
		bash.appendChild(bashNode);
		tracker.appendChild(bash);
	}

	function errorLogs(errors, bashMsg) {
		var bash = document.createElement('p');
		var bashNode = document.createTextNode(bashMsg);

		bash.style.width = '80%';
		bash.style.margin = '20px auto';
		bash.style.border = '1px solid #ee5253';
		bash.style.color = "#ee5253";
		bash.style.borderRadius = '5px';
		bash.style.padding = '10px';

		bash.appendChild(bashNode);
		errors.appendChild(bash);
	}

	function trackErrors() {
		var currentErrors = [];
		console.log("Current error blocks: " + blocks);

		if (blocks[0].includes("Input")) {
			var msg = "No Input block found at beginning";
			currentErrors.pop(msg);
			
		} else {
			var msg = "No Input block found at beginning";
			if (currentErrors.includes(msg)) {} else {
				console.log(msg);
				errorLogs(errors, msg);
				currentErrors.push(msg);
			}
		}

	}
});