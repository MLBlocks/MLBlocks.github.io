# MLBlocks.github.io
Neural Network construction playground and toolkit for Web. <br>
Project by Rishabh Anand, Jivesh Mohan, Sai Rahul and Yash Chellani. <br>
Final submission for the NUS Hack&Roll, January 27-28, 2018. <br>

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

1. Click a Layer Block to place it in the sandbox space.
2. Tweak layer parameters by clicking a block in the sandbox.
3. Pay attention to the issues that pop up in the Control Panel.
4. Select Loss function and optimizer before exporting model.
5. Export completed models in Python by clicking the Export button.
6. With the Load button on top, load pre-built architectures into memory.

___

## Screenshots
**Launchscreen**
<img width="1280" alt="screen shot 2018-01-28 at 12 15 22 pm" src="https://user-images.githubusercontent.com/34085740/35478929-29a5ddc2-0425-11e8-86de-075e1c3f6999.png">
<br>
**Realtime issue tracking**
<img width="1280" alt="screen shot 2018-01-28 at 12 16 43 pm" src="https://user-images.githubusercontent.com/34085740/35478931-2a067c2c-0425-11e8-8b16-1bff4ae3026a.png">
<br>
**Exportable models in Python3 (Keras)**
<img width="1280" alt="screen shot 2018-01-28 at 12 16 09 pm" src="https://user-images.githubusercontent.com/34085740/35478930-29d38998-0425-11e8-9fa4-65dac2027b2d.png">
___
