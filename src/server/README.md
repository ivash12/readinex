# src/server

Server-only code (data access, secrets, AI calls).

**Every file in this folder must start with:**

```ts
import "server-only";
```

This makes the build fail if a client component ever imports it.
Pure, I/O-free logic belongs in `src/lib` instead.
