function Synapse() {
	this.name = 'Synapse';
	this.from = null;
	this.to = null;
}

Synapse.prototype.setFrom = function(layer) {
	this.from = layer;
}

Synapse.prototype.setTo = function(layer) {
	this.to = layer;
}

Synapse.prototype.ReceiveData = function(data) {
	this.received_information = data;
}

Synapse.prototype.SendData = function(data) {
	this.sent_information = data;
}

// --------------------------------------------------------------------------------------------------------------

function OutputBlock() {
	this.type = 'output';
	this.name = 'Output';
	this.received_information = null;
	this.sent_information = null;
}

OutputBlock.prototype.prediction = null;

OutputBlock.prototype.setPrediction = function(pred) {
	this.newBlockCenterText.innerText = pred;
}

OutputBlock.prototype.addBlock = function(model, parent, number) {
	// Final layer for model
	// Sends information to next model (if any)

	console.log('Adding Output block');

	var newBlock = document.createElement('div');
	newBlock.style.width = '200px';
	newBlock.style.height = '215px';
	newBlock.style.margin = '25px 20px';
	newBlock.style.borderRadius = '10px';
	newBlock.style.border = '1px solid #1dd1a1';
	newBlock.style.cursor = 'pointer';
	newBlock.style.boxShadow = '3px 3px 8px #88888850';
	var blockID = this.type + '_' + number;
	newBlock.id = blockID;

	var newBlockTop = document.createElement('div');
	newBlockTop.style.width = '200px';
	newBlockTop.style.height = '25%';
	newBlockTop.style.backgroundColor = '#1dd1a1';
	newBlockTop.style.borderTopLeftRadius = '10px';
	newBlockTop.style.borderTopRightRadius = '10px';
	newBlockTop.style.display = 'flex';
	newBlockTop.style.justifyContent = 'space-between';

	var newBlockTopTitle = document.createElement('p');
	var title_node = document.createTextNode(this.name);
	newBlockTopTitle.appendChild(title_node);
	newBlockTopTitle.style.fontSize = '20px';
	newBlockTopTitle.style.fontWeight = '500';
	newBlockTopTitle.style.padding = '0';
	newBlockTopTitle.style.margin = '0';
	newBlockTopTitle.style.paddingTop = '15px';
	newBlockTopTitle.style.marginLeft = '10px';
	newBlockTopTitle.style.color = 'white';

	var newBlockTopButton = document.createElement('p');
	newBlockTopButton.innerHTML = '<i class="fas fa-times"></i>';
	newBlockTopButton.style.fontSize = '17px';
	newBlockTopButton.style.padding = '0';
	newBlockTopButton.style.margin = '0';
	newBlockTopButton.style.paddingTop = '20px';
	newBlockTopButton.style.marginRight = '15px';
	newBlockTopButton.style.color = 'white';

	newBlockTopButton.addEventListener('click', function() {
		console.log('Deleting ' + blockID);
		parent.removeChild(document.getElementById(blockID));
	})

	var newBlockCenter = document.createElement('div');
	newBlockCenter.style.width = '100%';
	newBlockCenter.style.height = '60%';
	newBlockCenter.style.textAlign = 'center';
	newBlockCenter.style.backgroundColor = 'white';
	newBlockCenter.style.backgroundSize = 'cover';
	newBlockCenter.style.backgroundPosition = 'center';
	newBlockCenter.style.borderRight = '1px solid #1dd1a1'
	newBlockCenter.style.borderLeft = '1px solid #1dd1a1'

	this.newBlockCenterText = document.createElement('p');
	this.newBlockCenterText.innerHTML += '';
	this.newBlockCenterText.style.fontSize = '17px'
	this.newBlockCenterText.style.padding = '0';
	this.newBlockCenterText.style.margin = '0';
	this.newBlockCenterText.style.paddingTop = '50px'
	this.newBlockCenterText.style.color = 'black';
	this.newBlockCenterText.style.fontWeight = '600'
	this.newBlockCenterText.style.display = 'block';

	var newBlockSynapse = document.createElement('div');
	newBlockSynapse.style.width = '100%';
	newBlockSynapse.style.height = '15%';
	newBlockSynapse.style.backgroundColor = '#1dd1a1';
	newBlockSynapse.style.display = 'flex';
	newBlockSynapse.style.justifyContent = 'space-between';
	newBlockSynapse.style.borderBottomLeftRadius = '10px';
	newBlockSynapse.style.borderBottomRightRadius = '10px';
	var synapse1 = document.createElement('div');
	var synapse2 = document.createElement('div');
	synapse1.classList += 'synapse';
	synapse2.classList += 'synapse';

	newBlockTop.appendChild(newBlockTopTitle);
	newBlockTop.appendChild(newBlockTopButton);
	newBlockCenter.appendChild(this.newBlockCenterText);
	newBlockSynapse.appendChild(synapse1);
	newBlockSynapse.appendChild(synapse2);

	newBlock.appendChild(newBlockTop);
	newBlock.appendChild(newBlockCenter);
	newBlock.appendChild(newBlockSynapse);

	parent.appendChild(newBlock);
	parent.style.transitionDuration = '1s';
}

