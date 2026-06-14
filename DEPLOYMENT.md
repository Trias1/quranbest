# Deployment Guide untuk QuranBest

Panduan lengkap untuk deploy QuranBest ke production.

## Option 1: Deploy ke Vercel (Recommended)

### Requirements
- Vercel Account
- GitHub Account
- Firebase Project

### Steps

1. Push code ke GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Login ke [Vercel](https://vercel.com)
3. Klik "New Project"
4. Import repository dari GitHub
5. Configure environment variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

6. Klik "Deploy"

### Custom Domain
1. Di Vercel dashboard, pergi ke "Settings" → "Domains"
2. Tambah custom domain
3. Update DNS records sesuai instruksi Vercel

## Option 2: Deploy ke AWS

### Using AWS Amplify

1. Connect GitHub repository ke AWS Amplify
2. Configure build settings
3. Add environment variables
4. Deploy

### Using EC2 + Docker

1. Launch EC2 instance (Ubuntu 20.04)
2. Install Docker dan Docker Compose
3. Clone repository
4. Create `.env.production` dengan credentials
5. Build dan run dengan Docker:

```bash
docker-compose -f docker-compose.yml up -d
```

## Option 3: Deploy ke VPS (DigitalOcean/Linode)

### Requirements
- VPS dengan 2GB RAM minimum
- Ubuntu 20.04 LTS

### Setup Steps

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Clone repository
git clone <repo-url>
cd quran-best

# Install dependencies
npm install --production

# Build project
npm run build

# Install PM2 untuk process management
sudo npm install -g pm2

# Start application
pm2 start npm --name "quran-best" -- start
pm2 startup
pm2 save
```

### Configure Nginx

```nginx
# /etc/nginx/sites-available/quran-best
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/quran-best /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Setup HTTPS dengan Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Production Checklist

- [ ] Environment variables di-set dengan benar
- [ ] Firebase security rules sudah di-configure
- [ ] HTTPS enabled
- [ ] Database backups configured
- [ ] Error monitoring setup (Sentry)
- [ ] Analytics configured
- [ ] CDN configured (Cloudflare)
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Logging enabled

## Performance Optimization

### Database
- Index frequently queried fields di Firestore
- Enable caching dengan Redis
- Archive old data

### Assets
- Compress images
- Use CDN untuk static assets
- Implement service worker untuk offline support

### Code
- Code splitting
- Tree shaking
- Lazy loading

### Monitoring
```bash
npm install sentry-cli
# Configure Sentry integration
```

## Scaling Considerations

### For 50K+ concurrent users

1. **Database**
   - PostgreSQL dengan replication
   - atau Firestore dengan auto-scaling

2. **Cache Layer**
   - Redis untuk session dan cache
   - CDN untuk static content

3. **Load Balancing**
   - Nginx atau HAProxy
   - Multiple application servers

4. **Monitoring**
   - Prometheus + Grafana
   - ELK Stack untuk logging

## Backup Strategy

```bash
# Daily backup
0 2 * * * /usr/local/bin/backup.sh

# Firebase export
gsutil -m cp -r gs://your-bucket gs://backup-bucket/$(date +%Y%m%d)
```

## Disaster Recovery

1. Maintain regular backups
2. Document recovery procedures
3. Test restore process monthly
4. Keep redundant systems

## Security Hardening

```bash
# SSH Key-only access
sudo sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# Firewall
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Fail2ban
sudo apt install -y fail2ban
```

## CI/CD Pipeline

Setup GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy
        run: # Deploy script
```

## Rollback Procedure

```bash
# If deployment fails
pm2 restart quran-best
# or
git revert HEAD~1
npm run build && pm2 restart quran-best
```

## Contact Support

- Firebase Support: https://firebase.google.com/support
- Vercel Support: https://vercel.com/support
- Your DevOps Team
