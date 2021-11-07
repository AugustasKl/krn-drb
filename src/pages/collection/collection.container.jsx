import { connect } from "react-redux";
import { selectIsCollectionsLoaded } from "../../components/redux/shop/shop.selector";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "../../pages/collection/collection.component"
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
  });
  

const CollectionPageContainer=compose(connect(mapStateToProps),WithSpinner)(CollectionPage)


export default CollectionPageContainer
