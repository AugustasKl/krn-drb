import React, {useEffect} from "react";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import { Route } from "react-router";
import { fetchCollectionsStart } from "../../components/redux/shop/shop.actions";
import { connect } from "react-redux";
import CollectionPageContainer from "../collection/collection.container";


const ShopPage =({fetchCollectionsStart, match})=> {
  // componentDidMount() {
  //   const { fetchCollectionsStart } = this.props;
  //   fetchCollectionsStart();
  // }

  useEffect(()=>{
    fetchCollectionsStart()
  },[fetchCollectionsStart])
  
    // const { match } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}/>
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }



const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
