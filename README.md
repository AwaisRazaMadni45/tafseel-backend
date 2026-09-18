# Tafseel Backend API

Node.js + Express + MongoDB backend for the Tafseel (Sofas, Curtains, Majlis) catalog frontend.
Written using `import`/`export` (ES Modules), same style as the React frontend.

## Setup

```bash
npm install
cp .env.example .env
# .env file mein apna MONGO_URI, JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD daalain

npm run create-admin        # pehla admin account banane ke liye (sirf ek dafa)
npm run insert-sample-data  # frontend ka static data DB mein daalne ke liye (sirf ek dafa, optional)
npm run dev                 # development server (http://localhost:5000)
```

## Folder Guide

| Folder | Kaam |
|---|---|
| `config/database.js` | MongoDB se connect karta hai |
| `models/` | Database mein data ka shape (Product, GalleryPhoto, Review, ContactMessage, Admin) |
| `controllers/` | Actual logic — data fetch/create/update/delete karna |
| `routes/` | URLs define karte hain aur controllers se link karte hain |
| `middleware/checkLogin.js` | Verify karta hai request ke sath valid admin token hai ya nahi |
| `middleware/handleErrors.js` | Errors ko clean JSON response mein badalta hai |
| `utils/imageUpload.js` | Image upload ka setup (Multer) |
| `startupData/` | Sirf ek dafa chalane wali files — pehla admin banana, sample data daalna |

## API Endpoints

### Products
| Method | Route | Auth | Kaam |
|---|---|---|---|
| GET | `/api/products` | Public | Sab products (`?category=sofas\|curtains\|majlis`, `?featured=true`) |
| GET | `/api/products/:id` | Public | Ek product ki detail |
| POST | `/api/products` | Admin | Naya product banayein |
| PUT | `/api/products/:id` | Admin | Product update karein |
| DELETE | `/api/products/:id` | Admin | Product delete karein |

### Gallery
| Method | Route | Auth | Kaam |
|---|---|---|---|
| GET | `/api/gallery` | Public | Sab gallery photos (`?category=` optional) |
| POST | `/api/gallery` | Admin | Nayi photo add karein |
| DELETE | `/api/gallery/:id` | Admin | Photo delete karein |

### Reviews (Testimonials)
| Method | Route | Auth | Kaam |
|---|---|---|---|
| GET | `/api/reviews` | Public | Sab reviews |
| POST | `/api/reviews` | Admin | Naya review add karein |
| DELETE | `/api/reviews/:id` | Admin | Review delete karein |

### Contact
| Method | Route | Auth | Kaam |
|---|---|---|---|
| POST | `/api/contact` | Public | Contact form submit — body: `{ name, phone, message }` |
| GET | `/api/contact` | Admin | Submitted inquiries dekhna |

### Admin
| Method | Route | Auth | Kaam |
|---|---|---|---|
| POST | `/api/admin/login` | Public | Login, returns `{ token, admin }` |

### Upload
| Method | Route | Auth | Kaam |
|---|---|---|---|
| POST | `/api/upload` | Admin | Image upload (form-data field: `image`), returns `{ url }` |

Admin routes test karne ke liye Postman mein header lagayein:
```
Authorization: Bearer <token jo login se mila>
```

## Frontend Connect Karna (baad ke liye)

`src/data/products.ts` ke static arrays ko `fetch` calls se replace karna hoga, jaise:
```ts
const res = await fetch('http://localhost:5000/api/products');
const products = await res.json();
```
