# ES6 Module 3: Architecture (Classes & Modules)

## 1. Classes
ES6 introduced `class` syntax, which is primarily syntactic sugar over JavaScript's existing prototype-based inheritance. It makes object-oriented programming patterns easier to write and read.

### Basic Syntax
```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi, I am ${this.name}`);
  }
}

const user = new User("Alice");
user.sayHi();
```

### Inheritance (`extends` and `super`)
```javascript
class Admin extends User {
  constructor(name, permissions) {
    super(name); // Call parent constructor
    this.permissions = permissions;
  }

  deleteUser(u) {
    console.log(`${this.name} deleted ${u.name}`);
  }
}
```

### Static Methods
Methods that are called on the class itself, not on instances.
```javascript
class MathUtil {
  static add(a, b) {
    return a + b;
  }
}
console.log(MathUtil.add(5, 5)); // 10
```

---

## 2. Modules (Import/Export)
ES6 introduced an official module system. Each file is treated as a separate module.

### Named Exports
You can export multiple items from a file.

```javascript
// analytics.js
export const data = [1, 2, 3];
export function analyze() { ... }
```

```javascript
// main.js
import { data, analyze } from './analytics.js';
```

### Default Exports
Used for the "main" entity of the module.

```javascript
// User.js
export default class User { ... }
```

```javascript
// main.js
import User from './User.js'; // No curly braces needed
```

### Renaming
```javascript
import { analyze as runAnalysis } from './analytics.js';
```

---

## 3. Important Notes on Modules
- **Strict Mode**: Modules are always in "strict mode" by default.
- **Defer**: Module scripts are deferred automatically (they wait for HTML to parse).
- **CORS**: Modules fetched over HTTP require valid CORS headers.

---

## 🔴 Quiz: Classes & Modules

**Q1: In a child class constructor, what must you call before using `this`?**
A) `super()`
B) `parent()`
C) `this.init()`

**Q2: How do you import a "default" export?**
A) `import { Name } from ...`
B) `import Name from ...`
C) `import [ Name ] from ...`

**Q3: Are ES6 Classes completely different from Prototypes?**
A) Yes, they use a new internal engine.
B) No, they are syntactic sugar over prototypes.

<details>
<summary><strong>See Answers</strong></summary>

**A1: A.** `super()` calls the parent constructor and initializes `this`.
**A2: B.** Default exports are imported without braces.
**A3: B.** Under the hood, it is still prototype-based inheritance.
</details>
