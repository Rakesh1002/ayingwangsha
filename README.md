# Aying Wangsha Portfolio

A professional portfolio website for Aying Wangsha, an award-winning makeup artist specializing in bridal, editorial, and fashion makeup.

## Features

- 🎨 Modern, minimalist design
- 📱 Fully responsive layout
- ⚡ Next.js 14 with App Router
- 🎭 Framer Motion animations
- 🌓 Dark mode optimized
- 🖼️ Dynamic image loading with Next/Image
- 🎥 Video background with custom controls
- 🔍 SEO optimized
- 📊 Schema markup for better indexing
- 🎯 Performance optimized

## Tech Stack

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide Icons
- **Fonts:**
  - Playfair Display (Display)
  - Montserrat (Sans)
- **Media Storage:** AWS S3
- **Deployment:** Vercel

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ayingwangsha.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file with required environment variables:

```env
NEXT_PUBLIC_S3_BASE_URL=your_s3_bucket_url
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                # Next.js app router
├── components/         # React components
│   ├── sections/      # Page sections
│   └── ui/            # Reusable UI components
├── lib/               # Utilities and constants
└── styles/            # Global styles
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
