// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RepositoryAccess {
    struct Repository {
        string name;
        mapping(address => bool) authorizedUsers;
    }

    uint256 numRepos;
    mapping(uint256 => Repository) repositories;

    function addRepository(string memory repositoryName)
        public
        returns (uint256)
    {
        Repository storage r = repositories[numRepos++];
        r.name = repositoryName;
        return numRepos - 1;
    }

    function getAllRepository() public view returns (string[] memory) {
        string[] memory ret = new string[](numRepos);
        for (uint256 i = 0; i < numRepos; i++) {
            ret[i] = repositories[i].name;
        }
        return ret;
    }


    function addAuthorizedUser(uint256 repositoryId, address userAddress)
        public
    {
        // require(repositories[repositoryId].authorizedUsers[msg.sender], "Only authorized users can add new users.");
        repositories[repositoryId].authorizedUsers[userAddress] = true;
    }

    function removeAuthorizedUser(uint256 repositoryId, address userAddress)
        public
    {
        // require(repositories[repositoryId].authorizedUsers[msg.sender], "Only authorized users can remove users.");
        repositories[repositoryId].authorizedUsers[userAddress] = false;
    }

    function isAuthorized(uint256 repositoryId, address userAddress)
        public
        view
        returns (bool)
    {
        return repositories[repositoryId].authorizedUsers[userAddress];
    }
}