// --------------------------------------------------------------------------------------------------------------

function Dense() {
	this.type = 'fc';
	this.name = 'Fully Connected';
	this.num_units = 500;
	this.inputShape = [];
}

Dense.prototype.setInputShape = function(shape) {
	this.inputShape = shape;
}

Dense.prototype.getInputShape = function() {
	return this.inputShape;
}

Dense.prototype.getUnits = function() {
	return this.newBlockInput.value;
}

Dense.prototype.addBlock = function(model, numberLayer, block) {
	console.log('Adding Fully Connected block');

	var newBlock = document.createElement('div');
	newBlock.classList += 'new-block-dense';
	var blockID = this.type + '_' + numberLayer;
	newBlock.id = blockID;

	var newBlockTop = document.createElement('div');
	newBlockTop.classList += 'new-block-top';

	var newBlockText = document.createElement('p');
	newBlockText.innerText = this.name;
	newBlockText.classList += 'new-block-top-title';

	var newBlockText2 = document.createElement('p');
	newBlockText2.innerHTML = '<i class="fas fa-times"></i>';
	newBlockText2.classList += 'new-block-top-button';

	var newBlockInfoArea = document.createElement('div');
	newBlockInfoArea.classList += 'new-block-dense-info-panel';

	var newBlockParam = document.createElement('p');
	newBlockParam.innerText = 'Units';
	newBlockParam.classList += 'new-block-info-param';

	this.newBlockInput = document.createElement('input');
	this.newBlockInput.setAttribute('type', 'text');
	this.newBlockInput.value = this.num_units;
	this.newBlockInput.classList += 'new-block-info-input-field';

	newBlockText2.addEventListener('click', function() {
		console.log('Deleting ' + blockID);
		model.removeLayer(document.getElementById(blockID));
	})

	newBlockTop.appendChild(newBlockText);
	newBlockTop.appendChild(newBlockText2);
	newBlockInfoArea.appendChild(newBlockParam);
	newBlockInfoArea.appendChild(this.newBlockInput);

	newBlock.appendChild(newBlockTop);
	newBlock.appendChild(newBlockInfoArea);

	// parentSpace.appendChild(newBlock);
	model.addLayer(block, newBlock);
}

// --------------------------------------------------------------------------------------------------------------

function Conv2D() {
	this.type = 'conv2d';
	this.name = '2D Convolution';
	this.featureSize = 32;
	this.kernelSize = '3, 3';
}

Conv2D.prototype.getFeatureSize = function() {
	return this.newBlockInput.value;
}

Conv2D.prototype.getKernelSize = function() {
	return this.newBlockInput2.value;
}

