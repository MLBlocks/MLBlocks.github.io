document.addEventListener('DOMContentLoaded', function() {
    console.log("App loaded")

    const program_title = document.getElementById('program-title'); // Model name
    const logo_image = document.getElementById('logo-image');

    const palette = document.getElementById('palette');
    const playground = document.getElementById('playground');

    const play_button = document.getElementById('play');
    const help_button = document.getElementById('help');
    const trash_button = document.getElementById('trash');
    const export_button = document.getElementById('export');

    // Additional variables
    var all_models = []; // All models present
    var playing = 0;

    // All blocks in palette
    const input_block = document.getElementById('input-block');
    const output_block = document.getElementById('Output');
    const graph_block = document.getElementById('Graph');

    let input_block_pixels = [];
    var input_given = false;

    const dense_block = document.getElementById('Dense');
    const conv2d_block = document.getElementById('Conv2D');
    const maxpool2d_block = document.getElementById('MaxPool2D');
    const flatten_block = document.getElementById('Flatten');
    const dropout_block = document.getElementById('Dropout');
    const lstm_block = document.getElementById('LSTM');
    const rnn_block = document.getElementById('RNN');

    var num_models = 0;
    var num_synapses = 0;
    var num_inputs = 0;
    var num_outputs = 0;
    var num_dense = 0;
    var num_conv2d = 0;
    var num_maxpool2d = 0;
    var num_dropout = 0;
    var num_batch_norm = 0;
    var num_flatten = 0;
    var num_lstm = 0;
    var num_activation = 0;

    // const image_classification_block = document.getElementById('image-classification');
    // const sentiment_analysis_block = document.getElementById('sentiment-analysis');
    // const object_detection_block = document.getElementById('object-detection');

    // --------------------------------------------------------------------------------------------------------------

    // Model name UI configuration
    program_title.addEventListener('change', function() {
        if (program_title.value.length == 0) {
            program_title.style.border = '2px solid #feca57';
        } else {
            program_title.style.border = '2px solid #1dd1a1';
        }
    })

    trash_button.addEventListener('click', function() {
        var task = window.confirm('Are you sure you want to clear the playground? All data will be lost.')
        if (task) {
            console.log('Clearing playground...');
            location.reload();
        } else {}
    })

    export_button.addEventListener('click', function() {
        console.log('Exporting code');

    })

    // --------------------------------------------------------------------------------------------------------------
 
    var input_block_input_file = document.getElementById('input-block-center-files');
    var input_block_center = document.getElementById('input-block-center');
    var input_block_erase = document.getElementById('input-block-top-button');

    var MOBILE_NET_PATH = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';

    function previewFile() {
        var preview = document.getElementById('input-image');
        var file = document.getElementById('input-block-center-files').files[0];
        var reader  = new FileReader();
      
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);
        if (file) {
            reader.readAsDataURL(file);
            console.log(file);
        }
    }
    
    var palette_input_block = document.getElementById('Input');
    palette_input_block.addEventListener('click', function() {
        var model = new Model();
        model.addModel(playground, num_models);

        var block = document.getElementById('input-block');
        block.style.display = 'block';

        dense_block.addEventListener('click', function() {
            var dense = new Dense()
            model.addLayer(dense, num_dense);
            num_dense += 1;
        })

        conv2d_block.addEventListener('click', function() {
            var conv2d = new Conv2D()
            model.addLayer(conv2d, num_conv2d);
            num_conv2d += 1;
        })

        flatten_block.addEventListener('click', function() {
            var flatten = new Flatten()
            model.addLayer(flatten, num_flatten);
            num_flatten += 1;
        })

        output_block.addEventListener('click', function() {
            var output = new OutputBlock();
            output.addBlock(playground, num_outputs);
            num_outputs += 1;
            
            play_button.addEventListener('click', async function() {
                var imageData = document.getElementById('input-image');
                console.log('Image data: ' + imageData);
                
                const classifier = await ml5.imageClassifier('MobileNet');
                await console.log('Loaded model');
                
                await classifier.predict(imageData, async function(results) {
                await output.setPrediction(results[0].className);
                await console.log(results[0].className);
                await console.log(results[0].probability.toFixed(4));
                });
            })
        })
    })

    input_block_center.addEventListener('click', function() {
        input_block_input_file.click()
        input_block_input_file.addEventListener('change', previewFile, true);
    })

    graph_block.addEventListener('click', function() {
        console.log('Showing graph');
        // var graph = new OutputBlock();
        // output.addBlock(playground);
    })
});

// --------------------------------------------------------------------------------------------------------------