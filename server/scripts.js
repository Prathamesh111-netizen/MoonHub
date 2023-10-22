const { ethers } = require("ethers");

const repository = require("./contracts/artifacts/1_Repository.json");
const repositoryAddress = process.env.repoContract;
const repositoryAbi = repository.output.abi;

const provider = new ethers.providers.JsonRpcProvider(process.env.mantleRPC);

const wallet = new ethers.Wallet(process.env.myWallet, provider);

const repositoryContract = new ethers.Contract(
  repositoryAddress,
  repositoryAbi,
  wallet
);

var repo = null;
class RepositoryContract {
  constructor() {
    if (repo) return repo;
    repo = this._createRepo();
    return repo;
  }
  _createRepo() {
    const repositoryContract = new ethers.Contract(
      repositoryAddress,
      repositoryAbi,
      wallet
    );
    return repositoryContract;
  }

  async getRepository() {
    return await this.repositoryContract.getRepository();
  }
  async getRepositoryByAddress(address) {
    return await this.repositoryContract.getRepositoryByAddress(address);
  }
  async getRepositoryByIndex(index) {
    return await this.repositoryContract.getRepositoryByIndex(index);
  }
  async getRepositoryLength() {
    return await this.repositoryContract.getRepositoryLength();
  }
}

module.exports = RepositoryContract;
