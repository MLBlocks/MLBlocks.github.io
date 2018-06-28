function Model() {
    this.name = 'Model';
    this.blockSequence = [];
    this.modelSpace = document.createElement('div');
    this.modelSpace.style.clear = 'both';
    this.modelSpace.style.width = '300px';
    this.modelSpace.style.borderRadius = '10px';
    this.modelSpace.style.margin = '20px auto';
    this.modelSpace.style.overflow = 'scroll';
}
  
Model.prototype.addModel = function(playground, numModels) {
    // Contains all layers in a model
    var modelID = this.name + numModels;
    this.modelSpace.id = modelID;
    
    playground.appendChild(this.modelSpace);
}
  
Model.prototype.addLayer = function(layer, numberLayer) {
    this.blockSequence.push(layer);
    layer.addBlock(this.modelSpace, numberLayer);
    console.log(this.blockSequence);
}