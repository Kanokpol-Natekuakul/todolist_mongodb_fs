# Todo API with Express & MongoDB

โปรเจ็กต์ RESTful API สำหรับจัดการ Todo List ที่ใช้ Express.js, MongoDB และ Mongoose พร้อมโครงสร้างแบบ MVC Pattern และ Service Layer

## 📁 โครงสร้างโปรเจ็กต์

```
├── src/
│   ├── index.js                      # Main application entry point
│   ├── models/
│   │   └── todo.model.js            # Todo data model และ schema
│   └── modules/
│       └── todo/
│           ├── todo.controller.js    # Route handlers (Controller)
│           └── todo.service.js       # Business logic (Service Layer)
├── dist/                            # Compiled JavaScript files
│   ├── index.js
│   ├── models/
│   │   └── todo.model.js
│   └── modules/
│       └── todo/
│           ├── todo.controller.js
│           └── todo.service.js
├── .babelrc                         # Babel configuration
└── package.json                     # Dependencies และ scripts
```

## 🚀 การติดตั้งและใช้งาน

### ติดตั้ง Dependencies

```bash
npm install
```

### Build โปรเจ็กต์

```bash
npm run build
```

### รัน Server

```bash
npm start
```

Server จะทำงานที่ `http://localhost:3030`

## 🗃️ Todo Data Model

```javascript
{
  title: String (required),           // หัวข้อของ Todo
  content: String (default: ""),      // รายละเอียด
  status: String (enum, default: "in-progress"), // สถานะ
  assignee: String (required),        // ผู้รับผิดชอบ
  subscribercounter: Number (default: 0) // จำนวนผู้ติดตาม
}
```

### Status Options
- `"in-progress"` - กำลังดำเนินการ (default)
- `"completed"` - เสร็จสิ้น
- `"backlog"` - รอดำเนินการ
- `"canceled"` - ยกเลิก

## 📖 API Documentation

### Base URL
```
http://localhost:3030
```

### API Endpoints

#### 1. สร้าง Todo ใหม่
```http
POST /todo
Content-Type: application/json

{
  "title": "Learn Node.js",
  "content": "Study Express and MongoDB",
  "assignee": "john_doe",
  "status": "in-progress"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Learn Node.js",
  "content": "Study Express and MongoDB",
  "assignee": "john_doe",
  "status": "in-progress",
  "subscribercounter": 0
}
```

#### 2. ดูรายการ Todo ทั้งหมด (พร้อม Filtering)
```http
GET /todo
GET /todo?search=nodejs
GET /todo?status=completed
GET /todo?assignee=john_doe
GET /todo?search=learn&status=in-progress&assignee=jane
```

**Query Parameters:**
- `search` - ค้นหาใน title (case-insensitive)
- `status` - กรองตาม status
- `assignee` - กรองตาม assignee
- `subscribercounter` - กรองตามจำนวนผู้ติดตาม
- `condition` - ใช้กับ subscribercounter (`or` หรือ `and`)

#### 3. ดู Todo รายการเดียว
```http
GET /todo/:id
```

#### 4. อัปเดต Todo (บางส่วน)
```http
PATCH /todo/:id
Content-Type: application/json

{
  "status": "completed",
  "subscribercounter": 5
}
```

#### 5. ลบ Todo
```http
DELETE /todo/:id
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "message": "Todo deleted successfully"
}
```

## 🏗️ Architecture Pattern

### MVC + Service Layer Pattern

#### **Model** (`src/models/todo.model.js`)
- กำหนด Schema และ Data Structure
- Validation rules
- Database connection

#### **Controller** (`src/modules/todo/todo.controller.js`)
- Handle HTTP requests/responses
- Route definitions
- Error handling
- Input validation

#### **Service** (`src/modules/todo/todo.service.js`)
- Business logic
- Database operations
- Data processing
- Complex queries

### ข้อดีของ Pattern นี้:
- **Separation of Concerns** - แยกหน้าที่ชัดเจน
- **Maintainability** - ง่ายต่อการดูแลรักษา
- **Testability** - ทดสอบได้แยกส่วน
- **Reusability** - ใช้ซ้ำได้
- **Scalability** - ขยายตัวได้ง่าย

## 🔍 Advanced Query Features

### 1. Text Search
```javascript
// ค้นหา title ที่มีคำว่า "node" (case-insensitive)
GET /todo?search=node
```

**Implementation:**
```javascript
title: {
  $regex: new RegExp(query.search, 'i')
}
```

### 2. Multiple Filters
```javascript
// กรองหลายเงื่อนไขพร้อมกัน
GET /todo?search=api&status=in-progress&assignee=john
```

### 3. Complex OR Conditions
```javascript
// ใช้ OR logic สำหรับ subscribercounter
GET /todo?subscribercounter=5&condition=or
```

