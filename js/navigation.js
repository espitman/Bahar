function navigation() {
	this.current = {};
	this.stack = new Array();
	
	this.push = function(page) {
		this.stack.push(page);
	}
	
	this.log = function() {
		console.log(this.stack);
	}
	
	this.pop = function() {
		this.stack.pop();
		return this.stack.pop();
	}

}