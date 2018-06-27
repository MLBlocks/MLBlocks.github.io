function Synapse() {
    this.name = 'Synapse';
    this.from = null;
    this.to = null;
    this.received_information = null;
    this.sent_information = null;
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
    this.name = 'Output';
    this.received_information = null;
    this.sent_information = null;
}

OutputBlock.prototype.prediction = null;

OutputBlock.prototype.setPrediction = function(pred) {
    this.newBlockCenterText.innerText = pred;
}

OutputBlock.prototype.addBlock = function(parent, number) {
    // Final layer for model
    // Sends information to next model (if any)

    console.log('Adding Output block');

    var newBlock = document.createElement('div');
    newBlock.style.width = '200px';
    newBlock.style.height = '215px';
    newBlock.style.margin = '25px 20px';
    newBlock.style.borderRadius = '10px';
    newBlock.style.border = 'none';
    newBlock.style.cursor = 'pointer';
    var blockID = this.name + '_' + number;
    newBlock.id = blockID;

    var newBlockTop = document.createElement('div');
    newBlockTop.style.width = '100%';
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
    newBlockCenter.style.width = '99%';
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
    this.name = 'Dense';
    this.received_information = null;
    this.sent_information = null;
    this.num_units = 500;
}

Dense.prototype.setUnits = function(units) {
    this.num_units = units;
}

Dense.prototype.getUnits = function() {
    console.log(this.num_units);
    return this.num_units;
}

Dense.prototype.addBlock = function(parentSpace, numberLayer) {
    console.log('Adding Fully Connected block');

    var newBlock = document.createElement('div');
    var newBlock = document.createElement('div');
    newBlock.style.width = '280px';
    newBlock.style.height = '40px';
    newBlock.style.backgroundColor = '#f6b93b';
    newBlock.style.margin = '10px auto';
    newBlock.style.marginRight = '10px';
    newBlock.style.marginLeft = '10px';
    newBlock.style.paddingTop = '5px';
    newBlock.style.borderRadius = '7px';
    newBlock.style.border = 'none';
    newBlock.style.cursor = 'pointer';
    newBlock.style.display = 'flex';
    newBlock.style.justifyContent = 'space-between';
    var blockID = this.name + '_' + numberLayer;
    newBlock.id = blockID;

    var newBlockText = document.createElement('p');
    newBlockText.innerText = this.name;
    newBlockText.style.color = 'white';
    newBlockText.style.fontSize = '17px';
    newBlockText.style.fontWeight = '600';
    newBlockText.style.margin = 0;
    newBlockText.style.padding = 0;
    newBlockText.style.paddingTop = '5px';
    newBlockText.style.marginRight = '85px';
    newBlockText.style.marginLeft = '10px';

    var newBlockInput = document.createElement('input');
    newBlockInput.setAttribute('type', 'text');
    newBlockInput.value = this.num_units;
    newBlockInput.style.textAlign = 'center';
    newBlockInput.style.width = '60px';
    newBlockInput.style.height = '25px';
    newBlockInput.style.backgroundColor = 'white';
    newBlockInput.style.border = 'none';
    newBlockInput.style.fontSize = '14px';
    newBlockInput.style.fontWeight = '500';
    newBlockInput.style.marginTop = '5px';
    newBlockInput.style.marginBottom = '5px';
    newBlockInput.style.borderRadius = '7px';
    newBlockInput.style.marginRight = '0';

    newBlockInput.addEventListener('change', function() {
        this.num_units = newBlockInput.value;
        console.log(this.num_units + blockID);
    })

    var newBlockText2 = document.createElement('p');
    newBlockText2.innerHTML = '<i class="fas fa-times"></i>';
    newBlockText2.style.color = 'white';
    newBlockText2.style.fontSize = '17px';
    newBlockText2.style.fontWeight = '600';
    newBlockText2.style.margin = 0;
    newBlockText2.style.padding = 0;
    newBlockText2.style.paddingTop = '10px';
    newBlockText2.style.marginRight = '10px';

    newBlockText2.addEventListener('click', function() {
        console.log('Deleting ' + blockID);
        parentSpace.removeChild(document.getElementById(blockID));
    })

    newBlock.appendChild(newBlockText);
    newBlock.appendChild(newBlockInput);
    newBlock.appendChild(newBlockText2);
    parentSpace.appendChild(newBlock);
}

// --------------------------------------------------------------------------------------------------------------

function ObjectDetectionBlock() {
    this.name = 'Object-Detector';
    this.received_information = null;
    this.sent_information = null;
    this.selected = false;
}

ObjectDetectionBlock.prototype.addBlock = function(parent, number) {
    // Starting layer for model
    // Sends information to Output layer in Model Object

    console.log('Adding Object Detection block');

    var newBlock = document.createElement('div');
    newBlock.style.width = '300px';
    newBlock.style.height = '182.75px';
    newBlock.style.margin = '40px 20px';
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
        parent.removeChild(document.getElementById(blockID));
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
    this.received_information = null;
    this.sent_information = null;
    this.selected = false;
}

