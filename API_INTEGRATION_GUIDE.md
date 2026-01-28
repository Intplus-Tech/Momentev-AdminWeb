# API Integration Guide

This guide outlines the standard pattern for integrating backend API endpoints into the `momentev-adminweb` frontend using Next.js Server Actions.

## 1. Overview

We use **Server Actions** as a proxy layer between our frontend (Client Components) and the Backend API. This ensures:

- **Security**: API keys and tokens (inside cookies) are never exposed to the client.
- **Type Safety**: We define strictly typed inputs and outputs.
- **Simplicity**: Actions are called like regular async functions in the frontend.

## 2. File Structure

All API integrations should live in `lib/actions/`. Group actions by domain/feature.

```
lib/
  actions/
    auth.ts       # Authentication actions (login, logout)
    users.ts      # User management
    products.ts   # Product management
    ...
```

## 3. The Pattern

### Step 1: Define Interfaces

Always define input and output interfaces for type safety.

```typescript
// input
export interface CreateProductInput {
  name: string;
  price: number;
  categoryId: string;
}

// standard result wrapper
export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### Step 2: Implement the Action

Create the file (e.g., `lib/actions/products.ts`).

**Key Rules:**

1.  Start with `'use server'`.
2.  Use `getAccessToken()` from `@/lib/session` to get the auth token.
3.  Use `process.env.BACKEND_URL` for the API base URL.
4.  Handle errors gracefully and return an `ActionResult`.

```typescript
"use server";

import { getAccessToken } from "@/lib/session";
import { revalidatePath } from "next/cache";

// Interface definitions...

export async function createProduct(
  input: CreateProductInput,
): Promise<ActionResult> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // IMPORTANT: Forward the token
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle API errors
      return {
        success: false,
        error: data.message || `Error: ${response.statusText}`,
      };
    }

    // Optional: Revalidate cache if this mutates data displayed on a page
    revalidatePath("/products");

    return { success: true, data: data };
  } catch (error) {
    console.error("Create Product Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
```

## 4. Client-Side Usage

You can call this action directly in a Client Component, for example, inside a form submit handler or a `useEffect`.

```tsx
"use client";

import { useState } from "react";
import { createProduct } from "@/lib/actions/products";

export function CreateProductForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    const input = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      categoryId: "123",
    };

    // Call the server action
    const result = await createProduct(input);

    if (result.success) {
      alert("Product created!");
    } else {
      alert(`Failed: ${result.error}`);
    }

    setLoading(false);
  }

  return <form action={handleSubmit}>{/* Form inputs... */}</form>;
}
```

## 5. Fetching Data (GET Requests)

The pattern is identical for GET requests.

```typescript
"use server";

import { getAccessToken } from "@/lib/session";

export async function getProducts(): Promise<ActionResult<Product[]>> {
  const token = await getAccessToken();

  // Note: For GET requests, you might vary the cache strategy
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // cache: 'no-store' // Use if data changes frequently
    // next: { revalidate: 3600 } // Use for ISR (1 hour cache)
  });

  // ... error handling same as above ...
}
```

## Summary Checklist

- [ ] File created in `lib/actions/`.
- [ ] `'use server'` at the top.
- [ ] `process.env.BACKEND_URL` used.
- [ ] `Authorization` header set with `Bearer ${token}`.
- [ ] Error handling returns `{ success: false, error: ... }`.
- [ ] Types defined for Inputs and Outputs.
