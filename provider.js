const ethers = require("ethers");
require("dotenv").config();

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.URL);

  const balance = await provider.getBalance("vitalik.eth");
  console.log(ethers.utils.formatEther(balance));

  const network = await provider.getNetwork();
  console.log(network);

  const blockNumber = await provider.getBlockNumber();
  console.log(blockNumber);

  const gasPrice = await provider.getGasPrice();
  console.log(gasPrice);

  const gasFee = await provider.getFeeData();
  console.log(gasFee);

  const block = await provider.getBlock();
  console.log(block);

  const code = await provider.getCode(
    "0xc778417e063141139fce010982780140aa0cd5ab"
  );
  console.log(code);
};

main();
