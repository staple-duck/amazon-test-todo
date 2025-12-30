# Security Notice

## ⚠️ Important: Environment Variables

### Development/Demo Setup

This repository includes `.env` files **for demonstration and quick-start purposes only**. This is NOT recommended for production applications.

**Committed files:**
- `.env` (root)
- `backend/.env`
- `frontend/.env`

These files contain default development credentials that are **publicly visible** in this repository.

### For Production Deployment

**NEVER use the committed .env files in production!** Follow these steps:

#### 1. Remove .env files from git

```bash
git rm --cached .env
git rm --cached backend/.env
git rm --cached frontend/.env
git commit -m "Remove .env files from repository"
```

#### 2. Update .gitignore

Uncomment or add `.env` to your `.gitignore`:

```gitignore
# Environment variables
.env
.env.local
.env.production
```

#### 3. Use Secure Environment Management

Choose one of these approaches:

**Option A: Environment-specific files (local)**
```bash
cp .env.production.example .env.production
# Edit .env.production with secure values
# NEVER commit this file
```

**Option B: Platform Environment Variables (recommended)**

For **Vercel:**
```bash
vercel env add VITE_API_URL
```

For **Railway:**
- Use the Railway dashboard to add environment variables

For **Heroku:**
```bash
heroku config:set DATABASE_URL=postgresql://...
```

For **AWS/Docker:**
- Use AWS Secrets Manager
- Use Docker secrets
- Use Kubernetes secrets

#### 4. Secure Production Credentials

Generate strong, unique credentials:

```bash
# Generate secure password
openssl rand -base64 32

# Or use password manager
# 1Password, LastPass, AWS Secrets Manager, etc.
```

### Production Checklist

- [ ] Remove .env files from git history
- [ ] Update .gitignore to ignore .env files
- [ ] Generate strong database credentials
- [ ] Set NODE_ENV=production
- [ ] Update CORS_ORIGIN to production domain
- [ ] Use HTTPS URLs for all endpoints
- [ ] Enable rate limiting
- [ ] Configure database backups
- [ ] Set up monitoring and logging
- [ ] Review all security headers (Helmet.js)
- [ ] Enable SSL/TLS for database connections
- [ ] Use environment-specific configuration
- [ ] Implement proper authentication (if needed)
- [ ] Regular security audits

### Responsible Disclosure

If you discover a security vulnerability, please email security@example.com instead of using the issue tracker.

### Default Credentials (Development Only)

The following credentials are used in the demo:

- **Database User:** `todouser`
- **Database Password:** `todopass`
- **Database Name:** `todoapp`

**These are publicly known and MUST be changed for any real deployment.**

### Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)
- [PostgreSQL Security](https://www.postgresql.org/docs/current/security.html)

---

**Remember:** Security is not a feature, it's a requirement. Always prioritize security over convenience in production environments.

