(function () {
	'use strict';
	

		var element = document.getElementById("container"),
			div = document.createElement("div"),
			textarea;

	document.onkeypress = function(event){
		if (event.key === "Escape") {
			console.log('keyCode');
			esc ()
		}
		if (event.keyCode == 69 && event.shiftKey) {
			edit()
			return false;

		} 
		if (event.keyCode == 83 && event.shiftKey) {
			save()
		}

	};
		document.onkeydown = function(event) {
   			 if (event.keyCode == 27) {
       			esc ();
   		 }
		};
		
		function edit() {
			div.remove(element);
			textarea = document.createElement("textarea");
			element.append(textarea);
		}

		function esc () {
			textarea.remove(element);

		}

		function save() {
			var div = document.createElement("div"),
			text = document.querySelector("textarea").value;
			textarea.remove(element);
			element.append(div);
			div.innerText = text;
		}


})();