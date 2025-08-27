# Comment System API Documentation

## Overview

The Comment System provides a comprehensive commenting functionality for tokens in the FudClub platform. Users can post comments, like them, edit/delete their own comments, and view comment statistics. The system includes user-specific like status tracking and profile integration.

## Features

- ✅ **Token Comments**: Post comments on specific tokens
- ✅ **Like System**: Like/unlike comments (no dislikes)
- ✅ **User Integration**: Comments show user profiles (display name, avatar)
- ✅ **Edit/Delete**: Users can modify their own comments
- ✅ **Like Status**: Shows if requesting user has liked each comment
- ✅ **Statistics**: Comment analytics and most liked comments
- ✅ **Pagination**: Efficient handling of large comment lists
- ✅ **Soft Delete**: Comments are hidden, not permanently removed

## API Endpoints

### 1. Create Comment

**POST** `/api/v1/comments`

Create a new comment on a token.

#### Request Body

```json
{
  "tokenAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "walletAddress": "0x9876543210fedcba9876543210fedcba98765432",
  "content": "This token has amazing potential! 🚀",
  "parentComment": "64f5a8b2c3d4e5f6a7b8c9d0" // Optional: for replies
}
```

#### Response

```json
{
  "_id": "64f5a8b2c3d4e5f6a7b8c9d1",
  "tokenAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "walletAddress": "0x9876543210fedcba9876543210fedcba98765432",
  "content": "This token has amazing potential! 🚀",
  "likes": 0,
  "likedBy": [],
  "parentComment": null,
  "isDeleted": false,
  "createdAt": "2025-08-23T10:30:00.000Z",
  "updatedAt": "2025-08-23T10:30:00.000Z"
}
```

---

### 2. Get Token Comments

**GET** `/api/v1/comments/token/:tokenAddress`

Retrieve all comments for a specific token with optional like status.

#### Parameters

- `tokenAddress` (path) - Token contract address
- `wallet` (query, optional) - Requesting user's wallet address for like status
- `limit` (query, optional) - Number of comments to return (default: 50)
- `skip` (query, optional) - Number of comments to skip (default: 0)

#### Example Request

```
GET /api/v1/comments/token/0x1234567890abcdef1234567890abcdef12345678?wallet=0x9876543210fedcba9876543210fedcba98765432&limit=20&skip=0
```

#### Response

```json
[
  {
    "_id": "64f5a8b2c3d4e5f6a7b8c9d1",
    "tokenAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "walletAddress": "0x9876543210fedcba9876543210fedcba98765432",
    "content": "This token has amazing potential! 🚀",
    "likes": 15,
    "liked": true,
    "parentComment": null,
    "isDeleted": false,
    "createdAt": "2025-08-23T10:30:00.000Z",
    "updatedAt": "2025-08-23T10:30:00.000Z",
    "userProfile": {
      "displayName": "CryptoTrader",
      "profilePicture": "https://example.com/avatar.jpg"
    }
  }
]
```

---

### 3. Get Comment by ID

**GET** `/api/v1/comments/:id`

Retrieve a specific comment by its ID.

#### Parameters

- `id` (path) - Comment ID
- `wallet` (query, optional) - Requesting user's wallet address for like status

#### Example Request

```
GET /api/v1/comments/64f5a8b2c3d4e5f6a7b8c9d1?wallet=0x9876543210fedcba9876543210fedcba98765432
```

#### Response

```json
{
  "_id": "64f5a8b2c3d4e5f6a7b8c9d1",
  "tokenAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "walletAddress": "0x9876543210fedcba9876543210fedcba98765432",
  "content": "This token has amazing potential! 🚀",
  "likes": 15,
  "liked": true,
  "parentComment": null,
  "isDeleted": false,
  "createdAt": "2025-08-23T10:30:00.000Z",
  "updatedAt": "2025-08-23T10:30:00.000Z",
  "userProfile": {
    "displayName": "CryptoTrader",
    "profilePicture": "https://example.com/avatar.jpg"
  }
}
```

---

### 4. Update Comment

**PUT** `/api/v1/comments/:id`

Update the content of your own comment.

#### Parameters

- `id` (path) - Comment ID
- `wallet` (query, required) - Your wallet address for ownership verification

#### Request Body

```json
{
  "content": "Updated comment content with new insights! 📈"
}
```

#### Example Request

```
PUT /api/v1/comments/64f5a8b2c3d4e5f6a7b8c9d1?wallet=0x9876543210fedcba9876543210fedcba98765432
```

#### Response

