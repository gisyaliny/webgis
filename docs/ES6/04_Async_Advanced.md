# ES6 Module 4: Async & Advanced Concepts

## 1. Promises
Promises provide a cleaner way to handle asynchronous operations compared to callback hell. A Promise represents a value that may be available now, in the future, or never.

### States
- **Pending**: Initial state.
- **Fulfilled**: Operation completed successfully.
- **Rejected**: Operation failed.

### Basic Promise Usage
```javascript
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) resolve("Data received!");
    else reject("Connection error.");
  }, 1000);
});

fetchData
  .then(data => console.log(data))      // Output: "Data received!"
  .catch(error => console.error(error))
  .finally(() => console.log("Done.")); // Output: "Done."
```

### Real Example: Fetching User Data
```javascript
function getUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = {
        1: { id: 1, name: "Alice", role: "Admin" },
        2: { id: 2, name: "Bob", role: "User" }
      };
      
      const user = users[userId];
      if (user) {
        resolve(user);
      } else {
        reject(`User ${userId} not found`);
      }
    }, 1000);
  });
}

// Using the promise
getUserData(1)
  .then(data => console.log(data));
  
// Output: { id: 1, name: "Alice", role: "Admin" }
```

### Promise.all() - Run Multiple Promises in Parallel
`Promise.all()` waits for **all** promises to resolve, or fails immediately if **any one** fails.

**Real Example: Fetching Multiple API Endpoints**
```javascript
// Simulating API calls
function fetchUserProfile(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ userId, name: "Alice", email: "alice@example.com" });
    }, 1000);
  });
}

function fetchUserPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "First Post" },
        { id: 2, title: "Second Post" }
      ]);
    }, 1500);
  });
}

function fetchUserComments(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, text: "Great article!" },
        { id: 2, text: "Thanks for sharing" }
      ]);
    }, 800);
  });
}

// Fetch all data in parallel
Promise.all([
  fetchUserProfile(1),
  fetchUserPosts(1),
  fetchUserComments(1)
])
.then(([profile, posts, comments]) => {
  console.log("Profile:", profile);
  console.log("Posts:", posts);
  console.log("Comments:", comments);
});

/* Output (after ~1.5 seconds - the longest promise):
Profile: { userId: 1, name: "Alice", email: "alice@example.com" }
Posts: [ { id: 1, title: "First Post" }, { id: 2, title: "Second Post" } ]
Comments: [ { id: 1, text: "Great article!" }, { id: 2, text: "Thanks for sharing" } ]
*/
```

**Example: Promise.all with Failure**
```javascript
const promise1 = Promise.resolve("Success 1");
const promise2 = Promise.reject("Error in promise 2");
const promise3 = Promise.resolve("Success 3");

Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))
  .catch(error => console.error("Failed:", error));

// Output: "Failed: Error in promise 2"
// Note: Promise.all fails fast - stops at first rejection
```

### Promise.race() - First to Finish Wins
Returns the result of the **first** promise to settle (resolve or reject).

**Real Example: Timeout Implementation**
```javascript
function fetchWithTimeout(url, timeout = 5000) {
  const fetchPromise = new Promise(resolve => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 3000);
  });
  
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject("Request timeout!");
    }, timeout);
  });
  
  return Promise.race([fetchPromise, timeoutPromise]);
}

// This will succeed (3000ms < 5000ms timeout)
fetchWithTimeout("api.example.com/data", 5000)
  .then(data => console.log(data))
  .catch(error => console.error(error));
// Output: "Data from api.example.com/data"

// This will timeout (3000ms > 2000ms timeout)
fetchWithTimeout("api.example.com/data", 2000)
  .then(data => console.log(data))
  .catch(error => console.error(error));
// Output: "Request timeout!"
```

### Promise.allSettled() - Wait for All, Regardless of Outcome
Returns results of **all** promises, whether they resolve or reject.

**Real Example: Batch Processing with Error Handling**
```javascript
const uploadFile1 = Promise.resolve({ file: "image1.jpg", status: "uploaded" });
const uploadFile2 = Promise.reject({ file: "image2.jpg", error: "File too large" });
const uploadFile3 = Promise.resolve({ file: "image3.jpg", status: "uploaded" });

Promise.allSettled([uploadFile1, uploadFile2, uploadFile3])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`✓ Upload ${index + 1}:`, result.value);
      } else {
        console.log(`✗ Upload ${index + 1}:`, result.reason);
      }
    });
  });

/* Output:
✓ Upload 1: { file: "image1.jpg", status: "uploaded" }
✗ Upload 2: { file: "image2.jpg", error: "File too large" }
✓ Upload 3: { file: "image3.jpg", status: "uploaded" }
*/
```

