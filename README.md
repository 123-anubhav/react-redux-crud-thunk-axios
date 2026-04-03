# react-redux-crud-thunk-axios
react redux crud thunk axios


#  react 19changes with RTK, REDUX TOOLKIT

Great question—this is exactly what a 4–5 year React developer should master to move to **advanced + modern React architecture**.

I’ll give you **clear, structured notes from scratch → modern changes → with examples + concepts**.

---

# 🚀 1. OLD REACT + REDUX (Before Modern Changes)

## ❌ Problems in Old Approach

* Too much boilerplate
* Hard to maintain
* Confusing structure

### Example (Old Redux)

### 🔹 Actions

```js
export const FETCH_USERS = "FETCH_USERS";

export const fetchUsers = () => {
  return async (dispatch) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    dispatch({ type: FETCH_USERS, payload: data });
  };
};
```

### 🔹 Reducer

```js
const initialState = { users: [] };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
```

### 🔹 Store

```js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(userReducer, applyMiddleware(thunk));
```

👉 Problems:

* Manual action types
* Switch-case everywhere
* Middleware setup manually
* No standard structure

---

# 🔥 2. MODERN CHANGE → REDUX TOOLKIT (RTK)

## ✅ Why RTK?

* Less boilerplate
* Built-in best practices
* Immer for immutability
* Built-in thunk support

---

## 🧠 Core Concepts in RTK

### 1. `configureStore`

Replaces:

* `createStore`
* `applyMiddleware`
* DevTools setup

```js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    users: userReducer
  }
});
```

---

### 2. `createSlice` (🔥 Most Important)

👉 Combines:

* Action
* Reducer
* Type

```js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: { users: [] },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload; // direct mutation allowed (Immer)
    }
  }
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
```

---

### 3. Async Calls → `createAsyncThunk`

```js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    return res.json();
  }
);
```

---

### 4. Handle API States (extraReducers)

```js
const userSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  }
});
```

---

# ⚛️ 3. MODERN REACT CHANGES

## 🔹 1. Hooks (Biggest Change)

| Old               | New                   |
| ----------------- | --------------------- |
| Class Components  | Functional Components |
| lifecycle methods | useEffect             |

### Example

❌ Old:

```js
class App extends React.Component {
  componentDidMount() {
    console.log("Mounted");
  }
}
```

✅ New:

```js
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Mounted");
  }, []);
}
```

---

## 🔹 2. React Redux Hooks

Instead of `connect()`

### ✅ useSelector & useDispatch

```js
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./userSlice";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return users.map(u => <p key={u.id}>{u.name}</p>);
}
```

---

## 🔹 3. RTK Query (🔥 Advanced Modern Way)

👉 Replaces:

* Axios
* Thunk
* Manual API logic

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users"
    })
  })
});

export const { useGetUsersQuery } = api;
```

### Usage:

```js
function Users() {
  const { data, isLoading } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;

  return data.map(u => <p key={u.id}>{u.name}</p>);
}
```

👉 No dispatch, no reducer, no thunk!

---

# ⚡ 4. OTHER IMPORTANT REACT CHANGES

## 🔹 Concurrent Rendering (React 18)

* `useTransition`
* `useDeferredValue`

## 🔹 Automatic Batching

Multiple state updates → single render

## 🔹 Suspense + Lazy Loading

```js
const About = React.lazy(() => import("./About"));
```

---

# 🧠 5. REAL-WORLD ARCHITECTURE (MODERN)

```
src/
 ├── app/
 │    └── store.js
 ├── features/
 │    └── users/
 │         ├── userSlice.js
 │         ├── userAPI.js (RTK Query)
 │         └── Users.jsx
 ├── hooks/
 │    └── customHooks.js
```

---

# 🎯 6. WHEN TO USE WHAT

| Scenario         | Use               |
| ---------------- | ----------------- |
| Simple state     | useState          |
| Global state     | Redux Toolkit     |
| API calls        | RTK Query (BEST)  |
| Complex UI logic | Custom Hooks      |
| Performance      | memo, useCallback |

---

# 🔥 FINAL INTERVIEW SUMMARY

👉 Say this in interview:

* Earlier Redux had boilerplate (actions, reducers, types)
* Redux Toolkit simplified it using:

  * createSlice
  * configureStore
  * createAsyncThunk
* Now best practice:

  * Use RTK Query for API
  * Use hooks instead of connect
* React moved from class → functional + hooks
* React 18 introduced concurrent rendering & batching

---

# 🚀 If You Want Next Level

I can prepare for you:

✅ Full **production-level React + RTK project (step-by-step)**
✅ Convert your GitHub projects into **MNC-level architecture**
✅ Advanced topics:

* Normalization
* Caching strategies
* Optimistic updates
* WebSocket + RTK Query

Just tell: **"build advanced project"** 👍
