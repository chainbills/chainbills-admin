export default [
  { type: 'fallback', stateMutability: 'payable' },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    name: 'ACTION_ID_CLOSE_PAYABLE',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'ACTION_ID_INITIALIZE_PAYABLE',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'ACTION_ID_PAY',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'ACTION_ID_REOPEN_PAYABLE',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'ACTION_ID_UPDATE_PAYABLE_DESCRIPTION',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'ACTION_ID_WITHDRAW',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'MAX_PAYABLES_DESCRIPTION_LENGTH',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'MAX_PAYABLES_TOKENS',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'chainId',
    inputs: [],
    outputs: [{ name: '', type: 'uint16', internalType: 'uint16' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'closePayable',
    inputs: [{ name: 'payableId', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [
      { name: 'messageSequence', type: 'uint64', internalType: 'uint64' }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'completeWithdrawal',
    inputs: [{ name: 'encoded', type: 'bytes', internalType: 'bytes' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'decodePayloadMessage',
    inputs: [{ name: 'encoded', type: 'bytes', internalType: 'bytes' }],
    outputs: [
      {
        name: 'parsed',
        type: 'tuple',
        internalType: 'struct CbStructs.CbPayloadMessage',
        components: [
          { name: 'actionId', type: 'uint8', internalType: 'uint8' },
          { name: 'caller', type: 'bytes32', internalType: 'bytes32' },
          { name: 'payableId', type: 'bytes32', internalType: 'bytes32' },
          { name: 'token', type: 'bytes32', internalType: 'bytes32' },
          { name: 'amount', type: 'uint256', internalType: 'uint256' },
          { name: 'allowsFreePayments', type: 'bool', internalType: 'bool' },
          {
            name: 'tokensAndAmounts',
            type: 'tuple[]',
            internalType: 'struct CbStructs.CbTokenAndAmount[]',
            components: [
              { name: 'token', type: 'bytes32', internalType: 'bytes32' },
              { name: 'amount', type: 'uint256', internalType: 'uint256' }
            ]
          },
          { name: 'description', type: 'string', internalType: 'string' }
        ]
      }
    ],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'encodePayloadMessage',
    inputs: [
      {
        name: 'parsed',
        type: 'tuple',
        internalType: 'struct CbStructs.CbPayloadMessage',
        components: [
          { name: 'actionId', type: 'uint8', internalType: 'uint8' },
          { name: 'caller', type: 'bytes32', internalType: 'bytes32' },
          { name: 'payableId', type: 'bytes32', internalType: 'bytes32' },
          { name: 'token', type: 'bytes32', internalType: 'bytes32' },
          { name: 'amount', type: 'uint256', internalType: 'uint256' },
          { name: 'allowsFreePayments', type: 'bool', internalType: 'bool' },
          {
            name: 'tokensAndAmounts',
            type: 'tuple[]',
            internalType: 'struct CbStructs.CbTokenAndAmount[]',
            components: [
              { name: 'token', type: 'bytes32', internalType: 'bytes32' },
              { name: 'amount', type: 'uint256', internalType: 'uint256' }
            ]
          },
          { name: 'description', type: 'string', internalType: 'string' }
        ]
      }
    ],
    outputs: [{ name: 'encoded', type: 'bytes', internalType: 'bytes' }],
    stateMutability: 'pure'
  },
  {
    type: 'function',
    name: 'getRegisteredEmitter',
    inputs: [
      { name: 'emitterChainId', type: 'uint16', internalType: 'uint16' }
    ],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getRelayerFee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      { name: 'wormhole_', type: 'address', internalType: 'address' },
      { name: 'tokenBridge_', type: 'address', internalType: 'address' },
      { name: 'chainId_', type: 'uint16', internalType: 'uint16' },
      { name: 'wormholeFinality_', type: 'uint8', internalType: 'uint8' }
    ],
    outputs: [],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'initializePayable',
    inputs: [
      { name: 'description', type: 'string', internalType: 'string' },
      { name: 'allowsFreePayments', type: 'bool', internalType: 'bool' },
      {
        name: 'tokensAndAmounts',
        type: 'tuple[]',
        internalType: 'struct CbStructs.CbTokenAndAmount[]',
        components: [
          { name: 'token', type: 'bytes32', internalType: 'bytes32' },
          { name: 'amount', type: 'uint256', internalType: 'uint256' }
        ]
      }
    ],
    outputs: [
      { name: 'messageSequence', type: 'uint64', internalType: 'uint64' }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'ownerWithdraw',
    inputs: [{ name: 'amount', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'ownerWithdrawToken',
    inputs: [
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'token', type: 'address', internalType: 'address' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'pay',
    inputs: [
      { name: 'payableId', type: 'bytes32', internalType: 'bytes32' },
      { name: 'token', type: 'bytes32', internalType: 'bytes32' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [
      { name: 'messageSequence', type: 'uint64', internalType: 'uint64' }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'registerEmitter',
    inputs: [
      { name: 'emitterChainId', type: 'uint16', internalType: 'uint16' },
      { name: 'emitterAddress', type: 'bytes32', internalType: 'bytes32' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'reopenPayable',
    inputs: [{ name: 'payableId', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [
      { name: 'messageSequence', type: 'uint64', internalType: 'uint64' }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'tokenBridge',
    inputs: [],
    outputs: [
      { name: '', type: 'address', internalType: 'contract ITokenBridge' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'updatePayableDescription',
    inputs: [
      { name: 'payableId', type: 'bytes32', internalType: 'bytes32' },
      { name: 'description', type: 'string', internalType: 'string' }
    ],
    outputs: [
      { name: 'messageSequence', type: 'uint64', internalType: 'uint64' }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'updateRelayerFee',
    inputs: [{ name: 'relayerFee_', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'withdraw',
    inputs: [
      { name: 'payableId', type: 'bytes32', internalType: 'bytes32' },
      { name: 'token', type: 'bytes32', internalType: 'bytes32' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [
      { name: 'messageSequence', type: 'uint64', internalType: 'uint64' }
    ],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'wormhole',
    inputs: [],
    outputs: [
      { name: '', type: 'address', internalType: 'contract IWormhole' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'wormholeFinality',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view'
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [
      {
        name: 'version',
        type: 'uint64',
        indexed: false,
        internalType: 'uint64'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'error',
    name: 'AddressEmptyCode',
    inputs: [{ name: 'target', type: 'address', internalType: 'address' }]
  },
  {
    type: 'error',
    name: 'AddressInsufficientBalance',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }]
  },
  { type: 'error', name: 'EmitterNotRegistered', inputs: [] },
  { type: 'error', name: 'EmptyDescriptionProvided', inputs: [] },
  { type: 'error', name: 'FailedInnerCall', inputs: [] },
  { type: 'error', name: 'ImproperPayablesConfiguration', inputs: [] },
  { type: 'error', name: 'InsufficientFeesValue', inputs: [] },
  { type: 'error', name: 'InvalidCallerAddress', inputs: [] },
  { type: 'error', name: 'InvalidInitialization', inputs: [] },
  { type: 'error', name: 'InvalidPayloadMessage', inputs: [] },
  { type: 'error', name: 'InvalidTokenAddress', inputs: [] },
  { type: 'error', name: 'InvalidTokenBridgeAddress', inputs: [] },
  { type: 'error', name: 'InvalidWormholeAddress', inputs: [] },
  { type: 'error', name: 'InvalidWormholeChainId', inputs: [] },
  { type: 'error', name: 'InvalidWormholeEmitterAddress', inputs: [] },
  { type: 'error', name: 'InvalidWormholeFinality', inputs: [] },
  { type: 'error', name: 'MaxPayableDescriptionReached', inputs: [] },
  { type: 'error', name: 'MaxPayableTokensCapacityReached', inputs: [] },
  {
    type: 'error',
    name: 'NotAnEvmAddress',
    inputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }]
  },
  { type: 'error', name: 'NotInitializing', inputs: [] },
  {
    type: 'error',
    name: 'OutOfBounds',
    inputs: [
      { name: 'offset', type: 'uint256', internalType: 'uint256' },
      { name: 'length', type: 'uint256', internalType: 'uint256' }
    ]
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }]
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }]
  },
  { type: 'error', name: 'ReentrancyGuardReentrantCall', inputs: [] },
  {
    type: 'error',
    name: 'SafeERC20FailedOperation',
    inputs: [{ name: 'token', type: 'address', internalType: 'address' }]
  },
  { type: 'error', name: 'TokenNotAttested', inputs: [] },
  { type: 'error', name: 'ZeroAmountSpecified', inputs: [] }
];
