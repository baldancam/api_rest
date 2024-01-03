#!/bin/bash
npm run build
git add .

echo "Mensagem do commit: "
read message
git commit -am "$message"
git push
ssh 34.151.253.113 \
  'git -C /home/matheus/api/api ' \
  'pull origin master && ' \
  'pm2 restart api && sudo systemctl restart nginx'
