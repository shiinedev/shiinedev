export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: "TypeScript" | "React" | "AI Agents"
  tags: string[]
  featured?: boolean
  content: string // markdown-ish rich text
}

export const posts: BlogPost[] = [
  // ── TypeScript ──────────────────────────────────────────────
  {
    slug: "typescript-utility-types-you-should-know",
    title: "12 TypeScript utility types you should actually be using",
    excerpt:
      "Beyond Partial and Omit — a practical tour of Awaited, NoInfer, ReturnType, and the less-known gems hiding in the standard library.",
    date: "Apr 10, 2026",
    readTime: "7 min",
    category: "TypeScript",
    tags: ["generics", "utility types", "tips"],
    featured: true,
    content: `Everyone knows \`Partial<T>\` and \`Omit<T, K>\`. But the standard library ships dozens of utility types most developers never reach for. Here are the ones that earn their keep.

## Awaited<T>

Before \`Awaited\`, unwrapping a Promise type required manual conditional types. Now it's one word:

\`\`\`typescript
type Result = Awaited<Promise<string>>; // string
type Nested = Awaited<Promise<Promise<number>>>; // number
\`\`\`

This is especially useful when you're pulling return types off async functions.

## ReturnType<T> and Parameters<T>

You probably know \`ReturnType\`, but \`Parameters\` is equally powerful:

\`\`\`typescript
function createUser(name: string, role: "admin" | "user") { /* ... */ }

type CreateUserArgs = Parameters<typeof createUser>;
// [name: string, role: "admin" | "user"]
\`\`\`

Combine them with rest parameters to forward args without duplicating types.

## NoInfer<T>

Added in TypeScript 5.4, \`NoInfer\` stops the compiler from using a specific position when inferring a type parameter:

\`\`\`typescript
function createStore<T>(initial: T, fallback: NoInfer<T>): T {
  return initial ?? fallback;
}

// Without NoInfer, 'fallback' would widen T to string | number
createStore("hello", 42); // Error — 42 is not assignable to string ✓
\`\`\`

## Extract<T, U> and Exclude<T, U>

These are the surgical tools for union manipulation:

\`\`\`typescript
type Status = "pending" | "active" | "cancelled" | "refunded";

type LiveStatus  = Extract<Status, "pending" | "active">;  // "pending" | "active"
type DeadStatus  = Exclude<Status, "pending" | "active">;  // "cancelled" | "refunded"
\`\`\`

## NonNullable<T>

Strips \`null\` and \`undefined\` from a type — useful when you've already done a runtime check:

\`\`\`typescript
type MaybeUser = User | null | undefined;
type User = NonNullable<MaybeUser>; // User
\`\`\`

## Record<K, V>

More expressive than an index signature, and plays better with mapped types:

\`\`\`typescript
type FeatureFlags = Record<"darkMode" | "betaDashboard" | "aiSearch", boolean>;
\`\`\`

## ConstructorParameters<T>

Like \`Parameters\` but for class constructors — great for factory functions:

\`\`\`typescript
class Connection {
  constructor(host: string, port: number, tls: boolean) {}
}

type ConnArgs = ConstructorParameters<typeof Connection>;
// [host: string, port: number, tls: boolean]
\`\`\`

## Takeaway

The built-in utility types are a vocabulary for talking about transformations on types. The more of them you know, the less you'll reach for bespoke conditional types — and the more readable your type signatures will be.`,
  },
  {
    slug: "typescript-discriminated-unions",
    title: "Discriminated unions are the best thing in TypeScript",
    excerpt:
      "How to model state machines, API responses, and complex domain logic with zero runtime overhead using tagged union types.",
    date: "Mar 28, 2026",
    readTime: "9 min",
    category: "TypeScript",
    tags: ["unions", "patterns", "type safety"],
    content: `A discriminated union is a union type where every member has a shared literal field — the discriminant — that TypeScript can use to narrow the type. It sounds academic. In practice it eliminates entire categories of bugs.

## The problem they solve

Consider a fetch wrapper that can either succeed or fail:

\`\`\`typescript
// ❌ Without discriminated unions
type Result<T> = {
  data?: T;
  error?: string;
  loading?: boolean;
};
// Nothing stops you accessing .data when there's an error
\`\`\`

Every field is optional, so nothing prevents reading \`data\` when the request failed. The type has no concept of mutual exclusivity.

## The fix

\`\`\`typescript
// ✓ Discriminated union
type Result<T> =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: T };
\`\`\`

Now TypeScript narrows automatically inside \`if\` or \`switch\`:

\`\`\`typescript
function render<T>(result: Result<T>) {
  switch (result.status) {
    case "loading":  return <Spinner />;
    case "error":    return <Error message={result.error} />; // error is string ✓
    case "success":  return <Data value={result.data} />;    // data is T ✓
  }
}
\`\`\`

## Exhaustiveness checking

Add a never-typed default to catch missing cases at compile time:

\`\`\`typescript
function assertNever(x: never): never {
  throw new Error("Unhandled case: " + x);
}

switch (result.status) {
  case "loading":  /* ... */ break;
  case "error":    /* ... */ break;
  // Forgot "success" → compile error on the next line ✓
  default: assertNever(result);
}
\`\`\`

## Real-world example: payment state machine

\`\`\`typescript
type PaymentState =
  | { kind: "idle" }
  | { kind: "processing"; transactionId: string }
  | { kind: "succeeded"; receiptUrl: string; amount: number }
  | { kind: "failed"; reason: string; retryable: boolean };
\`\`\`

Each state carries only the data that makes sense for that state. There is no \`receiptUrl\` on a failed payment. No \`reason\` on a succeeded one. The type is self-documenting.

## The discriminant doesn't have to be "kind" or "status"

Any literal field works:

\`\`\`typescript
type Shape =
  | { type: "circle"; radius: number }
  | { type: "rect"; width: number; height: number }
  | { type: "triangle"; base: number; height: number };
\`\`\`

## Takeaway

If you find yourself writing \`if (thing.error) { ... } else if (thing.data) { ... }\`, reach for a discriminated union instead. You'll get exhaustiveness, better autocomplete, and a type that documents intent rather than just structure.`,
  },
  {
    slug: "typescript-satisfies-operator",
    title: "The satisfies operator: what it is and when to reach for it",
    excerpt:
      "Introduced in TS 4.9, satisfies lets you validate a value against a type without widening it. Here's where that matters in practice.",
    date: "Mar 12, 2026",
    readTime: "5 min",
    category: "TypeScript",
    tags: ["satisfies", "narrowing", "TS 4.9"],
    content: `TypeScript 4.9 quietly shipped one of the most useful operators in years: \`satisfies\`. It solves a frustrating problem that developers hit all the time but worked around awkwardly.

## The problem

You want to validate an object against a type, but you also want to keep the literal type of each value rather than widening to the base type:

\`\`\`typescript
type Route = { path: string; method: "GET" | "POST" | "PUT" | "DELETE" };

const routes = {
  users:   { path: "/users",    method: "GET"  },
  create:  { path: "/users",    method: "POST" },
  profile: { path: "/me",       method: "GET"  },
} satisfies Record<string, Route>;
\`\`\`

Without \`satisfies\`, you'd annotate \`routes: Record<string, Route>\` — which widens \`method\` to \`string\` and loses autocomplete on \`routes.users.method\`.

With \`satisfies\`, TypeScript validates the shape **and** keeps the narrowed type. \`routes.users.method\` is still \`"GET"\`, not \`string\`.

## Another good case: palette objects

\`\`\`typescript
type Color = string | [number, number, number];

const palette = {
  red:   [255, 0, 0],
  green: "#00ff00",
  blue:  [0, 0, 255],
} satisfies Record<string, Color>;

// TypeScript knows .red is a tuple, .green is a string
palette.red.map(c => c / 255);  // ✓
palette.green.toUpperCase();    // ✓
\`\`\`

## When NOT to use it

If you want the widened type — e.g. you're exporting an object and consumers should see \`Record<string, Route>\`, not the literal shape — use a regular annotation instead. \`satisfies\` is for local validation where you still want inference downstream.

## Combining with \`as const\`

\`\`\`typescript
const config = {
  env: "production",
  port: 3000,
} satisfies AppConfig;
// env is "production" (not string), port is 3000 (not number)
\`\`\`

This is the sweet spot: full type-check, full literal inference, no casting.`,
  },
  {
    slug: "typescript-branded-types",
    title: "Branded types: making impossible states truly impossible",
    excerpt:
      "UserId and OrderId are both strings — until they're not. Branded types let the compiler catch bugs that runtime checks never will.",
    date: "Feb 20, 2026",
    readTime: "6 min",
    category: "TypeScript",
    tags: ["branded types", "domain modeling", "safety"],
    content: `Here's a bug TypeScript won't catch without branded types:

\`\`\`typescript
function getOrder(userId: string, orderId: string) { /* ... */ }

// Oops — args are swapped, but both are strings
getOrder(orderId, userId);
\`\`\`

Both arguments are \`string\`. The compiler is happy. Production is not.

## The solution: branded types

\`\`\`typescript
type Brand<T, B> = T & { readonly _brand: B };

type UserId  = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

function getOrder(userId: UserId, orderId: OrderId) { /* ... */ }

// Now this is a compile error ✓
getOrder(orderId, userId);
\`\`\`

The brand is a phantom field — it exists only in the type system and has zero runtime cost.

## Creating branded values safely

Use constructor functions that do runtime validation:

\`\`\`typescript
function createUserId(raw: string): UserId {
  if (!raw.startsWith("usr_")) throw new Error("Invalid user ID");
  return raw as UserId;
}
\`\`\`

The single \`as\` cast lives in one place. The rest of your codebase never casts.

## More useful examples

\`\`\`typescript
type PositiveInt  = Brand<number, "PositiveInt">;
type EmailAddress = Brand<string, "EmailAddress">;
type Cents        = Brand<number, "Cents">;   // never confuse with dollars

function charge(amount: Cents, to: UserId) { /* ... */ }
\`\`\`

## Where this shines most

- IDs that come from different tables (UserId, PostId, CommentId)
- Units of measurement (Meters vs Feet, Cents vs Dollars)
- Validated strings (EmailAddress, Slug, Url)
- Security contexts (sanitized HTML, raw user input)

## Takeaway

Branded types are the cheapest form of domain modeling available in TypeScript. They cost nothing at runtime, add a single line of type definition, and prevent a class of argument-order bugs that are otherwise invisible until they hit prod.`,
  },

  // ── React ────────────────────────────────────────────────────
  {
    slug: "react-server-components-mental-model",
    title:
      "React Server Components: the mental model that finally made it click",
    excerpt:
      "Stop thinking of RSC as 'async components'. The real insight is that the server component tree is a new kind of data-fetching primitive.",
    date: "Apr 3, 2026",
    readTime: "10 min",
    category: "React",
    tags: ["RSC", "Next.js", "App Router"],
    featured: true,
    content: `Most explanations of React Server Components lead with "they run on the server" and "you can \`await\` in them". That's accurate, but it misses the deeper idea — and that's why a lot of people find RSC confusing even after reading the docs.

## The real mental model

Server components are not just async components. They are a **serialisation boundary**.

When Next.js renders a server component tree, it doesn't produce HTML (that's a separate step). It produces a special wire format — sometimes called the RSC payload — that describes the component tree as data. This payload is sent to the client, where React reconciles it against the existing tree.

This means:

- Server components can fetch data inline without waterfalls
- They can import server-only modules (DB clients, secret keys) safely
- Their output can be streamed incrementally

But it also means they can't hold state or attach event handlers — they're not part of the interactive tree.

## The boundary is the point

\`\`\`typescript
// app/page.tsx — server component, runs once per request
export default async function Page() {
  const posts = await db.post.findMany(); // direct DB call, no API layer

  return (
    <main>
      <PostList posts={posts} />   {/* server component */}
      <LikeButton />               {/* must be "use client" */}
    </main>
  );
}
\`\`\`

\`LikeButton\` needs interactivity, so it opts into the client bundle with \`"use client"\`. Everything above it stays server-only. The data never touches the client until it's needed.

## Avoid the common mistake: lifting state up through RSC

You can't pass a callback from a server component to a client component:

\`\`\`typescript
// ❌ This doesn't work
<ClientButton onClick={someServerFunction} />
\`\`\`

Instead, use Server Actions — async functions marked with \`"use server"\` that the client can call as if they were regular async functions.

## The waterfall killer

Without RSC, fetching nested data means either an API route + client fetch (waterfall), or prop-drilling from a top-level \`getServerSideProps\`. With RSC, each component fetches exactly what it needs:

\`\`\`typescript
async function AuthorCard({ userId }: { userId: string }) {
  const user = await db.user.findUnique({ where: { id: userId } });
  return <div>{user.name}</div>;
}
\`\`\`

React deduplicates parallel fetches automatically via the fetch cache.

## Takeaway

Think of your app as two interleaved trees: a server tree that fetches and serialises data, and a client tree that handles interaction. RSC is the mechanism that lets you compose them cleanly — not just a way to run async code in components.`,
  },
  {
    slug: "react-use-hook-guide",
    title: "The new use() hook changes how you think about async React",
    excerpt:
      "React 19 ships use() for reading Promises and Context. Here's every case where it replaces useEffect + useState, and where it doesn't.",
    date: "Mar 18, 2026",
    readTime: "8 min",
    category: "React",
    tags: ["React 19", "use()", "async"],
    content: `React 19 ships a new primitive called \`use()\`. It's not a hook in the traditional sense — it can be called conditionally — but it integrates with Suspense and the React scheduler in ways that \`useEffect\` never could.

## Reading a Promise

\`\`\`typescript
import { use, Suspense } from "react";

function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise); // suspends until resolved
  return <div>{user.name}</div>;
}

// In the parent:
<Suspense fallback={<Skeleton />}>
  <UserProfile userPromise={fetchUser(id)} />
</Suspense>
\`\`\`

This replaces the classic pattern of:

\`\`\`typescript
const [user, setUser] = useState<User | null>(null);
useEffect(() => { fetchUser(id).then(setUser); }, [id]);
if (!user) return <Skeleton />;
\`\`\`

No loading state. No effect. No null check. The Suspense boundary handles the loading UI declaratively.

## Reading Context conditionally

Unlike \`useContext\`, \`use(Context)\` can live inside conditionals and loops:

\`\`\`typescript
function Notification({ show }: { show: boolean }) {
  if (!show) return null;
  const theme = use(ThemeContext); // fine — use() is not a hook
  return <div className={theme.notification}>...</div>;
}
\`\`\`

## Where useEffect still wins

\`use()\` doesn't replace effects that respond to external events — WebSockets, DOM events, timers. It only helps with data that is already a Promise. If you're subscribing to something, \`useEffect\` (or \`useSyncExternalStore\`) is still the right tool.

## The cache() function pairing

Pair \`use()\` with React's \`cache()\` to deduplicate requests across the tree:

\`\`\`typescript
import { cache } from "react";

const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } });
});

// Both components fetch the same user — only one DB call
function Page({ id }: { id: string }) {
  return (
    <>
      <Header userPromise={getUser(id)} />
      <Body  userPromise={getUser(id)} />
    </>
  );
}
\`\`\`

## Takeaway

\`use()\` is React's answer to the boilerplate that surrounds async data in client components. It won't replace every \`useEffect\`, but for the common pattern of "fetch something, show a skeleton, then render" — it's the cleaner path.`,
  },
  {
    slug: "react-compound-components",
    title: "Compound components: building APIs your teammates will love",
    excerpt:
      "The pattern behind Radix, ShadCN, and Headless UI — and how to implement it yourself for your own design system components.",
    date: "Mar 2, 2026",
    readTime: "11 min",
    category: "React",
    tags: ["patterns", "design systems", "API design"],
    content: `Look at how you use a ShadCN \`Select\`:

\`\`\`tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose a role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">Admin</SelectItem>
    <SelectItem value="user">User</SelectItem>
  </SelectContent>
</Select>
\`\`\`

This is the compound component pattern. Instead of a single component with twenty props, you get a family of components that share implicit state and compose naturally. Here's how to build it yourself.

## The naive approach (and its problems)

\`\`\`tsx
// ❌ Prop explosion
<Select
  options={[{ value: "admin", label: "Admin" }]}
  placeholder="Choose a role"
  triggerClassName="..."
  contentClassName="..."
  itemClassName="..."
/>
\`\`\`

You can't customise the layout. You can't insert content between items. The API fights every non-standard use case.

## Building it with Context

\`\`\`tsx
type TabsContext = {
  active: string;
  setActive: (value: string) => void;
};

const TabsCtx = createContext<TabsContext | null>(null);

function useTabs() {
  const ctx = useContext(TabsCtx);
  if (!ctx) throw new Error("Must be used inside <Tabs>");
  return ctx;
}

function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsCtx.Provider value={{ active, setActive }}>
      <div className="tabs">{children}</div>
    </TabsCtx.Provider>
  );
}

function TabsList({ children }: { children: ReactNode }) {
  return <div role="tablist" className="flex gap-2">{children}</div>;
}

function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const { active, setActive } = useTabs();
  return (
    <button
      role="tab"
      aria-selected={active === value}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children }: { value: string; children: ReactNode }) {
  const { active } = useTabs();
  if (active !== value) return null;
  return <div role="tabpanel">{children}</div>;
}
\`\`\`

Usage becomes:

\`\`\`tsx
<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="preview"><LiveDemo /></TabsContent>
  <TabsContent value="code"><CodeBlock /></TabsContent>
</Tabs>
\`\`\`

## Exporting as a namespace (optional but clean)

\`\`\`tsx
export const Tabs = Object.assign(TabsRoot, {
  List:    TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

// Usage
<Tabs.Root defaultValue="preview">
  <Tabs.List>
    <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>
\`\`\`

## Takeaway

Compound components shift API design from "what props do I expose?" to "what composition do I enable?". The result is components that are harder to misuse, easier to customise, and more pleasant to read at every call site.`,
  },
  {
    slug: "react-performance-common-mistakes",
    title: "5 React performance mistakes I see in every codebase",
    excerpt:
      "Unnecessary re-renders, missing keys, over-memoisation, layout effects in the wrong place, and one that will surprise you.",
    date: "Feb 8, 2026",
    readTime: "7 min",
    category: "React",
    tags: ["performance", "memo", "profiling"],
    content: `After reviewing dozens of React codebases, the same five patterns cause the majority of avoidable performance problems. Here they are, in rough order of how often I see them.

## 1. Defining objects and functions inside render

\`\`\`tsx
// ❌ New reference every render → child always re-renders
function Parent() {
  const options = { threshold: 0.5 };     // new object each render
  const handleClick = () => doSomething(); // new function each render
  return <Child options={options} onClick={handleClick} />;
}
\`\`\`

Move constants outside the component if they don't depend on props or state. Use \`useMemo\` / \`useCallback\` if they do.

## 2. Missing or incorrect keys in lists

\`\`\`tsx
// ❌ Using index as key — breaks when items reorder
items.map((item, i) => <Card key={i} {...item} />)

// ✓ Use a stable, unique ID
items.map((item) => <Card key={item.id} {...item} />)
\`\`\`

Using array index as key means React can't distinguish between "item moved" and "item changed" — leading to state being attached to the wrong element.

## 3. Over-memoisation

The opposite problem: wrapping everything in \`useMemo\` and \`useCallback\` out of habit.

\`\`\`tsx
// Pointless — primitive value, memoisation costs more than it saves
const label = useMemo(() => \`Hello \${name}\`, [name]);

// Pointless — component not wrapped in React.memo
const handleClick = useCallback(() => doSomething(), []);
\`\`\`

Memoisation only helps when the value is passed to a memoised child, or when the computation is genuinely expensive. Profile first, optimise second.

## 4. useLayoutEffect for non-layout work

\`useLayoutEffect\` runs synchronously after DOM mutations, before the browser paints. Using it for anything that doesn't need that timing blocks rendering:

\`\`\`tsx
// ❌ Fetching data in useLayoutEffect blocks paint
useLayoutEffect(() => { fetchData().then(setData); }, []);

// ✓ useEffect is async and non-blocking
useEffect(() => { fetchData().then(setData); }, []);
\`\`\`

Reserve \`useLayoutEffect\` for measuring DOM elements or synchronising scroll position.

## 5. Not using the React DevTools Profiler

This is the one that surprises people. Almost every team I've worked with diagnoses performance problems by guessing. The Profiler tab in React DevTools shows exactly which components re-rendered, how long they took, and why they rendered (which prop or state changed).

Open it, record a slow interaction, and look at the flamegraph before you reach for \`memo\`.

## Takeaway

Most React performance problems aren't subtle — they're the same patterns repeated. The fix is usually a stable reference, a correct key, or removing an unnecessary memoisation. Profile before you optimise, and you'll fix the right thing.`,
  },

  // ── AI Agents ────────────────────────────────────────────────
  {
    slug: "building-ai-agents-with-vercel-ai-sdk",
    title: "Building production AI agents with the Vercel AI SDK",
    excerpt:
      "A complete walkthrough of tool calling, multi-step agents, and streaming UI — using the AI SDK's useChat and streamText APIs.",
    date: "Apr 8, 2026",
    readTime: "14 min",
    category: "AI Agents",
    tags: ["Vercel AI SDK", "tool calling", "streaming"],
    featured: true,
    content: `The Vercel AI SDK has quietly become the best way to build LLM-powered features in a Next.js app. Here's how to go from a simple chat UI to a multi-step agent that can actually do things.

## The basics: streaming a response

\`\`\`typescript
// app/api/chat/route.ts
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}
\`\`\`

\`\`\`tsx
// components/chat.tsx
"use client";
import { useChat } from "ai/react";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}><b>{m.role}:</b> {m.content}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
\`\`\`

Twenty lines of code for a streaming chat. Now let's make it agentic.

## Adding tools

Tools are functions the model can call. The SDK handles the round-trip automatically:

\`\`\`typescript
import { streamText, tool } from "ai";
import { z } from "zod";

const result = await streamText({
  model: openai("gpt-4o"),
  messages,
  tools: {
    getWeather: tool({
      description: "Get current weather for a city",
      parameters: z.object({
        city: z.string().describe("The city name"),
      }),
      execute: async ({ city }) => {
        const data = await fetchWeather(city);
        return { temperature: data.temp, condition: data.condition };
      },
    }),
  },
});
\`\`\`

The model decides when to call the tool. The SDK executes it. The result is fed back. No manual loop required for single-step tool use.

## Multi-step agents with maxSteps

For agents that need to call multiple tools in sequence:

\`\`\`typescript
const result = await streamText({
  model: openai("gpt-4o"),
  messages,
  maxSteps: 5, // allow up to 5 tool call + response cycles
  tools: {
    searchWeb: tool({ /* ... */ }),
    readPage:  tool({ /* ... */ }),
    writeFile: tool({ /* ... */ }),
  },
});
\`\`\`

With \`maxSteps > 1\`, the model can search, read the result, decide to read a linked page, and finally write a summary — all in a single API call from your perspective.

## Streaming tool call progress to the UI

\`\`\`tsx
const { messages } = useChat({ maxSteps: 5 });

{messages.map((m) => (
  <div key={m.id}>
    {m.role === "assistant" && m.toolInvocations?.map((t) => (
      <div key={t.toolCallId} className="tool-call">
        {t.state === "call"   && <span>Calling {t.toolName}...</span>}
        {t.state === "result" && <span>Done: {JSON.stringify(t.result)}</span>}
      </div>
    ))}
    {m.content && <p>{m.content}</p>}
  </div>
))}
\`\`\`

## Takeaway

The AI SDK abstracts the streaming protocol, tool call lifecycle, and multi-step loop in a way that's hard to appreciate until you've implemented it from scratch. Start with \`streamText\` + \`useChat\`, add tools when you need side effects, and reach for \`maxSteps\` when one tool call isn't enough.`,
  },
  {
    slug: "ai-agent-memory-patterns",
    title: "Memory patterns for AI agents: short-term, long-term, episodic",
    excerpt:
      "How to give your agents context that lasts beyond a single conversation — from sliding windows to vector retrieval to summary compression.",
    date: "Mar 25, 2026",
    readTime: "12 min",
    category: "AI Agents",
    tags: ["memory", "RAG", "vector DB"],
    content: `LLMs are stateless. Every call starts fresh. For a simple Q&A bot that's fine — for an agent that needs to remember what you told it last week, it's a fundamental problem. Here are the patterns that actually work in production.

## Short-term memory: the context window

The simplest "memory" is keeping the conversation in the messages array:

\`\`\`typescript
const messages: Message[] = [
  { role: "system", content: systemPrompt },
  ...conversationHistory,
  { role: "user", content: newMessage },
];
\`\`\`

This works until the context window fills up. For long sessions, use a sliding window:

\`\`\`typescript
const MAX_MESSAGES = 20;
const trimmed = [
  systemMessage,
  ...conversationHistory.slice(-MAX_MESSAGES),
  newUserMessage,
];
\`\`\`

Simple, but you lose older context silently.

## Summary compression

Instead of dropping messages, summarise them periodically:

\`\`\`typescript
async function compressHistory(messages: Message[]): Promise<string> {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: \`Summarise this conversation in 200 words, preserving key facts and decisions:\\n\\n\${formatMessages(messages)}\`,
  });
  return text;
}

// When context grows too long:
const summary = await compressHistory(oldMessages);
const trimmedHistory = [
  { role: "system", content: \`Previous context: \${summary}\` },
  ...recentMessages,
];
\`\`\`

## Long-term memory: vector retrieval (RAG)

For facts that need to persist across sessions, store them as embeddings and retrieve by semantic similarity:

\`\`\`typescript
import { embed, embedMany } from "ai";

// Storing a memory
const { embedding } = await embed({
  model: openai.embedding("text-embedding-3-small"),
  value: "User prefers TypeScript over JavaScript",
});
await db.memory.create({ userId, embedding, content: "..." });

// Retrieving relevant memories
const { embedding: queryEmbedding } = await embed({
  model: openai.embedding("text-embedding-3-small"),
  value: userMessage,
});
const relevant = await db.memory.findSimilar(userId, queryEmbedding, { limit: 5 });

// Inject into context
const memoryContext = relevant.map(m => m.content).join("\\n");
\`\`\`

This is the backbone of most personal AI assistants.

## Episodic memory: structured event logs

For agents that take actions (send email, book calendar, modify files), log what they did:

\`\`\`typescript
type Episode = {
  timestamp: Date;
  action: string;
  params: Record<string, unknown>;
  result: string;
  sessionId: string;
};
\`\`\`

Retrieve recent episodes and inject as context: "Last Tuesday you sent an email to Alice about the Q3 report." This gives the agent continuity across sessions without relying on the user to repeat themselves.

## Takeaway

Pick the right memory pattern for the timescale. Sliding window for within-session context. Summary compression when context grows large. Vector retrieval for facts that persist across sessions. Episode logs for action history. Most production agents use all four.`,
  },
  {
    slug: "mcp-explained-for-developers",
    title: "MCP explained for developers: the protocol behind agentic tools",
    excerpt:
      "Model Context Protocol is becoming the USB-C of AI tooling. Here's what it actually does, how servers work, and when to build one.",
    date: "Mar 8, 2026",
    readTime: "9 min",
    category: "AI Agents",
    tags: ["MCP", "protocols", "tooling"],
    content: `Model Context Protocol (MCP) is an open standard that defines how AI models connect to external tools and data sources. Think of it as a universal adapter — instead of every LLM integration being custom-built, MCP gives you a shared protocol that works across clients.

## The problem it solves

Without MCP, integrating a tool with an AI assistant means:

1. Writing a custom function/tool definition for each LLM API (OpenAI format, Anthropic format, etc.)
2. Handling authentication per-integration
3. Rebuilding the same schema definitions for every client

With MCP, you write the server once. Any MCP-compatible client (Claude, Cursor, your custom app) can use it.

## How it works

An MCP server exposes three primitives:

**Tools** — functions the model can call:
\`\`\`typescript
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "search_codebase",
    description: "Search for code patterns across the repository",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        filePattern: { type: "string" },
      },
      required: ["query"],
    },
  }],
}));
\`\`\`

**Resources** — data the model can read (files, DB rows, API responses):
\`\`\`typescript
server.setRequestHandler(ReadResourceRequestSchema, async (req) => ({
  contents: [{
    uri: req.params.uri,
    mimeType: "text/plain",
    text: await readFile(req.params.uri),
  }],
}));
\`\`\`

**Prompts** — reusable prompt templates with parameters.

## Transport

MCP runs over two transports:

- **stdio** — process communicates via stdin/stdout. Used for local tools (filesystem, CLI).
- **HTTP + SSE** — server-sent events for real-time streaming. Used for remote services.

## When to build an MCP server

Build one when:
- You want the same integration to work across multiple AI clients
- You have internal tools that your whole team should be able to use with AI
- You're building a SaaS product and want to offer AI integration to customers

Don't build one if you're building a one-off integration inside a single Next.js app — the AI SDK's native tool calling is simpler.

## Minimal server example

\`\`\`typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({ name: "my-tools", version: "1.0.0" }, {
  capabilities: { tools: {} },
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{ name: "hello", description: "Says hello", inputSchema: { type: "object", properties: { name: { type: "string" } } } }],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => ({
  content: [{ type: "text", text: \`Hello, \${req.params.arguments?.name}!\` }],
}));

const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

## Takeaway

MCP is most valuable at the ecosystem level — it's what makes AI tooling composable instead of siloed. If you're building tools that multiple agents or clients should share, learn the protocol. If you're wiring one tool into one app, use your framework's native tool calling.`,
  },
  {
    slug: "evaluating-llm-agents-in-production",
    title: "How to evaluate LLM agents in production (without going insane)",
    excerpt:
      "Tracing, structured evals, golden datasets, and the metric that actually correlates with user satisfaction in agentic workflows.",
    date: "Feb 14, 2026",
    readTime: "10 min",
    category: "AI Agents",
    tags: ["evals", "observability", "tracing"],
    content: `Shipping an LLM agent to production without evaluation infrastructure is like deploying code without tests — it works until it doesn't, and you have no idea why. Here's the practical stack I use.

## Start with tracing

Before you can evaluate anything, you need to see what's happening. Every LLM call, tool invocation, and branching decision should be logged with:

- Input messages and context
- Model used and parameters
- Output and token counts
- Latency
- Tool calls and their results

Tools like LangSmith, Braintrust, and Helicone make this turnkey. Or log structured JSON to your existing observability stack.

\`\`\`typescript
// Minimal tracing wrapper
async function tracedGenerate(params: GenerateParams) {
  const start = Date.now();
  const result = await generateText(params);

  await logger.log({
    timestamp: new Date().toISOString(),
    model: params.model,
    inputTokens: result.usage.promptTokens,
    outputTokens: result.usage.completionTokens,
    latencyMs: Date.now() - start,
    messages: params.messages,
    output: result.text,
  });

  return result;
}
\`\`\`

## The three types of evals

**1. Unit evals** — test a specific capability in isolation:
\`\`\`typescript
const result = await agent.run("What's the capital of France?");
assert(result.includes("Paris"));
\`\`\`

**2. Trajectory evals** — check that the agent took the right steps, not just reached the right answer. Did it call the right tools? In the right order?

\`\`\`typescript
const trace = await agent.runWithTrace("Book a meeting with Alice");
assert(trace.toolCalls[0].name === "check_calendar");
assert(trace.toolCalls[1].name === "send_invite");
\`\`\`

**3. LLM-as-judge** — use a model to score free-form outputs:
\`\`\`typescript
const score = await generateText({
  model: openai("gpt-4o"),
  prompt: \`Rate this response 1-5 for helpfulness and accuracy.

  User question: \${question}
  Agent response: \${response}

  Return JSON: { score: number, reason: string }\`,
});
\`\`\`

## Golden datasets

The most reliable evals are deterministic. Build a dataset of input → expected output pairs, run your agent against it on every deploy, and alert when scores regress.

Start small — 20-30 carefully chosen examples that cover your edge cases are more valuable than 500 random ones.

## The metric that actually matters

Task completion rate. Not BLEU score, not response length, not "helpfulness" from an LLM judge. Did the agent accomplish the thing the user asked it to do?

Define completion criteria per task type and measure them objectively. Everything else is a proxy.

## Takeaway

Set up tracing before you launch. Write evals before you refactor. Build a golden dataset before you switch models. The order matters — you can't evaluate what you can't observe, and you can't improve what you can't evaluate.`,
  },
]

export const categories = ["TypeScript", "React", "AI Agents"] as const
export type Category = (typeof categories)[number]
