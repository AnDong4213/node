const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function say(){
    rl.question('请输入: ', (inputStr) => {
      if(inputStr!='bye'){
        say();
      } else {
        rl.close();
      }
    });
}    

say();
