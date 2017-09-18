rm -rf .deploy
mkdir .deploy
GRAPHQL_URL=https://what-to-use-api.now.sh/graphql npm run build
mv dist .deploy/
cp index.html .deploy/
cp index.html .deploy/404.html
cp CNAME .deploy/
cd .deploy
git init
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:nguyenvanduocit/what-to-use-client.git master:gh-pages
