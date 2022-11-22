const ethers = require("ethers");
require("dotenv").config();

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.URL);

  const wallet1 = new ethers.Wallet.createRandom();
  const wallet1WithProvider = wallet1.connect(provider);
  const mnemonic = wallet1.mnemonic; // 获取助记词

  const privateKey = process.env.KEY;
  const wallet2 = new ethers.Wallet(privateKey, provider);

  //const wallet3 = new ethers.Wallet.fromMnemonic(mnemonic.phrase);

  const address1 = await wallet1.getAddress();
  const address2 = await wallet2.getAddress();
  console.log("address:", address2);
  //console.log(`钱包1助记词: ${wallet1.mnemonic.phrase}`)

  const txCount2 = await wallet2.getTransactionCount();
  console.log(`钱包2发送交易次数: ${txCount2}`);

  console.log(`\n5. 发送ETH（测试网）`);
  // i. 打印交易前余额
  console.log(`i. 发送前余额`);
  console.log(
    `钱包1: ${ethers.utils.formatEther(
      await wallet1WithProvider.getBalance()
    )} ETH`
  );
  console.log(
    `钱包2: ${ethers.utils.formatEther(await wallet2.getBalance())} ETH`
  );
  // ii. 构造交易请求，参数：to为接收地址，value为ETH数额
  const tx = {
    to: address1,
    value: ethers.utils.parseEther("0.001"),
  };
  // iii. 发送交易，获得收据
  console.log(`\nii. 等待交易在区块链确认（需要几分钟）`);
  const receipt = await wallet2.sendTransaction(tx);
  await receipt.wait(); // 等待链上确认交易
  console.log(receipt); // 打印交易详情
  // iv. 打印交易后余额
  console.log(`\niii. 发送后余额`);
  console.log(
    `钱包1: ${ethers.utils.formatEther(
      await wallet1WithProvider.getBalance()
    )} ETH`
  );
  console.log(
    `钱包2: ${ethers.utils.formatEther(await wallet2.getBalance())} ETH`
  );
};

main();
