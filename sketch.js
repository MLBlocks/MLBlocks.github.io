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
	var paletteClose = document.getElementById('paletteHead');
	var paletteOpen = document.getElementById('openPalette');

	var controlPanel = document.getElementById('control');
	var controlClose = document.getElementById('controlHead');
	var controlOpen = document.getElementById('openControl');
	var tracker = document.getElementById('tracker');

	var editor = document.getElementById('editor');
	var programTitle = document.getElementById('programTitle');
	var editorClose = document.getElementById('editorHead');

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
			programName.innerHTML = '';
		} else {};
	})

	editorBTN.addEventListener('click', function() {
		console.log('Opening Editor');
		editor.style.display = 'block';
		controlPanel.style.display = 'none';
		playground.style.right = '500px';
	})

	exportBTN.addEventListener('click', function() {
		codeEditor.setValue("");
		console.log('Exporting code');
		var prompt = window.confirm('Are you sure you want to export the model?');
		if (prompt) {
			var title = programName.value;
			
			if (title == "") {
				window.alert('Name your model before exporting...');
			}
			
			if (blocks.length == 0){
				window.alert('Model must be completed and compiled before exporting...')
			} else {
				writeImports(blocks, codeEditor);
				setParams(blocks, layers);
				writeModel(blocks, layers, codeEditor);
				window.alert('Check the editor to see the code for your model!')
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
		console.log(blocks);
		trackerLogs(tracker, 'Adding Input block with ID ' + inputID);

		input.newBlock.addEventListener('dblclick', function() {
			console.log(inputID + ' deleted');
			trackerLogs(tracker, 'Removing Input block with ID ' + inputID);
			var index = blocks.indexOf(inputID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_input -= 1;
			playground.removeChild(input.newBlock);
			console.log(blocks);
		})
	})

	compileBlock.addEventListener('click', function() {
		num_compile += 1;
		var compile = new Compile();
		compile.addBlock(playground);
		var compileID = compile.blockID;
		blocks.push(compileID);
		layers.push(compile);
		console.log(blocks);
		trackerLogs(tracker, 'Adding Compile block with ID ' + compileID);

		compile.newBlock.addEventListener('dblclick', function() {
			console.log(compileID + ' deleted');
			trackerLogs(tracker, 'Removing compile block with ID ' + compileID);
			var index = blocks.indexOf(compileID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_compile -= 1;
			playground.removeChild(compile.newBlock);
			console.log(blocks);
		})
	})

	denseBlock.addEventListener('click', function() {
		num_dense += 1;
		var dense = new Dense();
		dense.addBlock(playground);
		var denseID = dense.blockID;
		blocks.push(denseID);
		layers.push(dense);
		console.log(blocks);
		trackerLogs(tracker, 'Adding Dense block with ID ' + denseID);

		dense.newBlock.addEventListener('dblclick', function() {
			console.log(denseID + ' deleted');
			trackerLogs(tracker, 'Removing Dense block with ID ' + denseID);
			var index = blocks.indexOf(denseID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_dense -= 1;
			playground.removeChild(dense.newBlock);
			console.log(blocks);
		})
	})

	activationBlock.addEventListener('click', function() {
		num_activation += 1
		var activation = new Activation();
		activation.addBlock(playground);
		var activationID = activation.blockID;
		blocks.push(activationID);
		layers.push(activation);
		console.log(blocks);
		trackerLogs(tracker, 'Adding Activation block with ID ' + activationID);

		activation.newBlock.addEventListener('dblclick', function() {
			console.log(activationID + ' deleted');
			trackerLogs(tracker, 'Removing Activation block with ID ' + activationID);
			var index = blocks.indexOf(activationID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_activation -= 1
			playground.removeChild(activation.newBlock);
			console.log(blocks);
		})
	})

	conv2dBlock.addEventListener('click', function() {
		num_conv2d += 1;
		var conv2d = new Conv2D();
		conv2d.addBlock(playground);
		var conv2dID = conv2d.blockID;
		blocks.push(conv2d.blockID);
		layers.push(conv2d);
		console.log(blocks);
		trackerLogs(tracker, 'Adding Convolution2D block with ID ' + conv2dID);

		conv2d.newBlock.addEventListener('dblclick', function() {
			console.log(conv2dID + ' deleted');
			trackerLogs(tracker, 'Removing Convolution2D block with ID ' + conv2dID);
			var index = blocks.indexOf(conv2dID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_conv2d -= 1;
			playground.removeChild(conv2d.newBlock);
			console.log(blocks);
		})
	})

	maxpool2dBlock.addEventListener('click', function() {
		num_maxpool2d += 1;
		var maxpool2d = new MaxPool2D();
		maxpool2d.addBlock(playground);
		var maxpool2dID = maxpool2d.blockID;
		blocks.push(maxpool2dID);
		layers.push(maxpool2d);
		console.log(blocks);
		trackerLogs(tracker, 'Adding MaxPool2D block with ID ' + maxpool2dID);

		maxpool2d.newBlock.addEventListener('dblclick', function() {
			console.log(maxpool2d + ' deleted');
			trackerLogs(tracker, 'Removing MaxPool2D block with ID ' + maxpool2dID);
			var index = blocks.indexOf(maxpool2dID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_maxpool2d -= 1;
			playground.removeChild(maxpool2d.newBlock);
			console.log(blocks);
		})
	})
	
	flattenBlock.addEventListener('click', function() {
		num_flatten += 1;
		var flatten = new Flatten();
		flatten.addBlock(playground);
		var flattenID = flatten.blockID;
		blocks.push(flattenID);
		layers.push(flatten);
		console.log(blocks);
		trackerLogs(tracker, 'Adding Flatten block with ID ' + flattenID);

		flatten.newBlock.addEventListener('dblclick', function() {
			console.log(flatten + ' deleted');
			trackerLogs(tracker, 'Removing Flatten block with ID ' + flattenID);
			var index = blocks.indexOf(flattenID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_flatten -= 1;
			playground.removeChild(flatten.newBlock);
			console.log(blocks);
		})
	})

	lstmBlock.addEventListener('click', function() {
		console.log('LSTM');
	})

	dropoutBlock.addEventListener('click', function() {
		num_dropout += 1;
		var dropout = new Dropout();
		dropout.addBlock(playground);
		var dropoutID = dropout.blockID;
		blocks.push(dropoutID);
		layers.push(dropout);
		console.log(blocks);
		trackerLogs(tracker, 'Adding Dropout block with ID ' + dropoutID);

		dropout.newBlock.addEventListener('dblclick', function() {
			console.log(dropout + ' deleted');
			trackerLogs(tracker, 'Removing Dropout block with ID ' + dropoutID);
			var index = blocks.indexOf(dropoutID);
			blocks.splice(index, 1);
			layers.splice(index, 1);
			num_dropout -= 1;
			playground.removeChild(dropout.newBlock);
			console.log(blocks);
		})
	})

	batchnormBlock.addEventListener('click', function() {
		console.log('BatchNorm');
	})

	// -----------------------------------------------------------------------------------------------

	function writeImports(blocks, editor) {
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
				editor.insert('model.add(Flatten())');
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

		this.newBlock.appendChild(this.newTitleNode);
		this.newBlock.appendChild(this.newInput)
		playground.appendChild(this.newBlock);
		console.log('Added Input block');
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
		this.newBlock.style.backgroundColor = '#40739e';

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_dense
		this.newTitle = document.createTextNode(this.title);
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
		console.log('Added Dense block');
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
		this.newBlock.style.backgroundColor = '#ffd32a';

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_activation
		this.newTitle = document.createTextNode(this.title);
		this.newTitleNode.style.color = 'white';
		this.newTitleNode.style.paddingTop = '20px';
		this.newTitleNode.style.fontSize = '15px';

		this.newInput = document.createElement('input');
		this.newInput.setAttribute('type', 'text');
		this.newInput.setAttribute('placeholder', 'set activation function');
		this.newInput.style.width = '140px';
		this.newInput.style.height = '30px';
		this.newInput.style.marginTop = '-5px';
		this.newInput.style.textAlign = 'center';
		this.newInput.style.border = 'none';
		this.newInput.style.fontFamily = 'Avenir Next';
		this.newInput.style.fontSize = '12px';
		this.newInput.style.borderRadius = '15px';

		this.newTitleNode.appendChild(this.newTitle);
		this.newBlock.appendChild(this.newTitleNode);
		this.newBlock.appendChild(this.newInput);
		playground.appendChild(this.newBlock);
		console.log('Added Activation block');
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
		this.newBlock.style.backgroundColor = '#fc5c65';

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_compile
		this.newTitle = document.createTextNode(this.title);
		this.newTitleNode.style.color = 'white';
		this.newTitleNode.style.paddingTop = '20px';
		this.newTitleNode.style.fontSize = '15px';

		this.newInput = document.createElement('input');
		this.newInput.setAttribute('type', 'text');
		this.newInput.setAttribute('placeholder', 'set loss function');
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
		this.newInput2.setAttribute('placeholder', 'set optimizer');
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
		console.log('Added Compile block');
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
		this.newBlock.style.backgroundColor = '#fc5c65';

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_conv2d
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
		console.log('Added Convolution2D block');
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
		this.newBlock.style.backgroundColor = '#40739e';

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_maxpool2d
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
		console.log('Added MaxPool2D block');
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
		this.newBlock.style.backgroundColor = '#40739e';

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_dropout
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
		console.log('Added Dropout block');
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
		this.newBlock.style.backgroundColor = '#40739e';

		this.newTitleNode = document.createElement('p');
		this.blockID = this.title + '_' + num_dropout
		this.newTitle = document.createTextNode(this.title);
		this.newTitleNode.style.color = 'white';
		this.newTitleNode.style.paddingTop = '15px';
		this.newTitleNode.style.fontSize = '15px';

		this.newTitleNode.appendChild(this.newTitle);
		this.newBlock.appendChild(this.newTitleNode);
		playground.appendChild(this.newBlock);
		console.log('Added Flatten block');
	}
	
	// -----------------------------------------------------------------------------------------------
	
	function setTitle(title) {
		title = title.split(" ");
		title = title.join("_");
		var message = 'Renaming model to "' + title + '"';
		trackerLogs(tracker, message);
		title = title + '.py'
		programTitle.innerHTML = title;
	}

	function trackerLogs(tracker, bashMsg) {
		var bash = document.createElement('p');
		var bashNode = document.createTextNode(bashMsg);
		bash.style.width = '80%';
		bash.style.margin = '20px auto';
		bash.style.borderRadius = '5px';
		bash.style.border = '1px solid #218c74';
		bash.style.padding = '10px';
		bash.appendChild(bashNode);
		tracker.appendChild(bash);
	}

})
