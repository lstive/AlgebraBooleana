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
		this.res = '';
		
		if(param.length == 2){
			this._expression = Array.from(param[0]);
			this._bits = param[1];
			this._changeValues();
			this._makeNotation();
			this._eval();
			// evaluar si se proporciona la expresion con los bits
		}else if(param.length == 1){
			this._expression = Array.from(param[0]);
		}
	}

	_makeNotation(){
		let op = null;
		for(let i = 0; i < this._expression.length; i++){
			if(this._expression[i] == '+'){
				if(this._operators.getTop() == '.'){
					this._values.push(this._operators.pop());
					this._operators.push(this._expression[i]);
				}else{
					this._operators.push(this._expression[i]);
				}
			}else if(this._expression[i] == '.'){
				if(this._operators.getTop() == '.'){
					this._values.push(this._operators.pop());
					this._operators.push(this._expression[i]);
				}else{
					this._operators.push(this._expression[i]);
				}
			}else if(this._expression[i] == '('){
				this._operators.push(this._expression[i]);
			}else if(this._expression[i] == ')'){
				while(this._operators.getTop() != '('){
					this._values.push(this._operators.pop());
				}
				this._operators.pop();

				if(this._operators.getTop() == '!'){
					this._values.push(this._operators.pop());
				}
			}else if(this._expression[i] == '!'){
				this._operators.push(this._expression[i]);
			}else{
				if(this._operators.getTop() == '!'){
					this._values.push(this._expression[i]);
					this._values.push(this._operators.pop());
				}else{
					this._values.push(this._expression[i]);
				}
			}
		}
	}

	_changeValues(){
		let setValues = new Set(this._expression);
		setValues = Array.from(setValues);
		setValues.sort();
		
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
		let reverse = new Stack();
		let op = '';

		// evaluacion de las expresiones de algebra booleana
		while(this._values.getTop() != null){
			reverse.push(this._values.pop());
		}

		while(reverse.counter != 0){
			temp = reverse.pop();
			
			if(temp == '+'){
				reverse.push((calc.pop() | calc.pop())? '1':'0');
				temp = reverse.getTop();
			}else if(temp == '.'){
				reverse.push((calc.pop() & calc.pop())? '1':'0');
				temp = reverse.getTop();
			}else{
				calc.push(temp);

				if(reverse.getTop() == '!'){
					calc.push((calc.pop() == '1')? '0':'1');
					reverse.pop();
				}
			}
		}

		this.res = temp;
		return temp;
	}

	redefine(expression){
		this._expression = expression;
	}

	reeval(bits){
		let res = (new Bool(this._expression, bits)).res;
		this.res = res;
		return res;
	}

	full(expression, bits){
		this.redefine(expression);
		this.res = this.reeval(bits);
		return this.res;
	}
}

let bol = new Bool('(d+!((a+b).c).e)', '01111');
bol.redefine('(d+!((a+b).c).e)');
console.log(bol.reeval('01111'));

let bol2 = new Bool();
bol2.full('(a.b)', '10');
bol2.reeval('00');
console.log(bol2.res);

let bits = [
	'00',
	'01',
	'10',
	'11'
];

for(let i = 0; i < bits.length; i++){
	bol2.reeval(bits[i]);
	console.log(bits[i] + ' | ' + bol2.res);
}

let table = new BoolTable(3);
console.log(table._createTable());

