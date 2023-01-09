class BoolTable{
	constructor(order){
		this.order = order;
		this.table = [];
	}

	_createTable(){
		for(let i = 0; i < Math.pow(2, this.order); i++){
			this.table[i] = this._toBinary(i);
		}

		return this.table;
	}

	_toBinary(number){
		let stack = new Stack();
		let binary = '';
		let count = 0;

		while(number != 0){
			stack.push(String(number - 2 * Math.floor(number / 2)));
			number = Math.floor(number / 2);
			count++;
		}

		if(count < this.order){
			for(let i = count; i < this.order; i++){
				stack.push('0');
			}
		}

		while(stack.getTop() != null){
			binary += stack.pop();
		}

		return binary;
	}
}
