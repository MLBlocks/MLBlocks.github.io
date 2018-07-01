function Model() {
    this.name = 'Model';
    this.blockIDSequence = [];
    this.blockObjectSequence = [];
    this.modelSpace = document.createElement('div');
    this.modelSpace.style.clear = 'both';
    this.modelSpace.style.width = '300px';
    this.modelSpace.style.borderRadius = '10px';
    this.modelSpace.style.display = 'flex';
    this.modelSpace.style.flexDirection = 'column';
    this.modelSpace.style.margin = '20px 20px';
    this.modelSpace.style.overflow = 'scroll';
}

// --------------------------------------------------------------------------------------------------------------
  
// Used by main playground
Model.prototype.addModel = function(playground, numModels) {
    // Contains all layers in a model
    var modelID = this.name + numModels;
    this.modelSpace.id = modelID;
    
    playground.appendChild(this.modelSpace);
}

Model.prototype.addPrebuiltModel = function(prebuiltModel, numModels) {
    var modelID = this.name + numModels;
    this.modelSpace.id = modelID;

    prebuiltModel.addBlock(this.modelSpace, numModels);
}

// --------------------------------------------------------------------------------------------------------------

// Used by block itself
Model.prototype.addLayer = function(newLayer, newLayerNode) {
    // Adding to playground
    this.modelSpace.appendChild(newLayerNode);

    // Adding to internal state
    this.blockIDSequence.push(newLayerNode.id);
    this.blockObjectSequence.push(newLayer);
    console.log(this.blockIDSequence);
    console.log(this.blockObjectSequence);
}

Model.prototype.removeLayer = function(layer) {
    var index = this.blockIDSequence.indexOf(layer.id);
    this.blockIDSequence.splice(index, 1);
    this.blockObjectSequence.splice(index, 1);
    this.modelSpace.removeChild(document.getElementById(layer.id));
    console.log(this.blockIDSequence);
    console.log(this.blockObjectSequence);
}

// --------------------------------------------------------------------------------------------------------------

// Used by exporter
Model.prototype.serveIDArray = function() {
    return this.blockIDSequence;
}

Model.prototype.serveObjectArray = function() {
    return this.blockObjectSequence;
}