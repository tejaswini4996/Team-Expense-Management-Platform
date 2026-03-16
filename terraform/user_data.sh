#!/bin/bash
set -e

# Update system
sudo yum update -y

# Install Node.js 18
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install Docker
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker

# Clone repository
cd /home/ec2-user
git clone https://github.com/tejaswini4996/Team-Expense-Management-Platform.git
cd Team-Expense-Management-Platform

# Create .env file
cat > .env <<EOF
PORT=5000
DATABASE_URL=postgresql://${db_username}:${db_password}@${db_host}/team_expense
REDIS_URL=redis://${redis_host}:6379
JWT_SECRET=${jwt_secret}
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=${stripe_key}
AWS_REGION=us-east-1
NODE_ENV=production
EOF

# Install dependencies
npm install --production

# Start application with PM2
sudo npm install -g pm2
pm2 start server.js --name "team-expense-api"
pm2 startup
pm2 save

# Setup nginx as reverse proxy
sudo yum install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

cat > /etc/nginx/conf.d/app.conf <<EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo systemctl reload nginx

echo "Deployment complete!"