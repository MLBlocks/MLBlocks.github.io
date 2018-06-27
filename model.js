function Model() {
    this.name = 'Model';
    this.blockSequence = [];
    this.modelSpace = document.createElement('div');
    // this.modelSpace.style.backgroundColor = '#f1f2f6';
    this.modelSpace.style.clear = 'both';
    // this.modelSpace.style.height = '75px';
    this.modelSpace.style.minHeight = '75px';
    this.modelSpace.style.borderRadius = '10px';
    this.modelSpace.style.margin = '20px auto';
    // this.modelSpace.style.display = 'flex';
    // this.modelSpace.style.flexDirection = 'column';
    this.modelSpace.style.overflow = 'scroll';
  }
  
  Model.prototype.addModel = function(playground, numModels) {
    // Holds all layers in a model
    var modelID = this.name + numModels;
    this.modelSpace.id = modelID;
    
    playground.appendChild(this.modelSpace);
  }
  
  Model.prototype.addLayer = function(layer, numberLayer) {
    this.blockSequence.push(layer);
    layer.addBlock(this.modelSpace, numberLayer);
    console.log(this.blockSequence);
  }