# Algebra Booleana JS
## Info
Es una serie de clases para la evaluación de expresiones de algebra
booleana, la clase `Bool`. Los valores evaluados pueden ser generados a traves de 
los bits que son creados con la tabla de la verdad combinacional de la clase `BoolTable`.

Js ofrece el array con la utilidad de Stack o pila, pero igualmente lo 
programe para practicar las estructuras de datos dinamicas.

## Funcionalidades
- [x] Evaluación de expresiones booleanas
- [x] Soporte de operador unario de negación `!`
- [ ] Simplificación de expresiones de algebra booleana

## Cómo funciona
La interpretación de las expresiones como A+B, A OR B se basa en la Notación Polaca
con el uso de una serie de pilas para convertir la expresion A+B en la Notación Polaca
infija A+B = AB+.

Para la precedencia del operador AND "." se toma A+B.A como la siguiente expresión
en la notación: AB+A.

## Uso
Las clases se usan de la siguiente forma.

Se crea un evaluador y una tabla combinacional.
```javascript
let expresion = new Bool();
let tabla = new BoolTable(2);
let tablaValores;

expresion.reedefine('(a+b)');
tablaValores = tabla._createTable();
```
Luego imprime la tabla y el resultado de la expresion.
```javascript
for(let i = 0; i < Math.pow(2, tabla.order); i++){
	console.log(tablaValores[i] + ' = ' + expresion.reeval(tablaValores[i]));
}
```
