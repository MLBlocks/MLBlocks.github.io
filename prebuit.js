function ObjectDetectionBlock() {
	this.name = 'Object-Detector';
	this.selected = false;
}

ObjectDetectionBlock.prototype.addBlock = function(model, parent, number) {
	// Starting layer for model
	// Sends information to Output layer in Model Object

	console.log('Adding Object Detection block');

	var newBlock = document.createElement('div');
	newBlock.style.width = '280px';
	newBlock.style.height = '182.75px';
	newBlock.style.margin = '20px 20px';
	newBlock.style.borderRadius = '10px';
	newBlock.style.border = 'none';
	newBlock.style.cursor = 'pointer';
	var blockID = this.name + '_' + number;
	newBlock.id = blockID;

	var newBlockTop = document.createElement('div');
	newBlockTop.style.width = '100%';
	newBlockTop.style.height = '53.75px';
	newBlockTop.style.backgroundColor = 'rgba(55,116,241,1)';
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
		console.log('Deleting ' + newBlock.id);
		model.removeLayer(document.getElementById(blockID));
	})

	var newBlockCenter = document.createElement('div');
	newBlockCenter.style.position = 'relative';
	newBlockCenter.style.width = '99%';
	newBlockCenter.style.height = '86px';
	newBlockCenter.style.textAlign = 'center';
	newBlockCenter.style.backgroundColor = 'white';
	newBlockCenter.style.backgroundSize = 'cover';
	newBlockCenter.style.backgroundPosition = 'center';
	newBlockCenter.style.borderRight = '1px solid rgba(55,116,241,1)';
	newBlockCenter.style.borderLeft = '1px solid rgba(55,116,241,1)';

	var newBlockCenterInfoBar = document.createElement('div');
	newBlockCenterInfoBar.style.position = 'relative';
	newBlockCenterInfoBar.style.width = '100%';
	newBlockCenterInfoBar.style.height = '43px';
	newBlockCenterInfoBar.style.backgroundColor = 'rgba(55,116,241,1)';
	newBlockCenterInfoBar.style.margin = '0';
	newBlockCenterInfoBar.style.padding =  '0';
	newBlockCenterInfoBar.style.display = 'flex';
	newBlockCenterInfoBar.style.justifyContent = 'space-between';
	newBlockCenterInfoBar.style.borderBottomLeftRadius = '10px';
	newBlockCenterInfoBar.style.borderBottomRightRadius = '10px';
	var infoPanelIsOpen = false;

	var newBlockCenterInfoBarTitle = document.createElement('p');
	var newBlockCenterInfoBarTitleNode = document.createTextNode("More Info");
	newBlockCenterInfoBarTitle.appendChild(newBlockCenterInfoBarTitleNode);
	newBlockCenterInfoBarTitle.style.fontSize = '15px';
	newBlockCenterInfoBarTitle.style.fontWeight = '500';
	newBlockCenterInfoBarTitle.style.padding = '0';
	newBlockCenterInfoBarTitle.style.margin = '0';
	newBlockCenterInfoBarTitle.style.paddingTop = '12px';
	newBlockCenterInfoBarTitle.style.marginLeft = '10px';
	newBlockCenterInfoBarTitle.style.color = 'white';

	var newBlockCenterInfoBarButton = document.createElement('p');
	newBlockCenterInfoBarButton.innerHTML = '<i class="fas fa-chevron-down"></i>'
	newBlockCenterInfoBarButton.style.fontSize = '17px';
	newBlockCenterInfoBarButton.style.padding = '0';
	newBlockCenterInfoBarButton.style.margin = '0';
	newBlockCenterInfoBarButton.style.paddingTop = '15px';
	newBlockCenterInfoBarButton.style.marginRight = '10px';
	newBlockCenterInfoBarButton.style.color = 'white';

	var layerSpace = document.createElement('div');
	layerSpace.style.width = '300px';
	layerSpace.style.minHeight = 'auto';
	layerSpace.style.backgroundColor = '#3370f5';
	layerSpace.style.margin = '25px 0';
	layerSpace.style.borderRadius = '10px';
	layerSpace.style.border = 'none';
	layerSpace.style.cursor = 'pointer';
	layerSpace.style.visibility = 'hidden';
	layerSpace.style.display = 'flex';
	layerSpace.style.flexDirection = 'column';
	layerSpace.style.justifyContent = 'center';
	layerSpace.id = 'block-space-' + number;

	newBlockTop.appendChild(newBlockTopTitle);
	newBlockTop.appendChild(newBlockTopButton);
	newBlockCenterInfoBar.appendChild(newBlockCenterInfoBarTitle);
	newBlockCenterInfoBar.appendChild(newBlockCenterInfoBarButton);

	newBlock.appendChild(newBlockTop);
	newBlock.appendChild(newBlockCenter);
	newBlock.appendChild(newBlockCenterInfoBar);
	newBlock.appendChild(layerSpace);

	parent.appendChild(newBlock);
	parent.style.transitionDuration = '1s';

	newBlockCenterInfoBarButton.addEventListener('click', function() {
		if (infoPanelIsOpen == false) {
			console.log('Showing more info for ' + blockID);
			newBlockCenterInfoBarButton.innerHTML = '<i class="fas fa-chevron-up"></i>'
			document.getElementById('block-space-' + number).style.visibility = 'visible';
			infoPanelIsOpen = true;
		} else if (infoPanelIsOpen == true) {
			console.log('Hiding info for ' + blockID);
			newBlockCenterInfoBarButton.innerHTML = '<i class="fas fa-chevron-down"></i>'
			document.getElementById('block-space-' + number).style.visibility = 'hidden';
			infoPanelIsOpen = false;
		}
	})

	document.getElementById(blockID).addEventListener('dbclick', function() {
		if (this.selected == true) {
			console.log('Selected');
			this.selected = false;
		} else if (this.selected == false) {
			console.log('Deselected');
			this.selected = true;
		}
	})
}

