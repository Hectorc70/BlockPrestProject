// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/*
  ____  _            _     ____              
  | __ )| | ___   ___| | __|  _ \ _ __ ___ ___ 
  |  _ \| |/ _ \ / __| |/ /| |_) | '__/ _ \ __|
  | |_) | | (_) | (__|   < |  __/| | |  __\__ \
  |____/|_|\___/ \___|_|\_\|_|   |_|  \___|___/
  
  Sistema de Prestamos Rotativos v2.1 - Edicion MXNB
  Hecho con ❤️ por BlockPrest Mexico
  Ultima actualizacion: Julio 2024
*/

import "@hyperlane-xyz/core/contracts/interfaces/IMailbox.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BlockPrestMXNBHub {
    IMailbox public immutable mailbox;
    IERC20 public immutable mxnbToken;
    address public admin;

    // Configuración de cadenas soportadas
    struct ChainConfig {
        bytes32 receiverAddress;
        bool isActive;
    }
    
    mapping(uint32 => ChainConfig) public supportedChains;

    event DepositReceived(address indexed investor, uint256 amount);
    event TransferInitiated(uint32 indexed chainId, uint256 amount);

    constructor(address _mailbox, address _mxnbToken) {
        mailbox = IMailbox(_mailbox);
        mxnbToken = IERC20(_mxnbToken);
        admin = msg.sender;
        // Configurar cadenas al implementar
        // _setupChain(5000, 0x123...);     // Mantle
        _setupChain(534351, 0x00000000000000000000000046c967c9329a7549c69b34D78AD21eca53B9E94A);   // Scroll
        // _setupChain(592, 0x789...);      // Astar
        // _setupChain(9999, 0xSOD...);     // Sodeniun (ID de cadena ficticio)
        // _setupChain(324, 0xdef...);      // zkSync
    }

    function _setupChain(uint32 chainId, bytes32 receiver) private {
        supportedChains[chainId] = ChainConfig(receiver, true);
    }

    /**
     * @notice Deposita MXNB en el pool central
     * @param amount Cantidad de MXNB a depositar
     */
    function deposit(uint256 amount) external {
        mxnbToken.transferFrom(msg.sender, address(this), amount);
        emit DepositReceived(msg.sender, amount);
    }

    /**
     * @notice Envía MXNB a una cadena destino
     * @param chainId ID de la cadena destino
     * @param amount Cantidad a transferir
     */
    function transferToChain(uint32 chainId, uint256 amount) external payable {
        ChainConfig memory config = supportedChains[chainId];
        require(config.isActive, "Chain not supported");
        
        mxnbToken.transferFrom(msg.sender, address(this), amount);
        bytes memory message = abi.encode(msg.sender, amount);
        
        mailbox.dispatch{value: msg.value}(
            chainId,
            config.receiverAddress,
            message
        );
        
        emit TransferInitiated(chainId, amount);
    }
}