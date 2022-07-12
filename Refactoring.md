# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The first in refactoring this code is adding an empty input check at the beggining of the function body, this makes the function's empty/null/no input behavior/output clearer and removes 1 level of conditional statement nesting from the pyramid of doom that existed before. The second step was extracting the hashing logic into a separate `hash` function making it DRY, and making its purpouse easy to understand. I also wrote a `amendPartitionKey` partition key that sanities the input before hashing to accomodate cases where the `partitionKey` is defined in the input.

The TLDR as to why my version of this code is more readable than the original is:

1. Separation of concers and encapsulation (The sub-pieces of logic involed in this function are neatly organized in separate single-purpouse functions).
2. The code is DRY (no code duplication).
3. I removed the pyramind of doom in favor of 3 conditional statements with no nesting.
