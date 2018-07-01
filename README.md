# MLBlocks.github.io
Neural Network construction playground and toolkit for Web. <br>
Project by Rishabh Anand

Visit the [MLBlocks]("https://mlblocks.github.io/") website to use the app.

#### Contents
1. Input
2. Dense
3. Conv2D
4. MaxPool2D
5. Flatten
6. Activation
7. Reshape
8. Dropout
9. LSTM
10. BatchNorm
11. General usage
12. Screenshots

___

## Layers
#### [Input](https://keras.io/layers/core/#input)
The Input block always comes first in the architecture.
Can precede: Dense, Conv2D, LSTM

*Note: Input block cannot succeed any other block*

#### [Dense](https://keras.io/layers/core/#dense)
The **Dense** block performs a linear calculation on the input data.
Can precede: Activation, Flatten, BatchNorm, Reshape, Dropout <br>
Can succeed: Input, Activation, Flatten, BatchNorm, Reshape, Dropout

#### [Conv2D](https://keras.io/layers/convolutional/#conv2d)
The **Conv2D** block is a 2D Convolutional Kernel with 32 filters and a (3,3) kernel. <br>
Can precede: Activation <br>
Can succeed: Input, MaxPool2D, Activation, Dropout

#### [MaxPool2D](https://keras.io/layers/pooling/#maxpooling2d)
The **MaxPool2D** block is a 2D Max Pooling layer with a pool size of (2,2). <br>
Can precede: Conv2D <br>
Can succeed: Activation

#### [Flatten](https://keras.io/layers/core/#flatten)
The **Flatten** block takes a 'n-dimensional' array and squashes it into a (m,1) vector. <br>
Can precede: Dense <br>
Can succeed: MaxPool2D, Activation

#### [Activation](https://keras.io/layers/core/#activation)
The **Activation** block comes with a Rectified Linear Unit (ReLu) activation function. <br>
Can precede: Dense, MaxPool2D <br>
Can succeed: Dense, Conv2D

#### [Reshape](https://keras.io/layers/core/#reshape)
The **Reshape** block changes the dimensions of the input space into a target shape. <br>
Can precede: Conv2D, Activation, MaxPool2D <br>
Can succeed: Conv2D, Activation, MaxPool2D

#### [Dropout](https://keras.io/layers/noise/#gaussiandropout)
The **Dropout** block deactivates a fraction of the neurones in a layer to ensure better generalisation to the data distribution. <br>
Can precede: Activation <br>
Can succeed: Dense, MaxPool2D

#### [LSTM](https://keras.io/layers/recurrent/#lstm)
The **LSTM** block is a Long Short Term Memory Cell that works with the different gates and hidden states to process sequential data. <br>

#### [BatchNorm](https://keras.io/layers/normalization/)
The **BatchNorm** block applies Batch Normalisation on the data to normalise the activations of the previous layer at each batch. <br>

___

## General usage
Visit the [MLBlocks]("https://mlblocks.github.io/") website.

1. Click on the chatbot button (bottom right) if new to Machine Learning.
2. Follow instructions given by the chatbot.
3. Place blocks in sequence to build Neural Network architectures.
4. Train and test models by clicking the play button after loading the dataset.
5. Deploy models on the cloud and serve them as APIs with the advanced packages.
___