Conv2D.prototype.addBlock = function (model, numberLayer, block) {
	console.log('Adding Conv2D block');

	var newBlock = document.createElement('div');
	newBlock.classList += 'new-block-conv2d';
	var blockID = this.type + '_' + numberLayer;
	newBlock.id = blockID;

	var newBlockTop = document.createElement('div');
	newBlockTop.classList += 'new-block-top';

	var newBlockText = document.createElement('p');
	newBlockText.innerText = this.name;
	newBlockText.classList += 'new-block-top-title';

	var newBlockText2 = document.createElement('p');
	newBlockText2.innerHTML = '<i class="fas fa-times"></i>';
	newBlockText2.classList += 'new-block-top-button';

	var newBlockInfoArea = document.createElement('div');
	newBlockInfoArea.classList += 'new-block-conv2d-info-panel';

	var newBlockParam = document.createElement('p');
	newBlockParam.innerText = 'Features';
	newBlockParam.classList += 'new-block-info-param';

	this.newBlockInput = document.createElement('input');
	this.newBlockInput.setAttribute('type', 'text');
	this.newBlockInput.value = this.featureSize;
	this.newBlockInput.classList += 'new-block-info-input-field';

	var newBlockInfoArea2 = document.createElement('div');
	newBlockInfoArea2.classList += 'new-block-conv2d-info-panel';

	var newBlockParam2 = document.createElement('p');
	newBlockParam2.innerText = 'Kernel Size';
	newBlockParam2.classList += 'new-block-info-param';

	this.newBlockInput2 = document.createElement('input');
	this.newBlockInput2.setAttribute('type', 'text');
	this.newBlockInput2.value = this.kernelSize;
	this.newBlockInput2.classList += 'new-block-info-input-field';

	newBlockText2.addEventListener('click', function() {
		console.log('Deleting ' + blockID);
		model.removeLayer(document.getElementById(blockID));
	})

	newBlockTop.appendChild(newBlockText);
	newBlockTop.appendChild(newBlockText2);
	newBlockInfoArea.appendChild(newBlockParam);
	newBlockInfoArea.appendChild(this.newBlockInput);
	newBlockInfoArea2.appendChild(newBlockParam2);
	newBlockInfoArea2.appendChild(this.newBlockInput2);

	newBlock.appendChild(newBlockTop);
	newBlock.appendChild(newBlockInfoArea);
	newBlock.appendChild(newBlockInfoArea2);

	// parentSpace.appendChild(newBlock);
	model.addLayer(block, newBlock);
  
};

// --------------------------------------------------------------------------------------------------------------

function Flatten() {
	this.type = 'flatten';
	this.name = 'Flatten';
}

Flatten.prototype.addBlock = function (model, numberLayer, block) {
	console.log('Adding Flatten block');

	var newBlock = document.createElement('div');
	newBlock.classList += 'new-block-flatten';
	var blockID = this.type + '_' + numberLayer;
	newBlock.id = blockID;

	var newBlockText = document.createElement('p');
	newBlockText.innerText = this.name;
	newBlockText.classList += 'new-block-top-title';

	var newBlockText2 = document.createElement('p');
	newBlockText2.innerHTML = '<i class="fas fa-times"></i>';
	newBlockText2.classList += 'new-block-top-button';

	newBlockText2.addEventListener('click', function() {
		console.log('Deleting ' + blockID);
		model.removeLayer(document.getElementById(blockID));
	})

	newBlock.appendChild(newBlockText);
	newBlock.appendChild(newBlockText2);
	// parentSpace.appendChild(newBlock);  
	model.addLayer(block, newBlock);

}

// --------------------------------------------------------------------------------------------------------------

function MaxPool2D() {
	this.type = 'maxpool2d';
	this.name = '2D MaxPooling';
	this.poolSize = '(2,2)';
}

MaxPool2D.prototype.getPoolSize = function() {
	return this.newBlockInput.value;
}

MaxPool2D.prototype.addBlock = function(model, numberLayer, block) {
	console.log('Adding Fully Connected block');

	var newBlock = document.createElement('div');
	newBlock.classList += 'new-block-input';
	var blockID = this.type + '_' + numberLayer;
	newBlock.id = blockID;

	var newBlockTop = document.createElement('div');
	newBlockTop.classList += 'new-block-top';

	var newBlockText = document.createElement('p');
	newBlockText.innerText = this.name;
	newBlockText.classList += 'new-block-top-title';

	var newBlockText2 = document.createElement('p');
	newBlockText2.innerHTML = '<i class="fas fa-times"></i>';
	newBlockText2.classList += 'new-block-top-button';

	var newBlockInfoArea = document.createElement('div');
	newBlockInfoArea.classList += 'new-block-input-info-panel';

	var newBlockParam = document.createElement('p');
	newBlockParam.innerText = 'Pool size';
	newBlockParam.classList += 'new-block-info-param';

	this.newBlockInput = document.createElement('input');
	this.newBlockInput.setAttribute('type', 'text');
	this.newBlockInput.value = this.poolSize;
	this.newBlockInput.classList += 'new-block-info-input-field';

	newBlockText2.addEventListener('click', function() {
		console.log('Deleting ' + blockID);
		model.removeLayer(document.getElementById(blockID));
	})

	newBlockTop.appendChild(newBlockText);
	newBlockTop.appendChild(newBlockText2);
	newBlockInfoArea.appendChild(newBlockParam);
	newBlockInfoArea.appendChild(this.newBlockInput);

	newBlock.appendChild(newBlockTop);
	newBlock.appendChild(newBlockInfoArea);

	// parentSpace.appendChild(newBlock);
	model.addLayer(block, newBlock);
}