**Implementation:**
```javascript
{
  $or: [
    ...basequery,
    { subscribercounter: query.subscribercounter }
  ]
}
```

## 🛠️ เทคโนโลยีที่ใช้

### Backend Framework
- **Express.js** - Web framework
- **Body-parser** - Request body parsing middleware

### Database
- **MongoDB** - NoSQL document database
- **Mongoose** - MongoDB object modeling

### Build Tools
- **Babel** - JavaScript transpiler
- **@babel/preset-env** - Modern JavaScript support

### JavaScript Features
- **ES6 Modules** - Import/Export
- **Async/Await** - Asynchronous programming
- **Destructuring** - Object/Array destructuring
- **Spread Operator** - Object spreading

## 📋 Prerequisites

- **Node.js** version 14.0.0+
- **MongoDB Atlas** account หรือ local MongoDB
- **npm** package manager

## 🔧 Configuration

### MongoDB Connection
```javascript
mongoose.connect("mongodb+srv://todo:todo123@cluster0.ywio5p9.mongodb.net/");
```

### Babel Configuration (`.babelrc`)
```json
{
  "presets": ["@babel/preset-env"]
}
```

## 📝 ตัวอย่างการใช้งาน

### 1. สร้าง Todo
```bash
curl -X POST http://localhost:3030/todo \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "content": "Write comprehensive README and API docs",
    "assignee": "developer1",
    "status": "in-progress"
  }'
```

### 2. ค้นหา Todo
```bash
# ค้นหาทั้งหมด
curl http://localhost:3030/todo

# ค้นหาด้วย text search
curl http://localhost:3030/todo?search=project

# กรองตาม status
curl http://localhost:3030/todo?status=completed

# กรองหลายเงื่อนไข
curl "http://localhost:3030/todo?search=api&assignee=john&status=in-progress"
```

### 3. อัปเดต Todo
```bash
curl -X PATCH http://localhost:3030/todo/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed",
    "subscribercounter": 10
  }'
```

### 4. ลบ Todo
```bash
curl -X DELETE http://localhost:3030/todo/507f1f77bcf86cd799439011
```

## 🎯 HTTP Status Codes

- `200` - สำเร็จ
- `404` - ไม่พบ Todo ที่ระบุ
- `500` - Server Error

## 🔒 Error Handling

### Error Response Format
```json
{
  "error": "Error message description"
}
```

### Error Types
- **Validation Error** - ข้อมูลไม่ถูกต้อง
- **Not Found Error** - ไม่พบ Todo
- **Database Error** - ปัญหาการเชื่อมต่อฐานข้อมูล

## 🚀 การขยายโปรเจ็กต์

### เพิ่ม Features
1. **User Authentication** - ระบบ login/register
2. **Todo Categories** - หมวดหมู่ Todo
3. **Due Dates** - กำหนดวันครบกำหนด
4. **File Attachments** - แนบไฟล์
5. **Notifications** - แจ้งเตือน

### เพิ่ม Modules
```
src/modules/
├── todo/
├── user/
├── category/
└── notification/
```

### เพิ่ม Middleware
- Authentication middleware
- Validation middleware
- Logging middleware
- Rate limiting

## 📊 Service Layer Functions

### CRUD Operations
```javascript
createtodo(tododata)           // สร้าง Todo ใหม่
updatetodoById(id, tododata)   // อัปเดต Todo
deletetodoById(id)             // ลบ Todo
findtodoById(id)               // หา Todo ด้วย ID
findManytodo(query)            // ค้นหา Todo หลายรายการ
```

### Query Building
- Dynamic query construction
- Multiple filter conditions
- Text search with regex
- Logical operators (AND/OR)

## 🧪 การทดสอบ

### ทดสอบด้วย Postman
1. Import collection from API documentation
2. Set environment variables
3. Run automated tests

### ทดสอบด้วย curl
```bash
# Test all endpoints
./test-api.sh
```

## 📚 การเรียนรู้เพิ่มเติม

โปรเจ็กต์นี้เป็นตัวอย่างที่ดีของ:

### Software Architecture
- **MVC Pattern** - Model-View-Controller
- **Service Layer Pattern** - Business logic separation
- **Repository Pattern** - Data access abstraction

### Node.js Best Practices
- **Modular Structure** - แยกโมดูลชัดเจน
- **Error Handling** - จัดการ errors อย่างเหมาะสม
- **Async Programming** - ใช้ async/await
- **Environment Configuration** - จัดการ config

### MongoDB/Mongoose
- **Schema Design** - การออกแบบ schema
- **Query Optimization** - เพิ่มประสิทธิภาพ query
- **Indexing Strategy** - กลยุทธ์การใส่ index
- **Aggregation Pipeline** - การประมวลผลข้อมูล
