import React from "react";

import './collections-overview.styles.scss'
import { selectCollectionsForPreview } from "../../components/redux/shop/shop.selector";
import { connect } from "react-redux";
import CollectionPreview from "../../components/collection-preview/collection-preview.components";



const CollectionsOverview=({collections})=>(
<div className ='collections-overview'>
{
    collections.map(({id, ...otherCollectionProps})=>(
    <CollectionPreview key={id} {...otherCollectionProps}/>
     ))}

</div>
)


const mapStateToProps=(state)=>({ 
    collections:selectCollectionsForPreview(state)
})

export default connect(mapStateToProps)(CollectionsOverview)