### Promise.any() - First Success Wins
Returns the **first fulfilled** promise, ignoring rejections unless all fail.

```javascript
const slowServer = new Promise((resolve) => 
  setTimeout(() => resolve("Slow server response"), 3000)
);
const fastServer = new Promise((resolve) => 
  setTimeout(() => resolve("Fast server response"), 1000)
);
const failedServer = Promise.reject("Server down");

Promise.any([slowServer, fastServer, failedServer])
  .then(result => console.log(result));

// Output: "Fast server response" (after 1 second)
```

---

## 2. Symbols
`Symbol` is a new primitive type that is **unique**. It is often used to add unique property keys to objects that won't collide with other keys.

```javascript
const id = Symbol("id");
const user = {
  [id]: 12345,
  name: "Alice"
};

// Symbols are ignored in for...in loops and Object.keys()
console.log(Object.keys(user)); // ["name"]
```

---

## 3. Best Practices & Evolution

### `let` vs `const`
**Rule**: Always use `const`. Only use `let` if you explicitly need to reassign the variable.

### Arrow Functions
Use them for callbacks and array methods (`map`, `filter`). Use regular functions when you need dynamic `this` (e.g., inside object methods or event handlers if relying on `this`).

### Object Shorthand
```javascript
const x = 10, y = 20;
// Bad
const point = { x: x, y: y };
// Good (ES6)
const point = { x, y };
```

### Looking Ahead: `async` / `await` (ES2017)
While not strictly ES6, `async/await` is the modern standard for consuming Promises. It makes async code look synchronous and is easier to read.

#### Basic async/await
```javascript
// Promise-based approach
function getDataPromise() {
  return fetchData()
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(err => {
      console.error(err);
    });
}

// async/await approach (cleaner!)
async function getDataAsync() {
  try {
    const result = await fetchData();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}
```

#### Real Example: Sequential API Calls
```javascript
async function getUserFullData(userId) {
  try {
    // Wait for user profile
    const profile = await fetchUserProfile(userId);
    console.log("Got profile:", profile);
    
    // Then fetch posts (depends on profile)
    const posts = await fetchUserPosts(userId);
    console.log("Got posts:", posts);
    
    // Then fetch comments (depends on posts)
    const comments = await fetchUserComments(userId);
    console.log("Got comments:", comments);
    
    return { profile, posts, comments };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// Usage
getUserFullData(1);

/* Output (sequential - total ~3.3 seconds):
Got profile: { userId: 1, name: "Alice", email: "alice@example.com" }
Got posts: [ { id: 1, title: "First Post" }, ... ]
Got comments: [ { id: 1, text: "Great article!" }, ... ]
*/
```

#### Real Example: Parallel Execution with async/await
```javascript
async function getUserFullDataParallel(userId) {
  try {
    // Start all requests simultaneously
    const [profile, posts, comments] = await Promise.all([
      fetchUserProfile(userId),
      fetchUserPosts(userId),
      fetchUserComments(userId)
    ]);
    
    console.log("All data received!");
    return { profile, posts, comments };
  } catch (error) {
    console.error("Error:", error);
  }
}

// This completes in ~1.5 seconds (fastest of the three)
// vs ~3.3 seconds for sequential approach
```

#### Error Handling Patterns
```javascript
// Pattern 1: Try-Catch
async function fetchWithErrorHandling() {
  try {
    const data = await riskyOperation();
    return data;
  } catch (error) {
    console.error("Operation failed:", error);
    return null; // Fallback value
  }
}

// Pattern 2: Multiple operations with specific error handling
async function complexOperation() {
  let user, posts;
  
  try {
    user = await fetchUser(1);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return { error: "User not found" };
  }
  
  try {
    posts = await fetchPosts(user.id);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    posts = []; // Use empty array as fallback
  }
  
  return { user, posts };
}

// Pattern 3: Promise-style catch for specific operations
async function mixedErrorHandling() {
  const user = await fetchUser(1).catch(err => {
    console.error("User fetch failed:", err);
    return null;
  });
  
  if (!user) return;
  
  const posts = await fetchPosts(user.id);
  return { user, posts };
}
```

