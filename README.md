## MakeSafeFunc
Finally be sure your functions don't throw


<i>
MakeSafeFunc was created to wrap functions I'm not sure
can throw and returning a simple Result type by utilizing
neverthrow under the hood
</i>



### Examples

```ts
import {makeSafeFunc} from "make-safe-func";

function unsafeDivide(a:number,b:number){
  if(b===0) throw new Error("Divide by Zero Error");
  return a/b
}

const safeDivide=makeSafeFunc(unsafeDivide);

safeDivide(1/2).match(console.log,console.error);
const result=safeDivide._unsafeUnwrap();

console.log(result);
```
