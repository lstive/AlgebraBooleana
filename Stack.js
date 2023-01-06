// nodos del stack
class StackNode{
	constructor(value){
		this.value = value;
		this.nextPtr = null;
	}
}

// stack o pila
class Stack{
	constructor(){
		this.top = null;
		this.counter = 0;
	}

	push(value){
		let temp = new StackNode(value);
		this.counter = this.counter + 1;
		if(this.top == null){
			this.top = temp;
		}else{
			temp.nextPtr = this.top;
			this.top = temp;
		}
	}

	pop(){
		let temp = null;
		if(this.top != null){
			this.counter = this.counter - 1;
			temp = this.top;
			this.top = this.top.nextPtr;
			return temp.value;
		}else{
			return null;
		}
	}

	getTop(){
		return (this.top != null)? this.top.value:null;
	}
}
