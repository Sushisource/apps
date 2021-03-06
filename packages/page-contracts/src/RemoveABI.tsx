// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { CodeStored } from '@polkadot/app-contracts/types';

import React from 'react';
import { Button, Modal } from '@polkadot/react-components';

import CodeRow from './CodeRow';
import { useTranslation } from './translate';

interface Props {
  code: CodeStored;
  onClose: () => void;
  onRemove: () => void;
}

function RemoveABI ({ code, onClose, onRemove }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const _onRemove = (): void => {
    onClose && onClose();
    onRemove();
  };

  return (
    <Modal
      className='app--accounts-Modal'
      header={t('Confirm ABI removal')}
      onClose={onClose}
    >
      <Modal.Content>
        <CodeRow
          code={code}
          isInline
        >
          <p>{t('You are about to remove this code\'s ABI. Once completed, should you need to access it again, you will have to manually re-upload it.')}</p>
          <p>{t('This operation does not impact the associated on-chain code or any of its contracts.')}</p>
        </CodeRow>
      </Modal.Content>
      <Modal.Actions onCancel={onClose}>
        <Button
          isPrimary
          onClick={_onRemove}
          label={t('Remove')}
          icon='trash'
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(RemoveABI);
