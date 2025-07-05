# Library Backend with JWT Authentication

This GraphQL backend includes JWT token-based authentication with user context injection.

## Authentication Flow

1. **Create User**: `createUser` mutation
2. **Login**: `login` mutation returns JWT token
3. **Use Token**: Include token in `Authorization: Bearer <token>` header

## Example Usage

### 1. Create a User

```graphql
mutation {
  createUser(username: "john_doe", favoriteGenre: "fiction") {
    _id
    username
    favoriteGenre
  }
}
```

### 2. Login to Get Token

```graphql
mutation {
  login(username: "john_doe", password: "password123") {
    value
  }
}
```

### 3. Use Token in Requests

Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### 4. Access Current User

```graphql
query {
  me {
    _id
    username
    favoriteGenre
  }
}
```

## Resolver Context

All resolvers receive a `context` parameter with `currentUser`:

```javascript
const myResolver = async (root, args, context) => {
  const currentUser = requireAuth(context); // Throws if not authenticated
  console.log("User:", currentUser.username);
  // Your resolver logic here
};
```

## Environment Variables

Set `JWT_SECRET` in your `.env` file for production use.
