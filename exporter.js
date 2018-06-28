function Exporter() {
    this.defaultLang = 'Python';
    this.availableLangs = ['Python', 'JavaScript']
}

Exporter.prototype.getPresentBlocks = function(exportSequence) {
    for (layer = 0; layer < exportSequence.length; layer++) {
        console.log(exportSequence[layer]);
    }
}

Exporter.prototype.getPythonImports = function(exportSequence) {
    var imports = ['import numpy as np\n', 'import keras']
    var importsSet = new Set(exportSequence);

    for (layer = 0; layer < importsSet.length; layer++) {
        console.log(importsSet[layer]);
        var lineImport = 'from keras.layers import ' + importsSet[layer] + '\n';
        imports.push(lineImport);
    }

    return imports 
}

Exporter.prototype.getModelJavaScript = function(exportSequence) {
    // Building model from layer blocks in playground
}