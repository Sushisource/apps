/* eslint-disable @typescript-eslint/no-empty-interface */
// Copyright 2017-2020 @polkadot/app-settings authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MetadataDef } from '@polkadot/extension-inject/types';
import { getChainTypes } from '@polkadot/apps-config/api';
import { getSystemChainColor, getSystemIcon } from '@polkadot/apps-config/ui';
import { useApi } from '@polkadot/react-hooks';

import { useEffect, useState } from 'react';

interface ChainInfo extends MetadataDef {
  color: string | undefined;
}

export default function useChainInfo (): ChainInfo | null {
  const { api, isApiReady, systemChain, systemName } = useApi();
  const [state, setState] = useState<ChainInfo | null>(null);

  useEffect((): void => {
    isApiReady && setState({
      chain: systemChain,
      color: getSystemChainColor(systemChain, systemName),
      genesisHash: api.genesisHash.toHex(),
      icon: getSystemIcon(systemName),
      metaCalls: Buffer.from(api.runtimeMetadata.asCallsOnly.toU8a()).toString('base64'),
      specVersion: api.runtimeVersion.specVersion.toNumber(),
      ss58Format: api.registry.chainSS58 || 42,
      tokenDecimals: api.registry.chainDecimals || 12,
      tokenSymbol: api.registry.chainToken || 'Unit',
      types: getChainTypes(api.runtimeVersion.specName.toString(), systemChain)
    });
  }, [api, isApiReady, systemChain, systemName]);

  return state;
}
