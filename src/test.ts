import { makeSafeFunction } from "./index.ts";

const unsafeDivide = (a: number, b: number) => {
	if (b === 0) throw new Error("Divide by zero error caught");

	return a / b;
};

const unsafeAsyncFunction = async (url: string) => {
	const result = await fetch(url);

	return result;
};

const safeAsyncFunction = makeSafeFunction(unsafeAsyncFunction);
const safeDivide = makeSafeFunction(unsafeDivide);

const result = await safeAsyncFunction("https://google.com").unwrapOr(
	new Response("hello world",{
		status:200,
		statusText:"Success",
		headers:{
			"content-type":"application/json",
		}
	}),
);

const divideResult = safeDivide(1, 2).unwrapOr(0);
const divideByZeroResult = safeDivide(2, 0).unwrapOr(-1);

console.log(result);
console.log(divideResult);

if (divideByZeroResult === -1) {
	console.log(
		"If you see this, divideByZeroResult failed... Attempting to Recover",
	);
} else {
	console.log(divideByZeroResult);
}