ImageClassifierBlock.prototype.addBlock = function(parent, number) {
    // Starting layer for model
    // Sends information to Output layer in Model Object

    console.log('Adding Object Detection block');

    var newBlock = document.createElement('div');
    newBlock.style.width = '200px';
    newBlock.style.height = '182.75px';
    newBlock.style.margin = '40px 20px';
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
        parent.removeChild(document.getElementById(blockID));
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

ImageClassifierBlock.prototype.addLayer = function(layerBlock, modelNumber, numberLayer) {
    console.log(modelNumber);
    var Space = document.getElementById('block-space-' + modelNumber);
    layerBlock.addToParent(Space, numberLayer);
}

// --------------------------------------------------------------------------------------------------------------

function Conv2D() {
  this.name = '2D Conv';
}

Conv2D.prototype.featureSize = 32
Conv2D.prototype.kernelSize = null;

Conv2D.prototype.addBlock = function (parentSpace, numberLayer) {
    console.log('Adding Conv2D block');

    var newBlock = document.createElement('div');
    var newBlock = document.createElement('div');
    newBlock.style.width = '280px';
    newBlock.style.height = '40px';
    newBlock.style.backgroundColor = '#ff6b6b';
    newBlock.style.margin = '10px auto';
    newBlock.style.marginRight = '10px';
    newBlock.style.marginLeft = '10px';
    newBlock.style.paddingTop = '5px';
    newBlock.style.borderRadius = '7px';
    newBlock.style.border = 'none';
    newBlock.style.cursor = 'pointer';
    newBlock.style.display = 'flex';
    newBlock.style.justifyContent = 'space-between';
    var blockID = this.name + '_' + numberLayer;
    newBlock.id = blockID;

    var newBlockText = document.createElement('p');
    newBlockText.innerText = this.name;
    newBlockText.style.color = 'white';
    newBlockText.style.fontSize = '17px';
    newBlockText.style.fontWeight = '600';
    newBlockText.style.margin = 0;
    newBlockText.style.padding = 0;
    newBlockText.style.paddingTop = '5px';
    newBlockText.style.marginRight = '85px';
    newBlockText.style.marginLeft = '10px';

    var newBlockInput = document.createElement('input');
    newBlockInput.setAttribute('type', 'text');
    newBlockInput.value = this.featureSize;
    newBlockInput.style.textAlign = 'center';
    newBlockInput.style.width = '60px';
    newBlockInput.style.height = '25px';
    newBlockInput.style.backgroundColor = 'white';
    newBlockInput.style.border = 'none';
    newBlockInput.style.fontSize = '14px';
    newBlockInput.style.fontWeight = '500';
    newBlockInput.style.marginTop = '5px';
    newBlockInput.style.marginBottom = '5px';
    newBlockInput.style.borderRadius = '7px';
    newBlockInput.style.marginRight = '0';

    newBlockInput.addEventListener('change', function() {
        this.featureSize = newBlockInput.value;
        console.log(this.featureSize + blockID);
    })

    var newBlockText2 = document.createElement('p');
    newBlockText2.innerHTML = '<i class="fas fa-times"></i>';
    newBlockText2.style.color = 'white';
    newBlockText2.style.fontSize = '17px';
    newBlockText2.style.fontWeight = '600';
    newBlockText2.style.margin = 0;
    newBlockText2.style.padding = 0;
    newBlockText2.style.paddingTop = '10px';
    newBlockText2.style.marginRight = '10px';

    newBlockText2.addEventListener('click', function() {
        console.log('Deleting ' + blockID);
        parentSpace.removeChild(document.getElementById(blockID));
    })

    newBlock.appendChild(newBlockText);
    newBlock.appendChild(newBlockInput);
    newBlock.appendChild(newBlockText2);
    parentSpace.appendChild(newBlock);  
  
};

// --------------------------------------------------------------------------------------------------------------

function Flatten() {
    this.name = 'Flatten';
}

Flatten.prototype.addBlock = function (parentSpace, numberLayer) {
    console.log('Adding Flatten block');

    var newBlock = document.createElement('div');
    var newBlock = document.createElement('div');
    newBlock.style.width = '280px';
    newBlock.style.height = '40px';
    newBlock.style.backgroundColor = '#54a0ff';
    newBlock.style.margin = '10px auto';
    newBlock.style.marginRight = '10px';
    newBlock.style.marginLeft = '10px';
    newBlock.style.paddingTop = '5px';
    newBlock.style.borderRadius = '7px';
    newBlock.style.border = 'none';
    newBlock.style.cursor = 'pointer';
    newBlock.style.display = 'flex';
    newBlock.style.justifyContent = 'space-between';
    var blockID = this.name + '_' + numberLayer;
    newBlock.id = blockID;

    var newBlockText = document.createElement('p');
    newBlockText.innerText = this.name;
    newBlockText.style.color = 'white';
    newBlockText.style.fontSize = '17px';
    newBlockText.style.fontWeight = '600';
    newBlockText.style.margin = 0;
    newBlockText.style.padding = 0;
    newBlockText.style.paddingTop = '5px';
    newBlockText.style.marginLeft = '10px';

    var newBlockText2 = document.createElement('p');
    newBlockText2.innerHTML = '<i class="fas fa-times"></i>';
    newBlockText2.style.color = 'white';
    newBlockText2.style.fontSize = '17px';
    newBlockText2.style.fontWeight = '600';
    newBlockText2.style.margin = 0;
    newBlockText2.style.padding = 0;
    newBlockText2.style.paddingTop = '10px';
    newBlockText2.style.marginRight = '10px';

    newBlockText2.addEventListener('click', function() {
        console.log('Deleting ' + blockID);
        parentSpace.removeChild(document.getElementById(blockID));
    })

    newBlock.appendChild(newBlockText);
    newBlock.appendChild(newBlockText2);
    parentSpace.appendChild(newBlock);  

};