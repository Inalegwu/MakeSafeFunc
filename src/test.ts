import { makeSafeFunction } from "./index.ts";

const unsafeDivide = (a: number, b: number) => {
	if (b === 0) throw new Error("Zero Division Error");
	return a / b;
};

const safeDivide = makeSafeFunction(unsafeDivide);

safeDivide(1, 2).match(console.log, console.error);
safeDivide(1, 0).match(console.log, console.error);
