## MakeSafeFunc
Finally be sure your functions don't throw


<i>
MakeSafeFunc was created to wrap functions I'm not sure
can throw and returning a simple Result type by utilizing
neverthrow under the hood
</i>


## Why MakeSafeFunc ?

MakeSafeFunc is designed to bring make the Result Types and functional 
Principles that [neverthrow](https://github.com/supermacro/neverthrow)
is working to make available to Typescript Developers, To legacy projects.

MakeSafeFunc is targetted at developers working in legacy where it wouldn't be worth it to attempt a full conversion to Result types instead of focusing on business logic. Instead developers can work on the code they should be working on while protecting themselves from the errors of:

- Third-Party Code
- Internal Code

By definition makeSafeFunc is a simple function that you can probably implement in your code yourself or even simply copy right from this package
into your existing source tree

```ts
import {functionFromLegacy} from "@acme/legacy";
import {makeSafeFunc} from "@disgruntleddevs/make-safe-func";

const result=makeSafeFunc(functionFromLegacy)(params,from,legacyCode)

// all the niceties... none of the refactoring work
result.match();
result.unwrapOr();
result.isOk();
result.value;
result.error;
result.map()

```


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

async function unsafeFetch(url:string){
  const result=await fetch(url);

  return result
}

const safeFetch=makeSafeFunc(unsafeFetch);

safeFetch("https://google.com").match(console.log,console.error);
```


### Matching on Result
```ts
import {makeSafeFunc} from "make-safe-func";

async function unsafeFetch(url:string){
  const result=await fetch(url);

  return result
}

const safeFetch=makeSafeFunc(unsafeFetch);

safeFetch("https://google.com").match(console.log,console.error);
```

### Unwrapping Result with .unwrapOr
```ts
import {makeSafeFunc} from "make-safe-func";

async function unsafeFetch(url:string){
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

### Importing Third-Party Code
```ts
import {makeSafeFunc} from "@disgruntleddevs/make-safe-func";
import {someLibraryFunction} from "@third-party/library";

const safeLibraryFunction=makeSafeFunc(someLibraryFunction);

const result=safeLibraryFunction(params,for,func).unwrapOr("default value")

console.log(result);
```

<i>The MakeSafeFunc docs are sparse because most of it's power is derived from 
[neverthrow](https://github.com/supermacro/neverthrow) so the docs for neverthrow
will be your friend.
These are simply examples of the context makeSafeFunc is useful for
</i>
