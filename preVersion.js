const shell = require('shelljs')

//检查控制台是否以运行`git `开头的命令
if (!shell.which('git')) {
  //在控制台输出内容
  shell.echo('💣 Sorry, this script requires git')
  shell.exit(1)
}

async function execGit(command) {
  try {
    await shell.exec(command)
  } catch (e) {
    shell.echo(`${command} is error`, e)
    shell.exit(1)
  }
}

;(async function () {
  // 将远程tag同步到本地
  await execGit('git fetch --tags')
})()
