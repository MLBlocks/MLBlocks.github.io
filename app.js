document.addEventListener('DOMContentLoaded', function() {
    console.log("App loaded")

    const program_title = document.getElementById('program-title'); // Model name
    const logo_image = document.getElementById('logo-image');
    const train_test_toggle = document.querySelector('input[type="checkbox"]');
    const train_label = document.getElementById('train-label');
    const test_label = document.getElementById('test-label');

    const palette = document.getElementById('palette');
    const playground = document.getElementById('playground');
    const chatbot = document.getElementById('chatbot');
    const chatbot_messages_area = document.getElementById('chatbot-messages');
    const chatbot_send_button = document.getElementById('chatbot-send');
    const chatbot_inputbox = document.getElementById('chatbot-input');
    const chatbot_toggle = document.getElementById('close-chatbot');

    const play_button = document.getElementById('play');
    const chatbot_button = document.getElementById('chatbot-toggle');
    const trash_button = document.getElementById('trash');
    const export_button = document.getElementById('export');

    // Additional variables
    var all_models = []; // All models present
    var chatbot_open = 1;
    var train_model = true;
    var chatbot_message_index = 0;
    var chatbot_script = ["Hello, welcome to MLBlocks! How can I help you?", "The Sigmoid activation function is a non-linear activation function that squashes a large value to a probability value between 1 and 0.", "A neuron is a single unit that takes a group of weighted inputs, applies an activation function and returns an output.\nIn deep networks, it often takes in the outputs from the previous layer as inputs.\nA layer is formed by stacking neurons.", "Do you want to build a model from scratch or import a pre-built model?", "Great! Begin by adding an Input layer onto the playground by clicking the Input block under General in the palette.", "Click the Image Classification block under Models in the palette. This should load the Image Classifier model in!", "Click the Output block in the palette.", "Congrats! You've built a neural network! Since the model is pre-built, it has already been trained for you.\nTo test it, switch to Test mode above in the header and click the Input block to upload a training image.\nAfer that, click the play button to get a prediction."];
    var prebuilt_model_used = false;
    var prebuiltClassifierUsed = null;

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

    const image_classification_block = document.getElementById('image-classification');
    const sentiment_analysis_block = document.getElementById('sentiment-analysis');
    const object_detection_block = document.getElementById('object-detection');

    getReply();

    // --------------------------------------------------------------------------------------------------------------
    
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.keyCode == 67) {
            if (chatbot_open == 0) {
                chatbot.style.visibility = 'visible';
                chatbot_messages_area.scrollTop = chatbot_messages_area.scrollHeight - chatbot_messages_area.clientHeight;
                chatbot_open = 1;
            } else if (chatbot_open == 1) {
                chatbot.style.visibility = 'hidden';
                chatbot_open = 0;
            }
        } else if (e.ctrlKey && e.keyCode == 8) {
            var task = window.confirm('Are you sure you want to clear the playground? All data will be lost.')
            if (task) {
                location.reload();
            } else {}            
        }
    })

    train_test_toggle.addEventListener('change', function() {
        if (train_test_toggle.checked) {
            // Test
            console.log('Testing model');
            test_label.style.fontWeight = '600';
            train_label.style.fontWeight = '300';
            train_model = false;
        } else {
            // Train
            console.log('Training model');
            train_label.style.fontWeight = '600';
            test_label.style.fontWeight = '300';
            train_model = true;
        }        
    })

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
            location.reload();
        } else {}
    })

    export_button.addEventListener('click', function() {

    })

    chatbot_button.addEventListener('click', function() {
        // Show chatbot window
        if (chatbot_open == 0) {
            chatbot.style.visibility = 'visible';
            chatbot_messages_area.scrollTop = chatbot_messages_area.scrollHeight - chatbot_messages_area.clientHeight;
            chatbot_open = 1;
        } else if (chatbot_open == 1) {
            chatbot.style.visibility = 'hidden';
            chatbot_open = 0;
        }
    })

    chatbot_toggle.addEventListener('click', function() {
        chatbot.style.visibility = 'hidden';
        chatbot_open = 0;
    })

    function getReply(message=null) {  
        if (message) {
            console.log(message);
            var newMessageBox = document.createElement('div');
            newMessageBox.id = 'chatbot-message-from';
            var newMessageBoxContent = document.createElement('p');
            newMessageBoxContent.innerText = message;
            newMessageBoxContent.id = 'chatbot-message-content';
            newMessageBox.appendChild(newMessageBoxContent);
            chatbot_messages_area.appendChild(newMessageBox);
            chatbot_messages_area.scrollTop = chatbot_messages_area.scrollHeight - chatbot_messages_area.clientHeight;
            chatbot_inputbox.value = '';      
            // chatbot_message_index += 1; 
        } else {
            var currentMessage = chatbot_script[chatbot_message_index];
            console.log(currentMessage);
            var newMessageBox = document.createElement('div');
            newMessageBox.id = 'chatbot-message-from';
            var newMessageBoxContent = document.createElement('p');
            newMessageBoxContent.innerText = currentMessage;
            newMessageBoxContent.id = 'chatbot-message-content';
            newMessageBox.appendChild(newMessageBoxContent);
            chatbot_messages_area.appendChild(newMessageBox);
            chatbot_messages_area.scrollTop = chatbot_messages_area.scrollHeight - chatbot_messages_area.clientHeight;
            chatbot_inputbox.value = '';      
            chatbot_message_index += 1;             
        }
    }

    function sendMessage() {
        var currentMessage = chatbot_inputbox.value;
        console.log(currentMessage);
        var newMessageBox = document.createElement('div');
        newMessageBox.id = 'chatbot-message-to';
        var newMessageBoxContent = document.createElement('p');
        newMessageBoxContent.innerText = currentMessage;
        newMessageBoxContent.id = 'chatbot-message-content';
        newMessageBox.appendChild(newMessageBoxContent);
        chatbot_messages_area.appendChild(newMessageBox);
        chatbot_messages_area.scrollTop = chatbot_messages_area.scrollHeight - chatbot_messages_area.clientHeight;
        chatbot_inputbox.value = '';
        setTimeout(getReply, 2000);
    }

    chatbot_inputbox.addEventListener('keydown', function(event) {
        if (chatbot_inputbox.value.length != 0) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }
    })

    chatbot_send_button.addEventListener('click', function() {
        if (chatbot_inputbox.value.length != 0) {
            // Send message
            // var currentMessage = chatbot_inputbox.value;
            sendMessage();
        } 
    })

    // --------------------------------------------------------------------------------------------------------------
 
    var input_block_input_file = document.getElementById('input-block-center-files');
    var input_block_center = document.getElementById('input-block-center');
    var input_block_erase = document.getElementById('input-block-top-button');

    async function previewFile() {
        var preview = document.getElementById('input-image');
        var file = document.getElementById('input-block-center-files').files[0];
        var reader  = new FileReader();
      
        reader.addEventListener("load", function () {
            preview.src = reader.result;
            var newImage = new Image();
            preview.onloadend = async function() {
                newImage.src = await preview.src;
                await console.log('IMAGE DIMS')
                var imageWidth = await newImage.width;
                var imageHeight = await newImage.height;
                return imageWidth, imageHeight;
            }
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
	}
	
	input_block_erase.addEventListener('click', function() {
		input_block.style.display = 'none';
	}) 

    var palette_input_block = document.getElementById('Input');
    palette_input_block.addEventListener('click', async function() {
        var model = new Model();
		model.addModel(playground, num_models);

        input_block.style.display = 'block';
        
        input_block_center.addEventListener('click', function() {
            input_block_input_file.click()
            input_block_input_file.addEventListener('change', async function() {
               var imageWidth, imageHeight = await previewFile();
               console.log(imageWidth, imageHeight);
            }, true);
        })

        dense_block.addEventListener('click', function() {
            var dense = new Dense()
            dense.addBlock(model, num_dense, dense);
            num_dense += 1;
        })

        conv2d_block.addEventListener('click', function() {
            var conv2d = new Conv2D()
            conv2d.addBlock(model, num_conv2d, conv2d);
            num_conv2d += 1;
		})
		
		maxpool2d_block.addEventListener('click', function() {
			var maxpool2d = new MaxPool2D()
			maxpool2d.addBlock(model, num_maxpool2d, maxpool2d);
			num_maxpool2d += 1;
		})

        flatten_block.addEventListener('click', function() {
            var flatten = new Flatten()
            flatten.addBlock(model, num_flatten, flatten);
            num_flatten += 1;
        })       
        
        image_classification_block.addEventListener('click', async function() {

            var image_classification = new ImageClassifierBlock();
            model.addPrebuiltModel(image_classification, num_models);

            // Place special Output block
            prebuilt_model_used = true;

            const classifier = await ml5.imageClassifier('MobileNet');
            console.log('Loaded model');
            getReply(message='Image Classifier model has been loaded.');
            prebuiltClassifierUsed = classifier;

            num_models += 1;
        })        

        output_block.addEventListener('click', function() {
            var output = new OutputBlock();
            output.addBlock(model, playground, num_outputs);
            num_outputs += 1;            
            placePrebuiltModelOutput(prebuilt_model_used, output, prebuiltClassifierUsed);
        })
    })

    async function placePrebuiltModelOutput(prebuiltUsed, output, prebuiltClassifierUsed) {

        if (prebuiltUsed) {
            play_button.addEventListener('click', async function() {
                var imageData = document.getElementById('input-image');
                console.log('Image data: ' + imageData);
                
                await prebuiltClassifierUsed.predict(imageData, async function(results) {
                    await output.setPrediction(results[0].className);
                    await console.log(results[0].className);
                    await console.log(results[0].probability.toFixed(4));
                });                    
            })            
        } else {
            // Custom output labels
        }
    }

    graph_block.addEventListener('click', function() {
        // var graph = new OutputBlock();
        // output.addBlock(playground);
    })
});

// --------------------------------------------------------------------------------------------------------------