// Copyright 2017-2020 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.v

import { ValidatorInfo } from './types';

import React, { useCallback } from 'react';
import { AddressSmall, Icon } from '@polkadot/react-components';
import { FormatBalance } from '@polkadot/react-query';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate';
import Favorite from '../Overview/Address/Favorite';

interface Props {
  info: ValidatorInfo;
  toggleFavorite: (accountId: string) => void;
}

function Validator ({ info: { accountId, bondOther, bondOwn, bondTotal, commissionPer, isCommission, isFavorite, isNominating, key, numNominators, rankOverall, rewardPayout, validatorPayment }, toggleFavorite }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const _onQueryStats = useCallback(
    (): void => {
      window.location.hash = `/staking/query/${key}`;
    },
    [key]
  );

  return (
    <tr className={`${isNominating && 'isHighlight'}`}>
      <Favorite
        address={key}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
      <td className='number'>{formatNumber(rankOverall)}</td>
      <td className='address'>
        <AddressSmall value={accountId} />
      </td>
      <td className='number'>
        {
          isCommission
            ? <><label>{t('commission')}</label>{`${commissionPer.toFixed(2)}%`}</>
            : <FormatBalance label={<label>{t('commission')}</label>} value={validatorPayment} />
        }
      </td>
      <td className='number together'><FormatBalance label={<label>{t('total stake')}</label>} value={bondTotal} /></td>
      <td className='number together'><FormatBalance label={<label>{t('own stake')}</label>} value={bondOwn} /></td>
      <td className='number together'><FormatBalance label={<label>{t('other stake')}</label>} value={bondOther} >&nbsp;({formatNumber(numNominators)})</FormatBalance></td>
      <td className='number together'><FormatBalance label={<label>{t('profit/era est.')}</label>} value={rewardPayout} /></td>
      <td>
        <Icon
          className='staking--stats'
          name='line graph'
          onClick={_onQueryStats}
        />
      </td>
    </tr>
  );
}

export default React.memo(Validator);
