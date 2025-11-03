# 📚 Book Search Engine

An Angular web application that allows users to search books using the **Google Books API**, view detailed information in a dialog, and save favorite titles to a **personal wishlist**.

Built with **Angular**, **TypeScript**, and **RxJS**, following modern Angular best practices — including **Signals**, **Reactive Forms**, and **standalone components**.

---

## ✨ Features

- 🔍 **Search Books** – Query the Google Books API with live updates.
- 📖 **Book Details Dialog** – View title, author, description, and cover in a modal.
- ❤️ **Wishlist Page** – Save and manage your favorite books locally.
- ⚡ **Signals-based State Management** – Reactive, efficient, and clean.
- 🚀 **Lazy Loaded Routes** – Optimized for fast performance and scalability.

---

## 🧠 Tech Stack

- **Angular 19+**
- **TypeScript (strict mode)**
- **RxJS**
- **Angular Material**
- **Signals** for component communication and state


**Data flow:**
- The search query, pagination signals, and results are all reactive.
- When the paginator changes, the parent (`BookListComponent`) reacts automatically via signals.
- API requests are debounced and combined using `combineLatest` from RxJS.

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/book-search-engine.git
cd book-search-engine

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
Login page:
<img width="1079" height="1113" alt="image" src="https://github.com/user-attachments/assets/b647f38a-81cf-44ca-b628-df4445f3d8e2" />

 Search page- pagination 5 in a page
<img width="1887" height="1162" alt="image" src="https://github.com/user-attachments/assets/15cfbd21-db8c-4eaa-8f05-dfb870c5d6e8" />

Search page - page size =10 and page index = 2..
<img width="1882" height="1188" alt="image" src="https://github.com/user-attachments/assets/ac0a60ce-f5e1-40d4-8c7e-1468f7359a3d" />

page details dialog - with add to wishlist btn:
<img width="716" height="567" alt="image" src="https://github.com/user-attachments/assets/60495978-9755-4720-8967-7c7b9c2f8e2a" />

wishlist page - same component as book card so here also if u click on card it shows the book details dialog
<img width="1476" height="712" alt="image" src="https://github.com/user-attachments/assets/02370bff-7dc7-4b8f-bf43-735e96c883d0" />




