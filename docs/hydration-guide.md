# React Hydration Issues Guide

This guide explains common React hydration mismatch issues and how to prevent them in this Next.js project.

## What is Hydration?

Hydration is the process by which React takes server-rendered HTML and makes it interactive by attaching event handlers and initializing the React component tree on the client side.

## Common Hydration Mismatch Issues

### 1. Dynamic Attributes

Some libraries add dynamic attributes that differ between server and client rendering:

```jsx
// Problem: fdprocessedid attribute changes between server and client
<button fdprocessedid="abc123">Click me</button>
```

**Solution:** Filter out these attributes in components:

```jsx
import { filterHydrationSensitiveProps } from "@/lib/hydration-utils";

function Button({ className, ...props }) {
  const filteredProps = filterHydrationSensitiveProps(props);
  
  return (
    <button className={className} {...filteredProps}>
      Click me
    </button>
  );
}
```

### 2. Browser-Specific APIs

Using browser-specific APIs without proper checks:

```jsx
// Problem: Direct access to browser APIs
const timestamp = Date.now();
const randomValue = Math.random();

// Solution: Check for browser environment
const timestamp = typeof window !== "undefined" ? Date.now() : 0;
const randomValue = typeof window !== "undefined" ? Math.random() : 0.5;
```

### 3. Conditional Rendering Based on Window

Server and client may render different content:

```jsx
// Problem: Different content on server vs client
{typeof window !== 'undefined' && <ClientOnlyComponent />}

// Solution: Use dynamic imports with ssr: false
import dynamic from 'next/dynamic';

const ClientOnlyComponent = dynamic(() => import('./ClientOnlyComponent'), {
  ssr: false,
});
```

### 4. Date and Time Formatting

Using user's locale for date formatting:

```jsx
// Problem: Locale may differ between server and client
const date = new Date().toLocaleDateString();

// Solution: Use consistent formatting or pass locale explicitly
const date = new Date().toLocaleDateString('en-US');
```

### 5. External Data

Using external data that changes between server and client:

```jsx
// Problem: Data may change between server and client renders
function Component({ data }) {
  // data might be different on server vs client
}

// Solution: Pass data as props or use client-side fetching
function Component() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  if (!data) return <Loading />;
  
  return <Content data={data} />;
}
```

## Preventive Measures

### 1. Use Hydration-Safe Components

All UI components in this project should use the `filterHydrationSensitiveProps` utility:

```tsx
// components/ui/button.tsx
import { filterHydrationSensitiveProps } from "@/lib/hydration-utils";

function Button({ className, ...props }) {
  const filteredProps = filterHydrationSensitiveProps(props);
  
  return (
    <button className={className} {...filteredProps}>
      {props.children}
    </button>
  );
}
```

### 2. Mark Client Components

For components that use browser APIs, mark them as client components:

```tsx
// app/components/HeroSlider.tsx
'use client';

import { useState, useEffect } from 'react';

export default function HeroSlider() {
  // Browser-specific code here
}
```

### 3. Use Dynamic Imports for Heavy Components

For components that require browser APIs or are heavy:

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <Loading />,
});
```

### 4. Check Before Using Browser APIs

Always check for browser environment before using browser APIs:

```tsx
function useBrowserAPI() {
  const [isBrowser, setIsBrowser] = useState(false);
  
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  return isBrowser;
}

function Component() {
  const isBrowser = useBrowserAPI();
  
  if (!isBrowser) {
    return <Loading />;
  }
  
  return <BrowserComponent />;
}
```

## Debugging Hydration Issues

### 1. Use React DevTools

Install React DevTools to inspect component differences between server and client.

### 2. Check for Mismatches

Look for differences in:
- Attributes (especially `fdprocessedid`, `data-*` attributes)
- Text content
- Element structure
- Conditional rendering

### 3. Use the Hydration Fix Script

Run the provided script to automatically detect and fix common hydration issues:

```bash
node ashisuto-tech/scripts/fix-hydration-issues.js
```

### 4. Add Logging

Add console logs to track when hydration issues occur:

```tsx
function Component() {
  console.log('Component rendering on:', typeof window === 'undefined' ? 'server' : 'client');
  
  // Rest of component code
}
```

## Common Libraries That Cause Hydration Issues

### 1. Form Libraries

- `react-hook-form`
- `formik`
- `react-final-form`

These libraries often add dynamic attributes for form state management.

### 2. UI Libraries

- `shadcn/ui`
- `material-ui`
- `antd`
- `chakra-ui`

These libraries may add dynamic attributes for styling or state management.

### 3. Animation Libraries

- `framer-motion`
- `react-spring`
- `react-transition-group`

These libraries may manipulate the DOM during hydration.

## Best Practices

### 1. Keep Server and Client Rendering Consistent

Ensure that components render the same content on both server and client.

### 2. Use useEffect for Browser-Specific Code

Move browser-specific code to `useEffect` hooks:

```tsx
function Component() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    // Browser-specific code here
  }, []);
  
  if (!isClient) {
    return <Loading />;
  }
  
  return <ClientContent />;
}
```

### 3. Use Next.js Dynamic Imports

For components that can't be server-rendered:

```tsx
import dynamic from 'next/dynamic';

const ClientComponent = dynamic(() => import('./ClientComponent'), {
  ssr: false,
});
```

### 4. Test in Different Environments

Test your application in:
- Development mode (with warnings)
- Production mode
- Different browsers
- With browser extensions enabled/disabled

## Resources

- [Next.js Hydration Documentation](https://nextjs.org/docs/messages/react-hydration-error)
- [React Hydration Explained](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Common Hydration Issues](https://nextjs.org/docs/messages/react-hydration-error#common-causes)