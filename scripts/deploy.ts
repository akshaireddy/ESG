const { ethers } = require('hardhat');

async function main() {
  const ESGSmartContract = await ethers.getContractFactory('ESGSmartContract');
  const esgContract = await ESGSmartContract.deploy();
  await esgContract.deployed();

  console.log('ESG Smart Contract deployed to:', esgContract.address);

  // Interact with the contract
  const [deployer] = await ethers.getSigners();
  const companyAddress = deployer.address;

  // Register a company
  await esgContract.registerCompany(
    'Example Company',
    'Technology',
    2, // Environmental Rating (Medium)
    3, // Social Rating (High)
    1  // Governance Rating (Low)
  );

  console.log('Company registered.');

  // Get company's ratings
  const [environmentalRating, socialRating, governanceRating] = await esgContract.getCompanyRating(companyAddress);
  console.log('Company Ratings:', {
    Environmental: environmentalRating,
    Social: socialRating,
    Governance: governanceRating,
  });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