#### Real Example: API with Retry Logic
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.log(`Attempt ${i + 1} failed:`, error.message);
      
      if (i === maxRetries - 1) {
        throw new Error(`Failed after ${maxRetries} attempts`);
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
}

// Usage
fetchWithRetry("https://api.example.com/data")
  .then(data => console.log("Success:", data))
  .catch(error => console.error("Final failure:", error));

/* Output (if all attempts fail):
Attempt 1 failed: HTTP 500
Attempt 2 failed: HTTP 500
Attempt 3 failed: HTTP 500
Final failure: Error: Failed after 3 attempts
*/
```

#### Async Functions Always Return Promises
```javascript
async function getValue() {
  return 42;
}

// This is equivalent to:
function getValuePromise() {
  return Promise.resolve(42);
}

// Both can be used with .then()
getValue().then(value => console.log(value)); // Output: 42
```

---

## 🔴 Quiz: Async & Advanced

**Q1: What creates a microtask in the event loop?**
A) `setTimeout`
B) `Promise.resolve().then(...)`
C) `setInterval`

**Q2: If `Promise.all([A, B])` runs, and A rejects, what happens?**
A) It waits for B, then catches.
B) It immediately catches/rejects.
C) It ignores A and returns B.

**Q3: Are Symbols unique?**
A) No, `Symbol("x") === Symbol("x")` is true.
B) Yes, `Symbol("x") === Symbol("x")` is false.

**Q4: What does `Promise.race([p1, p2, p3])` return?**
A) An array of all results
B) The result of the first promise to settle (resolve or reject)
C) Only successful promises

**Q5: What is the output of this code?**
```javascript
async function test() {
  return "Hello";
}
console.log(test());
```
A) `"Hello"`
B) `Promise { <pending> }`
C) `Promise { "Hello" }`

**Q6: Which Promise method should you use when you want all results, even if some fail?**
A) `Promise.all()`
B) `Promise.allSettled()`
C) `Promise.race()`

**Q7: What's the difference between these two approaches?**
```javascript
// Approach 1
const a = await fetch(url1);
const b = await fetch(url2);

// Approach 2
const [a, b] = await Promise.all([fetch(url1), fetch(url2)]);
```
A) No difference
B) Approach 1 is sequential, Approach 2 is parallel
C) Approach 2 is slower

**Q8: What happens if you don't use `try-catch` with `await`?**
A) The error is automatically caught
B) The error propagates and can be caught with `.catch()`
C) The program crashes

**Q9: What does `Promise.any([p1, p2, p3])` return?**
A) The first promise to resolve (ignores rejections)
B) All promises that resolve
C) The fastest promise (resolve or reject)

**Q10: What is the total execution time for this code?**
```javascript
async function run() {
  await delay(1000); // 1 second
  await delay(2000); // 2 seconds
  await delay(1000); // 1 second
}
```
A) 1 second (parallel)
B) 2 seconds (takes the longest)
C) 4 seconds (sequential)

<details>
<summary><strong>See Answers</strong></summary>

**A1: B.** Promises use the Microtask queue, which has higher priority than Macrotasks (timers).

**A2: B.** `Promise.all` uses "fail-fast" behavior. It rejects as soon as one promise rejects.

**A3: B.** Every Symbol created is unique, even with the same description.

**A4: B.** `Promise.race` returns the first promise to settle, whether it resolves or rejects.

**A5: C.** Async functions always return a Promise. If you return a value, it's wrapped in `Promise.resolve()`.

**A6: B.** `Promise.allSettled()` waits for all promises and returns their results regardless of success or failure.

**A7: B.** Approach 1 executes sequentially (waits for each to complete). Approach 2 executes in parallel (both start immediately).

**A8: B.** Unhandled errors in async functions return a rejected Promise, which can be caught with `.catch()` on the function call.

**A9: A.** `Promise.any()` returns the first successful promise, ignoring rejections unless all promises reject.

**A10: C.** The `await` keyword makes execution sequential, so total time is 1 + 2 + 1 = 4 seconds.

</details>

