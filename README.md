# ER Diagram

````mermaid
erDiagram
    User {
        String id PK
        String username
        String email
        String password
        Boolean emailVerified
        String verificationToken
        UserRole role
        DateTime createdAt
        DateTime updatedAt
    }
    UserProfile {
        String id PK
        String username
        String emailAddress
        String prefix
        String fullName
        String codeNumber
        String phoneNumber
        String educationLevel
        String educationYear
        String description
        String profileImage
        String userId
        DateTime createdAt
        DateTime updatedAt
    }
    FavoriteBook {
        String id PK
        String userId
        String bookId
        DateTime createdAt
    }
    Activity {
        String id PK
        ActivityType type
        String userProfileId
        String bookId
        String categoryId
        String bannerId
        String borrowingId
        DateTime createdAt
        DateTime updatedAt
    }
    Category {
        String id PK
        String title
        String slug
        String imageUrl
        String description
        String creatorId
        DateTime createdAt
        DateTime updatedAt
    }
    Book {
        String id PK
        String title
        String slug
        Int price
        Int quantity
        Int remaining
        String author
        Boolean active
        String imageUrl
        String[] imageUrls
        String description
        DateTime createdAt
        DateTime updatedAt
    }
    Banner {
        String id PK
        String[] imageUrls
    }
    Borrow {
        String id PK
        String bookId
        String borrowerId
        String approverId
        String returnApproverId
        DateTime borrowDate
        DateTime dueDate
        DateTime returnDate
        Int numberOfDays
        Boolean isReturned
        Float fine
        BorrowingStatus status
        DateTime createdAt
        DateTime updatedAt
    }

    User ||--o{ UserProfile : "has"
    UserProfile ||--o{ FavoriteBook : "favorites"
    UserProfile ||--o{ Activity : "performs"
    UserProfile ||--o{ Borrow : "borrows"
    FavoriteBook }o--|| Book : "favorites"
    Activity }o--|| Book : "involves"
    Activity }o--|| Category : "involves"
    Activity }o--|| Banner : "involves"
    Activity }o--|| Borrow : "involves"
    Category ||--o{ Book : "includes"
    Borrow }o--|| Book : "involves"
````
# ER Diagram
```mermaid
graph TD
    User((ผู้ใช้))
    LibrarySystem[ระบบห้องสมุด]
    BookDB[(ฐานข้อมูลหนังสือ)]
    BorrowDB[(ฐานข้อมูลการยืม-คืน)]

    User -->|ข้อมูลการยืม| LibrarySystem
    User -->|ข้อมูลการคืน| LibrarySystem
    LibrarySystem -->|ตรวจสอบ/อัพเดตสถานะหนังสือ| BookDB
    LibrarySystem -->|บันทึก/อัพเดตข้อมูลการยืม-คืน| BorrowDB
    LibrarySystem -->|ข้อมูลยืนยัน/ค่าปรับ| User
    BookDB -->|ข้อมูลหนังสือ| LibrarySystem
    BorrowDB -->|ข้อมูลการยืม| LibrarySystem
````
