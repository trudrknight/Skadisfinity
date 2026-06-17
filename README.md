# Skadisfinity

Skadisfinity is a web-based calculator for designing custom modular storage layouts, built with React, Vite, and Tailwind CSS.

This project is based on [ntindle/gridfinity-space-optimizer](https://github.com/ntindle/gridfinity-space-optimizer).

## Features

- Easy-to-use calculator interface
- Customizable grid dimensions
- Real-time visual preview
- Export designs for 3D printing
- Support for various 3D printer sizes

## Getting Started

### Prerequisites

- Node.js (version 22.12 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <your-skadisfinity-repo-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd Skadisfinity
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Development

To run the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will be available at `http://localhost:8080` by default.

### Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

### Linting

Check code quality:

```bash
npm run lint
```

### Building for production

To create a production build:

```bash
npm run build
```

or

```bash
yarn build
```

### Cloudflare Web Analytics

Set the Cloudflare Web Analytics token in your deployment environment:

```bash
VITE_CLOUDFLARE_ANALYTICS_TOKEN=your_cloudflare_token_here
```

Do not commit the real token. Use `.env.example` as the safe template for local or hosted environment setup.

### AdSense Ad Slot

Skadisfinity includes one optional responsive ad slot beneath the visual preview and above the footer. It stays hidden in production until AdSense values are configured.

Set these values in your deployment environment after AdSense approval:

```bash
VITE_ADSENSE_CLIENT=ca-pub-yourpublisheridhere
VITE_ADSENSE_SLOT=your_ad_slot_id_here
```

For local visual testing, set:

```bash
VITE_ADSENSE_PLACEHOLDER=true
```

Do not commit real AdSense values. They are public when rendered in the browser, but environment variables keep deployment setup cleaner and avoid accidental placeholder IDs in source.

## CI/CD

This project uses GitHub Actions for continuous integration and deployment:

- **CI Pipeline**: Runs on every push and pull request
  - Tests across Node.js versions 18.x, 20.x, and 22.x
  - ESLint and TypeScript type checking
  - Build verification
  - Bundle size analysis

- **PR Checks**: Automated quality gates for pull requests
  - Test coverage reports
  - Code quality metrics
  - Automated PR comments with status

- **Deployment**: Cloudflare Pages deployment from the protected `master` branch

- **Security**: 
  - CodeQL semantic analysis for JavaScript/TypeScript
  - Multiple SAST tools (Semgrep, Snyk, Trivy)
  - Secret detection (Gitleaks, TruffleHog)
  - Weekly dependency audits
  - Automated Dependabot updates
  
- **Accessibility**: Automated WCAG 2.0/2.1 compliance testing
  
- **Performance**: Lighthouse CI and bundle size monitoring

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

All pull requests must pass:
- TypeScript type checking
- ESLint with no errors
- All tests passing
- Successful build

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ntindle/gridfinity-space-optimizer](https://github.com/ntindle/gridfinity-space-optimizer) for the original calculator implementation
- [Gridfinity](https://gridfinity.xyz/) for the original modular storage system concept
- [Vite](https://vitejs.dev/) for the fast build tool and development server
- [React](https://reactjs.org/) for the UI library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful and customizable UI components