ObjectDetectionBlock.prototype.addLayer = function(layerBlock, modelNumber, numberLayer) {
	console.log(modelNumber);
	var Space = document.getElementById('block-space-' + modelNumber);
	layerBlock.addToParent(Space, numberLayer);
}

// --------------------------------------------------------------------------------------------------------------

function ImageClassifierBlock() {
	this.name = 'Image-Classifier';
}

ImageClassifierBlock.prototype.addBlock = function(parent, number) {
	// Starting layer for model
	// Sends information to Output layer in Model Object

	console.log('Adding Object Detection block');

	var newBlock = document.createElement('div');
	newBlock.style.width = '280px';
	newBlock.style.height = '182.75px';
	newBlock.style.margin = '20px 10px';
	newBlock.style.borderRadius = '10px';
	newBlock.style.border = 'none';
	newBlock.style.cursor = 'pointer';
	var blockID = this.name + '_' + number;
	newBlock.id = blockID;

	var newBlockTop = document.createElement('div');
	newBlockTop.style.width = '100%';
	newBlockTop.style.height = '53.75px';
	newBlockTop.style.backgroundColor = 'rgba(55,116,241,1)';
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

	var newBlockCenter = document.createElement('div');
	newBlockCenter.style.position = 'relative';
	newBlockCenter.style.width = '99%';
	newBlockCenter.style.height = '86px';
	newBlockCenter.style.textAlign = 'center';
	newBlockCenter.style.backgroundColor = 'white';
	newBlockCenter.style.backgroundSize = 'cover';
	newBlockCenter.style.backgroundPosition = 'center';
	newBlockCenter.style.borderRight = '1px solid rgba(55,116,241,1)';
	newBlockCenter.style.borderLeft = '1px solid rgba(55,116,241,1)';

	var newBlockCenterInfoBar = document.createElement('div');
	newBlockCenterInfoBar.style.position = 'relative';
	newBlockCenterInfoBar.style.width = '100%';
	newBlockCenterInfoBar.style.height = '43px';
	newBlockCenterInfoBar.style.backgroundColor = 'rgba(55,116,241,1)';
	newBlockCenterInfoBar.style.margin = '0';
	newBlockCenterInfoBar.style.padding =  '0';
	newBlockCenterInfoBar.style.display = 'flex';
	newBlockCenterInfoBar.style.justifyContent = 'space-between';
	newBlockCenterInfoBar.style.borderBottomLeftRadius = '10px';
	newBlockCenterInfoBar.style.borderBottomRightRadius = '10px';
	var infoPanelIsOpen = false;

	var newBlockCenterInfoBarTitle = document.createElement('p');
	var newBlockCenterInfoBarTitleNode = document.createTextNode("More Info");
	newBlockCenterInfoBarTitle.appendChild(newBlockCenterInfoBarTitleNode);
	newBlockCenterInfoBarTitle.style.fontSize = '15px';
	newBlockCenterInfoBarTitle.style.fontWeight = '500';
	newBlockCenterInfoBarTitle.style.padding = '0';
	newBlockCenterInfoBarTitle.style.margin = '0';
	newBlockCenterInfoBarTitle.style.paddingTop = '12px';
	newBlockCenterInfoBarTitle.style.marginLeft = '10px';
	newBlockCenterInfoBarTitle.style.color = 'white';

	var newBlockCenterInfoBarButton = document.createElement('p');
	newBlockCenterInfoBarButton.innerHTML = '<i class="fas fa-chevron-down"></i>'
	newBlockCenterInfoBarButton.style.fontSize = '17px';
	newBlockCenterInfoBarButton.style.padding = '0';
	newBlockCenterInfoBarButton.style.margin = '0';
	newBlockCenterInfoBarButton.style.paddingTop = '15px';
	newBlockCenterInfoBarButton.style.marginRight = '10px';
	newBlockCenterInfoBarButton.style.color = 'white';

	var layerSpace = document.createElement('div');
	layerSpace.style.width = '300px';
	layerSpace.style.minHeight = 'auto';
	layerSpace.style.backgroundColor = '#3370f5';
	layerSpace.style.margin = '25px 0';
	layerSpace.style.borderRadius = '10px';
	layerSpace.style.border = 'none';
	layerSpace.style.cursor = 'pointer';
	layerSpace.style.visibility = 'hidden';
	layerSpace.style.display = 'flex';
	layerSpace.style.flexDirection = 'column';
	layerSpace.style.justifyContent = 'center';
	layerSpace.id = 'block-space-' + number;

	newBlockTop.appendChild(newBlockTopTitle);
	newBlockTop.appendChild(newBlockTopButton);
	newBlockCenterInfoBar.appendChild(newBlockCenterInfoBarTitle);
	newBlockCenterInfoBar.appendChild(newBlockCenterInfoBarButton);

	newBlock.appendChild(newBlockTop);
	newBlock.appendChild(newBlockCenter);
	newBlock.appendChild(newBlockCenterInfoBar);
	newBlock.appendChild(layerSpace);

	parent.appendChild(newBlock);
	parent.style.transitionDuration = '1s';

	newBlockCenterInfoBarButton.addEventListener('click', function() {
		if (infoPanelIsOpen == false) {
			console.log('Showing more info for ' + blockID);
			newBlockCenterInfoBarButton.innerHTML = '<i class="fas fa-chevron-up"></i>'
			document.getElementById('block-space-' + number).style.visibility = 'visible';
			infoPanelIsOpen = true;
		} else if (infoPanelIsOpen == true) {
			console.log('Hiding info for ' + blockID);
			newBlockCenterInfoBarButton.innerHTML = '<i class="fas fa-chevron-down"></i>'
			document.getElementById('block-space-' + number).style.visibility = 'hidden';
			infoPanelIsOpen = false;
		}
	})

	document.getElementById(blockID).addEventListener('dbclick', function() {
		if (this.selected == true) {
			console.log('Selected');
			this.selected = false;
		} else if (this.selected == false) {
			console.log('Deselected');
			this.selected = true;
		}
	})
}

ImageClassifierBlock.prototype.addLayer = function(layerBlock, modelNumber, numberLayer) {
	console.log(modelNumber);
	var Space = document.getElementById('block-space-' + modelNumber);
	layerBlock.addToParent(Space, numberLayer);
}
