document.addEventListener("DOMContentLoaded", function() {

	console.log("Loaded");

	var clear = document.getElementById("delete");
	var menu = document.getElementById("menu");
	var menuNav = document.getElementById("menuNav");
	var type = document.getElementById("type");
	var playground = document.getElementById('playground');

	var Help = document.getElementById("help");
	var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];
	var Export = document.getElementById("export");
	var Import = document.getElementById("import");

	var input = document.getElementById("input");
	var dense = document.getElementById("dense");
	var conv2d = document.getElementById("conv2d");
	var mp2d = document.getElementById("mp2d");
	var flatten = document.getElementById("flatten");
	var activation = document.getElementById("activation");
	var reshape = document.getElementById("reshape");
	var dropout = document.getElementById("dropout");
	var recurrent = document.getElementById("recurrent");
	var lstm = document.getElementById("lstm");
	var batchnorm = document.getElementById("batchnorm");

	var compileBTN = document.getElementById('compileBTN');
	var loss = document.getElementById('lossfunc');
	var optimizer = document.getElementById('opt');

	var opened = 0;
	var chain = [];
	var compileParams = [];

	compileBTN.addEventListener('click', function() {
		var lossChoice = loss.value;
		var optChoice = optimizer.value;
		compileParams.push(lossChoice);
		compileParams.push(optChoice);
		console.log(compileParams);
	});

	menu.addEventListener("click", function() {
		if (opened == 0){
			menu.style.transform = "rotate(90deg)";
			menuNav.style.display = "block";
			opened = 1;
		} else {
			opened = 0;
			menu.style.transform = "rotate(0deg)";
			menuNav.style.display = "none";
		}
	});

	Export.addEventListener('click', function() {
		opened = 0;
		menu.style.transform = "rotate(0deg)";
		menuNav.style.display = "none";

		if (chain.length != 0) {
			var msg = confirm("Are you sure you want to export this model?");
			if (msg == true) {
				console.log(chain);
				var lossChoice = loss.value;
				var optChoice = optimizer.value;
				compileParams.push(lossChoice);
				compileParams.push(optChoice);
				console.log(compileParams);
				chain = [];
			} else {
				alert("Canceling model export.");
			};
		} else {
			alert("Model has to be built before being exported.");
		};
	});

	help.addEventListener('click', function() {
		console.log("Help");
		modal.style.display = "block";
		opened = 0;
		menu.style.transform = "rotate(0deg)";
		menuNav.style.display = "none";
	});

	span.onclick = function() {
	    modal.style.display = "none";
			opened = 0;
			menu.style.transform = "rotate(0deg)";
			menuNav.style.display = "none";
	}

	clear.addEventListener('click', function() {
		msg = confirm("Are you sure you want to clear the sandbox?");
		if (msg == true) {
			clearPlayground();
			opened = 0;
			menu.style.transform = "rotate(0deg)";
			menuNav.style.display = "none";
			chain = [];
		} else {
			opened = 0;
			menu.style.transform = "rotate(0deg)";
			menuNav.style.display = "none";
		};
	})

	input.addEventListener('click', function() {
		chain.push("input");
		addBlock("input", chain);
	});

	dense.addEventListener('click', function() {
		chain.push("dense");
		addBlock("dense", chain);
	});

	conv2d.addEventListener('click', function() {
		chain.push("conv2d");
		addBlock("conv2d", chain);
	});

	mp2d.addEventListener('click', function() {
		chain.push("mp2d");
		addBlock("mp2d", chain);
	});

	flatten.addEventListener('click', function() {
		chain.push("flatten");
		addBlock("flatten", chain);
	});

	activation.addEventListener('click', function() {
		chain.push("activation");
		addBlock("activation", chain);
	});

	reshape.addEventListener('click', function() {
		chain.push("reshape");
		addBlock("reshape", chain);
	});

	dropout.addEventListener('click', function() {
		chain.push("dropout");
		addBlock("dropout", chain);
	});

	recurrent.addEventListener('click', function() {
		chain.push("recurrent");
		addBlock("recurrent", chain);
	});

	lstm.addEventListener('click', function() {
		chain.push("lstm");
		addBlock("lstm", chain);
	});

	batchnorm.addEventListener('click', function() {
		chain.push("batchnorm");
		addBlock("batchnorm", chain);
	});

});

function addBlock(type, chain) {
	var playground = document.getElementById('playground');
	var block = document.createElement("DIV");
	var category = document.createElement("P");
	var text = document.createTextNode(type);
	var rhook = document.createElement("DIV");
	var shook = document.createElement("DIV");
	rhook.id = "rhook";
	shook.id = "shook";

	category.appendChild(text);
	category.id = "edit_type";

	// block.appendChild(rhook);
	block.appendChild(category);
	// block.appendChild(shook);

	block.id = type;
	block.className += "editable_block";

	playground.appendChild(block);

	rhook.addEventListener('click', function() {
		console.log('Receiving synapse from previous block');
	});
	shook.addEventListener('click', function() {
		console.log('Sending synapse from', type);
	});
	block.addEventListener('click', function() {
		// removeBlock(playground, type, block, chain)
		block.style.border = "2px solid lightblue";
	});
};

function clearPlayground() {
	var playground = document.getElementById('playground');
	playground.style.minHeight = "400px";
	playground.innerHTML = "";
};

function removeBlock(playground, type, block, chain) {
	console.log('closing block type:', type);
	playground.removeChild(block);
	var i = chain.indexOf(type);
	chain.splice(i,1);
};
