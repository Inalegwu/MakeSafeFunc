## MakeSafeFunc
Finally be sure your functions don't throw


<i>
MakeSafeFunc was created to wrap functions I'm not sure
can throw and returning a simple Result type by utilizing
neverthrow under the hood
</i>



## Examples

### Synchronous Functions
```ts
import {makeSafeFunc} from "make-safe-func";

function unsafeDivide(a:number,b:number){
  if(b===0) throw new Error("Divide by Zero Error");
  return a/b
}

const safeDivide=makeSafeFunc(unsafeDivide);

safeDivide(1/2).match(console.log,console.error);
```

### Asynchronous Functions
```ts
import {makeSafeFunc} from "make-safe-func";

function unsafeFetch(url:string){
  const result=await fetch(url);

  return result
}

const safeFetch=makeSafeFunc(unsafeFetch);

safeFetch("https://google.com").match(console.log,console.error);
```


### Matching on Result
```ts
import {makeSafeFunc} from "make-safe-func";

function unsafeFetch(url:string){
  const result=await fetch(url);

  return result
}

const safeFetch=makeSafeFunc(unsafeFetch);

safeFetch("https://google.com").match(console.log,console.error);
```

### Unwrapping Result with .unwrapOr
```ts
import {makeSafeFunc} from "make-safe-func";

function unsafeFetch(url:string){
  const result=await fetch(url);

  return result
}

const safeFetch=makeSafeFunc(unsafeFetch);

// used to return default values in the event
// of a failure
safeFetch("https://google.com").unwrapOr("failed");
```

### Mapping over result
```ts
import {makeSafeFunc} from "make-safe-func";

function unsafeDivide(a:number,b:number){
  if(b===0) throw new Error("Divide by Zero Error");
  return a/b
}

const safeDivide=makeSafeFunc(unsafeDivide);

const increment=(v:number)=>v+1;

// perform a transformation on the
// result and receive a Result of the Transformation
const res=safeDivide(1/2).map(increment)
```


### .andThen
```ts
import {makeSafeFunc} from "make-safe-func";

function unsafeDivide(a:number,b:number){
  if(b===0) throw new Error("Divide by Zero Error");
  return a/b
}

const safeDivide=makeSafeFunc(unsafeDivide);

const increment=(v:number)=>v+1;

// perform a transformation on the
// result that might fail. You must return a new Result
// Value
const res=safeDivide(1/2).andThen()
```