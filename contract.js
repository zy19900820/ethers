const ethers_rename = require("ethers");
require("dotenv").config();

const main = async () => {
  const provider = new ethers_rename.providers.JsonRpcProvider(process.env.URL);
  const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
  ];
  const addressDAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const contractDAI = new ethers_rename.Contract(
    addressDAI,
    abiERC20,
    provider
  );

  console.log(`address:${contractDAI.address}`);

  const name = await contractDAI.name();
  console.log("name:", name);

  const symbol = await contractDAI.symbol();
  console.log("symbol:", symbol);

  const totalSupply = await contractDAI.totalSupply();
  console.log("totalSupply:", ethers_rename.utils.formatEther(totalSupply));

  const balanceDAI = await contractDAI.balanceOf("vitalik.eth");
  console.log("balance of:", ethers_rename.utils.formatEther(balanceDAI));
};

main();
