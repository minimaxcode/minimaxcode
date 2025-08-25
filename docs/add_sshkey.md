# 当前项目指定ssh key命令
```shell
git config --local core.sshCommand "ssh -i C:/Users/ginko/.ssh/minimaxcode_github_rsa -o IdentitiesOnly=yes"

# 测试是否生效
ssh -i C:/Users/ginko/.ssh/minimaxcode_github_rsa -T git@github.com
```