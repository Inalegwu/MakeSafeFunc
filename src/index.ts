import { err, ok, type Result, ResultAsync } from "npm:neverthrow@8.0.0";

/**
 * Type signature for the function being passed
 * into makeSafeFunction
 */
export type AnyFunction = (...args: never[]) => unknown;

/**
 *
 * Create a new function that returns a Result type
 * Result<A,E>, where A is your return value and E is
 * the possible Error
 * 
 * In case of async functions, A ResultAsync<A,E> is returned
 * when an `await` keyword isn't used otherwise a Result<A,E>
 * of the resolved promise is returned
 * 
 * @param func The function being wrapped
 * @returns A new function that returns a Result Type (Result<A,E>)
 */
export function makeSafeFunction<F extends AnyFunction>(
	func: F,
): (
	...args: Parameters<F>
) => ReturnType<F> extends Promise<unknown>
	? ResultAsync<Awaited<ReturnType<F>>, Error>
	: Result<ReturnType<F>, Error> {
	return ((...args: Parameters<F>) => {
		try {
			const result = func(...args);
			if (result instanceof Promise) {
				return ResultAsync.fromPromise(
					result,
					(error) => error instanceof Error ? error : new Error(String(error)),
				);
			}
			return ok(result);
		} catch (error) {
			return err(error instanceof Error ? error : new Error(String(error)));
		}
	}) as any;
}
