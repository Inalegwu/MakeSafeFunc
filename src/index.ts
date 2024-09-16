// deno-lint-ignore-file no-explicit-any
import { err, ok, type Result, ResultAsync } from "npm:neverthrow@8.0.0";

export type AnyFunction = (...args: any[]) => any;

/**
 * Wraps a function that could possibly throw
 * and returns a new function that uses Result<T,E>
 * to ensure errors are handled
 *
 * @template F the type of the function to wrap
 * @param fn The Function being wrapped
 * @returns A new function that returns a Result Type
 *
 *
 **/
export function makeSafeFunction<F extends AnyFunction>(
	fn: F,
): (
	...args: Parameters<F>
) => ReturnType<F> extends Promise<unknown>
	? ResultAsync<Awaited<ReturnType<F>>, Error>
	: Result<ReturnType<F>, Error> {
	return ((...args: Parameters<F>) => {
		try {
			const result = fn(...args);
			if (result instanceof Promise) {
				return ResultAsync.fromPromise(result, (error) =>
					error instanceof Error ? error : new Error(String(error)),
				);
			}
			return ok(result);
		} catch (error) {
			return err(error instanceof Error ? error : new Error(String(error)));
		}
	}) as any;
}
