import React, { useContext } from 'react';

import CollectionPreview from '../collection-preview/collection-preview.component';
import CollectionsContext from '../../contexts/collections/collections.context'


import './collections-overview.styles.scss';

const CollectionsOverview = () => {
  const collectionMap = useContext(CollectionsContext);
  const collections = Object.keys(collectionMap).map(key => collectionMap[key]);
  return(
  <div className='collections-overview'>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
)};


export default CollectionsOverview;
