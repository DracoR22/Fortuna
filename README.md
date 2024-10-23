<a href="https://fortuna-self.vercel.app">
  <img src="/public/fortunab.png">
  <h1 align="center">Fortuna ✨</h1>
</a>

<p align="center">
  The ultimate AI-powered writing tool with Notion-style Drag and Drop Text Editor and auto completion
</p>

### 💡 Key Features

- ✨ AI Auto-completion: Leverages advanced AI algorithms to predict and complete your text as you type.
- 📝 Drag and Drop Notion-style Text Editor: Intuitive and flexible text editor allowing for easy organization and formatting of your content.
- 💾 Real-time Saving: Automatically saves your progress to prevent data loss.
- 🌐 Cross-platform Compatibility: Accessible on multiple devices ensuring you can write anywhere, anytime.
- 📚 Document Management: Organize your writing projects with a user-friendly document management system.
- 🔒 Secure Authentication: Secure login and data protection to keep your work safe.
- 🚀 High Performance: Fast and responsive user interface for a seamless writing experience.

### 🔧 Tech Stack

- ⚛️ Next.js: React-based framework for building server-side rendered and statically generated web applications.
- 🐘 PostgreSQL: Robust, scalable, and SQL-compliant relational database management system.
- 🌿 DrizzleORM: TypeScript ORM for SQL databases, providing a type-safe and fluent API for database operations.
- 🔗 API Integration: Integration with OpenAI API for the AI completion functionality.
- 🎉 Tailwind CSS: Utility-first CSS framework for rapid UI development.
- 🔄 Vercel: Deployment and hosting platform optimized for Next.js applications.
- ⚡ TypeScript: Strongly typed programming language that builds on JavaScript, ensuring reliability and scalability.

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/DracoR22/Fortuna
```

### Install packages

```shell
pnpm install
```

### Setup .env file

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

DATABASE_URL=

OPENAI_API_KEY=

FIREBASE_API_KEY=
```

### Make sure you have this line in the tailwind.config file
```js
plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
```

### Start the app

```shell
pnpm dev
```

## Available commands

Running commands with npm `pnpm [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
| `build` | Build project                            |
| `lint`  | Check lint for project                   |
