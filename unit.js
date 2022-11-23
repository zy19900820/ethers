const ethers = require("ethers")

const main = async () => {
    const oneGwei = ethers.BigNumber.from("1000000000")
    console.log(oneGwei)

    console.log("add:", oneGwei.add(1).toString())
    console.log("减法：", oneGwei.sub(1).toString())
    console.log("乘法：", oneGwei.mul(2).toString())
    console.log("除法：", oneGwei.div(2).toString())
    // 比较
    console.log("是否相等：", oneGwei.eq("1000000000"))


    console.log(ethers.utils.formatUnits(oneGwei, 0));
    // '1000000000'
    console.log(ethers.utils.formatUnits(oneGwei, "gwei"));
    // '1.0'
    console.log(ethers.utils.formatUnits(oneGwei, 9));
    // '1.0'
    console.log(ethers.utils.formatUnits(oneGwei, "ether"));
    // `0.000000001`
    console.log(ethers.utils.formatUnits(1000000000, "gwei"));
    // '1.0'
    console.log(ethers.utils.formatEther(oneGwei));

    console.log(ethers.utils.parseUnits("1.0").toString());
    // { BigNumber: "1000000000000000000" }
    console.log(ethers.utils.parseUnits("1.0", "ether").toString());
    // { BigNumber: "1000000000000000000" }
    console.log(ethers.utils.parseUnits("1.0", 18).toString());
    // { BigNumber: "1000000000000000000" }
    console.log(ethers.utils.parseUnits("1.0", "gwei").toString());
    // { BigNumber: "1000000000" }
    console.log(ethers.utils.parseUnits("1.0", 9).toString());
    // { BigNumber: "1000000000" }
    console.log(ethers.utils.parseEther("1.0").toString());
}

main()