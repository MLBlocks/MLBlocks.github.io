function Exporter() {
    this.defaultLang = 'Python';
    this.availableLangs = ['Python', 'JavaScript']
}

Exporter.prototype.getJSLayers = function(model) {
    var blockIDSequence = model.serveIDArray();
    var blockObjectSequence = model.serveObjectArray();

    var JScodeArray = [];

    for (layer = 0; layer < blockIDSequence.length; layer++) {
        var currentBlock = blockIDSequence[layer];
        var currentBlockObject = blockObjectSequence[layer];
        if (currentBlock.includes('fc')) {
            var numUnits = currentBlockObject.getUnits();
            // var codeLine = 'model.add(tf.layers.dense({units:' + numUnits + ',activation:"relu"}));'
            if (layer === 0) {
                var codeLine = 'model.add(tf.layers.dense({units:' + numUnits + ',activation:"relu",inputShape:[784]}));'
            } else {
                var codeLine = 'model.add(tf.layers.dense({units:' + numUnits + ',activation:"relu"}));'
            }
            JScodeArray.push(codeLine);
        }
        else if (currentBlock.includes('conv2d')) {
            var numFeatures = currentBlockObject.getFeatureSize();
            var numKernels = currentBlockObject.getKernelSize();
            // var codeLine = 'model.add(tf.layers.conv2d({' + numFeatures + ',' + numKernels + ',activation:"relu"}));'
            if (layer === 0) {
                var codeLine = 'model.add(tf.layers.conv2d({' + numFeatures + ' ,' + numKernels + ',activation:"relu",inputShape:[28,28,1]}));'
            } else {
                var codeLine = 'model.add(tf.layers.conv2d({' + numFeatures + ' ,' + numKernels + ',activation:"relu"}));'
            }
            JScodeArray.push(codeLine);
        }
        else if (currentBlock.includes('flatten')) {
            var codeLine = 'model.add(tf.layers.flatten());\n'
            JScodeArray.push(codeLine);
        }
        else if (currentBlock.includes('maxpool2d')) {
            var poolSize = currentBlockObject.getPoolSize();
            var codeLine = 'model.add(tf.layers.maxpool2d({' + poolSize + '}));\n'
            JScodeArray.push(codeLine);
        }
    }

    return JScodeArray;
}

Exporter.prototype.runJS = function(JScodeArray, train, x=null, y=null, xtest=null) {
    var virtualJSdoc = document.createElement('script');
    virtualJSdoc.text += 'const model = tf.sequential();\n'
    // virtualJSdoc.text += 'model.add(tf.layers.input({shape:[1]}));\n'

    for (line = 0; line < JScodeArray.length; line++) {
        var currentLine = JScodeArray[line];
        virtualJSdoc.text += currentLine + '\n'; 
    }

    virtualJSdoc.text += 'model.compile({loss: "meanSquaredError", optimizer: "sgd"});\n';

    if (train == true) {
        // Train model
        virtualJSdoc.text += 'model.fit(' + x + ', ' + y + ', {epochs:10});\n';
        
    } else if (train == false) {
        // Test model
        virtualJSdoc.text += 'model.predict(xtest).print();\n'
        
    }

    console.log('Running virtual JS...');
    console.log(virtualJSdoc.text);
    document.body.appendChild(virtualJSdoc);
}