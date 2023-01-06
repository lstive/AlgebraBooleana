class Bool{
	constructor(...param){
		this._bits = null;
		this._expression = null;
		// stacks
		this._values = new Stack();
		this._signs = new Stack();
		this._operators = new Stack();
		this._final = new Stack();
		this._variables = new String();
		
		if(param.length == 2){
			this._expression = Array.from(param[0]);
			this._bits = param[1];
			this._changeValues();
			this._makeNotation();
			// evaluar si se proporciona la expresion con los bits
		}else if(param.length == 1){
			this._expression = Array.from(param[0]);
		}
	}

	_makeNotation(){
		let op = null;
		for(let i = 0; i < this._expression.length; i++){
			if(this._expression[i] == '('){
				this._operators.push(this._expression[i]);
			}else if(this._expression[i] == '+' || this._expression[i] == '.' || this._expression[i] == '!'){
				this._operators.push(this._expression[i]);
			}else if(this._expression[i] == ')'){
				while((op = this._operators.pop()) != '('){
					this._values.push(op);
				}
			}else{
				this._values.push(this._expression[i]);

				if(this._operators.getTop() == '!'){
					console.log('entro');
					if(this._values.getTop() == '1'){
						this._values.pop();
						this._values.push('0');
					}else{
						this._values.pop();
						this._values.push('0');
					}

					this._operators.pop();
				}
			}
		}
	}

	_changeValues(){
		let setValues = new Set(this._expression);
		setValues = Array.from(setValues);
		
		for(let i = 0; i < setValues.length; i++){
			if(setValues[i] != '(' & setValues[i] != ')' & setValues[i] != '+' & setValues[i] != '.' & setValues[i] !='!'){
				this._variables = this._variables + setValues[i];
			}
		}

		for(let i = 0; i < this._expression.length; i++){
			for(let j = 0; j < this._variables.length; j++){
				if(this._expression[i] == this._variables[j]){
					this._expression[i] = this._bits[j];
				}
			}
		}
	}

	_eval(){
		let temp = null;
		let calc = new Stack();
		// evaluacion de las expresiones de algebra booleana

		while(this._values.counter != 0){
			temp = this._values.pop();

			// evaluacion de operadores
			if(temp == '+' || temp == '.' || temp == '!'){
				this._operators.push(temp);
			}else{
				calc.push(temp);

				if(calc.counter == 1){
					if(this._operators.getTop() == '!'){
						this._values.push((calc.pop() == '1')? '0':'1');
						this._operators.pop();
					}
				}else if(calc.counter > 1){
					if(this._operators.getTop() == '+'){
						temp = (calc.pop() | calc.pop())? '1':'0';
					}else if(this._operators.getTop() == '.'){
						temp = (calc.pop() & calc.pop())? '1':'0';
					}

					this._operators.pop();
					this._values.push(temp);
				}
			}
		}

		return temp;
	}
}

let bol = new Bool('(d+!((a+b).c).e)', '10011');
console.log(bol._eval());

let vector = 'ugadr';
vector = Array.from(vector);
vector.sort();
console.log(vector);
