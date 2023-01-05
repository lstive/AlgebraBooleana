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
	}

	push(value){
		let temp = new StackNode(value);
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
			temp = this.top;
			this.top = this.top.nextPtr;
			return temp.value;
		}else{
			return null;
		}
	}
}
