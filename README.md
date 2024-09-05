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
# Data Flow Diagram
```mermaid
graph TD
    User((ผู้ใช้))
    Admin((บรรณารักษ์))
    LibrarySystem[ระบบห้องสมุด]
    BookDB[(ฐานข้อมูลหนังสือ)]
    UserDB[(ฐานข้อมูลผู้ใช้)]
    BorrowDB[(ฐานข้อมูลการยืม-คืน)]

    User -->|ค้นหาหนังสือในห้องสมุด| Admin
    Admin -->|ค้นหาหนังสือในระบบ| LibrarySystem
    LibrarySystem -->|ตรวจสอบหนังสือ| BookDB
    Admin -->|ค้นหาผู้ใช้ในระบบ| LibrarySystem
    LibrarySystem -->|ข้อมูลผู้ใช้| UserDB
    Admin -->|บันทึกข้อมูลการยืม| LibrarySystem
    LibrarySystem -->|อัพเดตสถานะหนังสือ| BookDB
    LibrarySystem -->|บันทึกข้อมูลการยืม| BorrowDB
    BorrowDB -->|ส่งข้อมูลการยืม| User
    BookDB -->|ข้อมูลหนังสือปัจจุบัน| LibrarySystem


````

# Data Flow Diagram

```mermaid
graph TD
    User((ผู้ใช้))
    Librarian((แอดมิน/บรรณารักษ์))
    LibrarySystem[ระบบห้องสมุด]
    BorrowDB[(ฐานข้อมูลการยืมคืน)]

    User -->|นำหนังสือมาคืน| Librarian
    Librarian -->|ค้นหาข้อมูลการยืมในระบบ| LibrarySystem
    LibrarySystem -->|ดึงข้อมูลการยืม| BorrowDB
    Librarian -->|ตรวจสอบข้อมูลการยืม| LibrarySystem
    LibrarySystem -->|ตรวจสอบสถานะคืน/เกินกำหนด| BorrowDB
    Librarian -->|ยืนยันสถานะการคืนและค่าปรับ| LibrarySystem
    LibrarySystem -->|อัปเดตข้อมูลการคืนและค่าปรับ| BorrowDB
    LibrarySystem -->|อัปเดตสถานะหนังสือ| BorrowDB
    BorrowDB -->|ยืนยันข้อมูลคืนหนังสือ| User

````
# Data Flow Diagram

```mermaid
graph TD
    User((ผู้ใช้))
    LibrarySystem[ระบบห้องสมุด]
    EmailService[บริการอีเมล]
    UserDB[(ฐานข้อมูลผู้ใช้)]

    User -->|สมัครสมาชิก| LibrarySystem
    LibrarySystem -->|บันทึกข้อมูลผู้ใช้| UserDB
    LibrarySystem -->|ส่งอีเมลยืนยันตัวตน| EmailService
    EmailService -->|ส่งอีเมลยืนยัน| User
    User -->|คลิกลิงก์ยืนยันและกรอกข้อมูลเพิ่มเติม| LibrarySystem
    LibrarySystem -->|อัปเดตข้อมูลผู้ใช้ในระบบ| UserDB


````
```mermaid
graph TD
    User((ผู้ใช้))
    LibrarySystem[ระบบห้องสมุด]
    AuthService[บริการตรวจสอบสิทธิ์]
    UserDB[(ฐานข้อมูลผู้ใช้)]

    User -->|กรอกข้อมูลล็อกอิน| LibrarySystem
    LibrarySystem -->|ตรวจสอบข้อมูลล็อกอิน| AuthService
    AuthService -->|ตรวจสอบข้อมูลผู้ใช้| UserDB
    AuthService -->|ยืนยันสิทธิ์| LibrarySystem
    LibrarySystem -->|อนุญาตให้เข้าสู่ระบบ| User


````