```json
{
  "_id": "64f5a8b2c3d4e5f6a7b8c9d1",
  "tokenAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "walletAddress": "0x9876543210fedcba9876543210fedcba98765432",
  "content": "Updated comment content with new insights! 📈",
  "likes": 15,
  "likedBy": ["0x1111...", "0x2222..."],
  "parentComment": null,
  "isDeleted": false,
  "createdAt": "2025-08-23T10:30:00.000Z",
  "updatedAt": "2025-08-23T11:45:00.000Z"
}
```

---

### 5. Delete Comment

**DELETE** `/api/v1/comments/:id`

Soft delete your own comment (sets content to "[Deleted]" and isDeleted to true).

#### Parameters

- `id` (path) - Comment ID
- `wallet` (query, required) - Your wallet address for ownership verification

#### Example Request

```
DELETE /api/v1/comments/64f5a8b2c3d4e5f6a7b8c9d1?wallet=0x9876543210fedcba9876543210fedcba98765432
```

#### Response

```json
{
  "message": "Comment deleted successfully"
}
```

---

### 6. Like/Unlike Comment

**POST** `/api/v1/comments/:id/like`

Like, unlike, or remove reaction from a comment.

#### Parameters

- `id` (path) - Comment ID

#### Request Body

```json
{
  "walletAddress": "0x9876543210fedcba9876543210fedcba98765432",
  "action": "like" // "like" | "remove"
}
```

#### Response

```json
{
  "_id": "64f5a8b2c3d4e5f6a7b8c9d1",
  "tokenAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "walletAddress": "0x1111111111111111111111111111111111111111",
  "content": "This token has amazing potential! 🚀",
  "likes": 16,
  "likedBy": ["0x9876543210fedcba9876543210fedcba98765432", "0x2222..."],
  "parentComment": null,
  "isDeleted": false,
  "createdAt": "2025-08-23T10:30:00.000Z",
  "updatedAt": "2025-08-23T12:00:00.000Z"
}
```

---

### 7. Get Token Comment Statistics

**GET** `/api/v1/comments/token/:tokenAddress/stats`

Get comprehensive statistics for comments on a specific token.

#### Parameters

- `tokenAddress` (path) - Token contract address
- `wallet` (query, optional) - Requesting user's wallet address for like status

#### Example Request

```
GET /api/v1/comments/token/0x1234567890abcdef1234567890abcdef12345678/stats?wallet=0x9876543210fedcba9876543210fedcba98765432
```

#### Response

```json
{
  "totalComments": 142,
  "mostLikedComment": {
    "_id": "64f5a8b2c3d4e5f6a7b8c9d1",
    "walletAddress": "0x1111111111111111111111111111111111111111",
    "content": "This is the future of DeFi! 🌟",
    "likes": 89,
    "liked": false,
    "createdAt": "2025-08-20T14:20:00.000Z",
    "userProfile": {
      "displayName": "DeFiExpert",
      "profilePicture": "https://example.com/avatar2.jpg"
    }
  },
  "recentComments": [
    {
      "_id": "64f5a8b2c3d4e5f6a7b8c9d5",
      "walletAddress": "0x3333333333333333333333333333333333333333",
      "content": "Just bought more! 💰",
      "likes": 12,
      "liked": true,
      "createdAt": "2025-08-23T11:30:00.000Z",
      "userProfile": {
        "displayName": "Hodler",
        "profilePicture": "https://example.com/avatar3.jpg"
      }
    }
  ]
}
```

---

### 8. Get User Comments

**GET** `/api/v1/comments/wallet/:walletAddress`

Get all comments made by a specific user.

#### Parameters

- `walletAddress` (path) - User's wallet address
- `requestingWallet` (query, optional) - Requesting user's wallet for like status
- `limit` (query, optional) - Number of comments to return (default: 50)
- `skip` (query, optional) - Number of comments to skip (default: 0)

#### Example Request

```
GET /api/v1/comments/wallet/0x1111111111111111111111111111111111111111?requestingWallet=0x9876543210fedcba9876543210fedcba98765432&limit=10
```

#### Response

```json
[
  {
    "_id": "64f5a8b2c3d4e5f6a7b8c9d1",
    "walletAddress": "0x1111111111111111111111111111111111111111",
    "content": "This is the future of DeFi! 🌟",
    "likes": 89,
    "liked": false,
    "createdAt": "2025-08-20T14:20:00.000Z",
    "userProfile": {
      "displayName": "DeFiExpert",
      "profilePicture": "https://example.com/avatar2.jpg"
    }
  }
]
```

---

## Data Models

### Comment Schema

