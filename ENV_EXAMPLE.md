# Environment Configuration - Frontend

## Setup

Create a `.env` file in the root of `front-end` directory with the following variables:

### API Configuration

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Initialize demo data (true/false)
VITE_INIT_DEMO=true

# Environment
VITE_ENV=development

# App Name
VITE_APP_NAME=Sustainique
```

### How to Use

1. Copy this configuration to a `.env` file in `front-end` directory
2. Modify values as needed for your environment

### Configuration Options

- **VITE_API_URL**: Backend API base URL (default: `http://localhost:5000/api`)
- **VITE_INIT_DEMO**: Enable/disable demo data initialization (default: `true`)
- **VITE_ENV**: Environment mode - `development` or `production`
- **VITE_APP_NAME**: Application name displayed in UI

### Demo Data

When `VITE_INIT_DEMO=true`, the application will:
- Auto-load demo users, products, designs
- Initialize local storage with demo data
- Show demo data in browser console via `window.__SUSTAINIQUE_DEMO__`

To access demo data in browser console:
```javascript
// Get all demo data info
window.__SUSTAINIQUE_DEMO__.info()

// View available users
window.__SUSTAINIQUE_DEMO__.users

// View available products
window.__SUSTAINIQUE_DEMO__.products

// View available designs
window.__SUSTAINIQUE_DEMO__.designs

// Reset all demo data
window.__SUSTAINIQUE_DEMO__.reset()
```

