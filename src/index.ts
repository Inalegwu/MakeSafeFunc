import {type Result,ok,err} from "npm:neverthrow@8.0.0";


type AnyFunction=(...args:any[])=>any;

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
export function makeSafeFunction<F extends AnyFunction>(fn:F):(...args:Parameters<F>)=>Result<ReturnType<F> extends Promise<infer R>?R:ReturnType<F>,Error>{
	// @ts-ignore: still yet to figure this out but it works
	return (...args:Parameters<F>)=>{
		try{
			const result=fn(...args);

			if(result instanceof Promise){
				return result.then((value)=>ok(value)).catch((error)=>err(error instanceof Error?error:new Error(String(error))));
			}

			return ok(result);
		}catch(error){
			return err(error instanceof Error?error:new Error(String(error)))
		}
	}
}
