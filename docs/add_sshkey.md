# 当前项目指定ssh key命令
```shell
# 生成密钥
ssh-keygen -t rsa -C "info@fuufuu1.com" -f fuu1fuu1_github_rsa

# 配置当前项目git信息
git config user.name 'fuufuu1'
git config user.email 'info@fuufuu1.com'

# 检查配置是否成功
git config user.name
git config user.email

git config --local core.sshCommand "ssh -i C:/Users/ginko/.ssh/fuu1fuu1_github_rsa -o IdentitiesOnly=yes"

# 测试是否生效
ssh -i C:/Users/ginko/.ssh/fuu1fuu1_github_rsa -T git@github.com

# ssh key的方式添加仓库
git remote set-url origin git@github.com:fuufuu1/site.git

git push -u origin main
```