```typescript
{
  _id: ObjectId,                    // Unique comment identifier
  tokenAddress: string,             // Token contract address
  walletAddress: string,            // Comment author's wallet
  content: string,                  // Comment text (1-1000 characters)
  likes: number,                    // Number of likes
  likedBy: string[],               // Array of wallet addresses who liked
  parentComment: ObjectId | null,   // Parent comment ID for replies
  isDeleted: boolean,              // Soft delete flag
  deletedAt: Date,                 // Deletion timestamp
  createdAt: Date,                 // Creation timestamp
  updatedAt: Date                  // Last update timestamp
}
```

### Comment Response DTO

```typescript
{
  _id: string,
  tokenAddress: string,
  walletAddress: string,
  content: string,
  likes: number,
  liked: boolean,                  // Whether requesting user liked this
  parentComment?: string,
  isDeleted: boolean,
  createdAt: Date,
  updatedAt: Date,
  userProfile?: {
    displayName?: string,
    profilePicture?: string
  }
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": ["Comment cannot be empty"],
  "error": "Bad Request"
}
```

### 403 Forbidden

```json
{
  "statusCode": 403,
  "message": "You can only edit your own comments",
  "error": "Forbidden"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Comment with ID 64f5a8b2c3d4e5f6a7b8c9d1 not found",
  "error": "Not Found"
}
```

---

## Usage Examples

### Frontend Integration

#### React Example - Display Comments with Like Status

```javascript
const CommentsList = ({ tokenAddress, userWallet }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [tokenAddress, userWallet]);

  const fetchComments = async () => {
    const url = userWallet
      ? `/api/v1/comments/token/${tokenAddress}?wallet=${userWallet}&limit=20`
      : `/api/v1/comments/token/${tokenAddress}?limit=20`;

    const response = await fetch(url);
    const data = await response.json();
    setComments(data);
  };

  const handleLike = async (commentId, isLiked) => {
    const action = isLiked ? 'remove' : 'like';

    await fetch(`/api/v1/comments/${commentId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        walletAddress: userWallet,
        action,
      }),
    });

    fetchComments(); // Refresh comments
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="comment-header">
            <img src={comment.userProfile?.profilePicture} />
            <span>
              {comment.userProfile?.displayName || comment.walletAddress}
            </span>
          </div>
          <p>{comment.content}</p>
          <div className="comment-actions">
            <button
              className={comment.liked ? 'liked' : ''}
              onClick={() => handleLike(comment._id, comment.liked)}
            >
              👍 {comment.likes}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
```

#### Create Comment Example

```javascript
const createComment = async (tokenAddress, walletAddress, content) => {
  const response = await fetch('/api/v1/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tokenAddress,
      walletAddress,
      content,
    }),
  });

  return response.json();
};
```

---

## Best Practices

### 1. **Always Include Wallet for Like Status**

```javascript
// ✅ Good - includes wallet for like status
const url = `/api/v1/comments/token/${tokenAddress}?wallet=${userWallet}`;

// ❌ Acceptable but limited - no like status
const url = `/api/v1/comments/token/${tokenAddress}`;
```

### 2. **Handle Guest Users Gracefully**

```javascript
const getComments = (tokenAddress, userWallet = null) => {
  const baseUrl = `/api/v1/comments/token/${tokenAddress}`;
  const url = userWallet ? `${baseUrl}?wallet=${userWallet}` : baseUrl;
  return fetch(url);
};
```

### 3. **Implement Optimistic Updates**

```javascript
// Update UI immediately, then sync with server
const handleLike = (commentId) => {
  // Update UI optimistically
  setComments((prev) =>
    prev.map((comment) =>
      comment._id === commentId
        ? {
            ...comment,
            liked: !comment.liked,
            likes: comment.likes + (comment.liked ? -1 : 1),
          }
        : comment,
    ),
  );

  // Then sync with server
  syncLikeWithServer(commentId);
};
```

### 4. **Validate Content Length**

```javascript
const validateComment = (content) => {
  if (content.length === 0) return 'Comment cannot be empty';
  if (content.length > 1000) return 'Comment too long (max 1000 characters)';
  return null;
};
```

---

## Security & Permissions

- **Comment Ownership**: Users can only edit/delete their own comments
- **Wallet Verification**: Edit/delete operations require wallet address verification
- **Content Validation**: Comments are validated for length and content
- **Soft Delete**: Comments are never permanently deleted, only hidden
- **Rate Limiting**: Consider implementing rate limiting for comment creation

---

## Performance Considerations

- **Pagination**: Use `limit` and `skip` parameters for large comment lists
- **Indexing**: Database indexes on `tokenAddress`, `walletAddress`, and `createdAt`
- **Aggregation**: Comment statistics use efficient MongoDB aggregation
- **Caching**: Consider caching popular token comment counts
- **Profile Caching**: User profiles are fetched efficiently with select queries
