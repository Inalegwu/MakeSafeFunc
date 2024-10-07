import { makeSafeFunction } from "./index.ts";

class NumberError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
	}
}

const unsafeDivide = (a: number, b: number) => {
	if (b === 0) throw new NumberError("Divide by zero error caught");

	return a / b;
};

const unsafeAsyncFunction = async (url: string) => {
	const result = await fetch(url);

	return result;
};

const safeAsyncFunction = makeSafeFunction(unsafeAsyncFunction);
const safeDivide = makeSafeFunction(unsafeDivide);

const result = await safeAsyncFunction(
	"https://ergast.com/api/f1/2024/constructorStandings.json",
).unwrapOr(
	new Response("hello world", {
		status: 200,
		statusText: "Success",
		headers: {
			"content-type": "application/json",
		},
	}),
);

const divideResult = safeDivide(1, 2).unwrapOr(0);
const divideByZeroResult = safeDivide(2, 0).unwrapOr(-1);

console.log(await result.json());
console.log(divideResult);

if (divideByZeroResult === -1) {
	console.log(
		"If you see this, divideByZeroResult failed... Attempting to Recover",
	);
} else {
	console.log(divideByZeroResult);
}
