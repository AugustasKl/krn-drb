import { connect } from "react-redux";
import { selectIsCollectionFetching } from "../redux/shop/shop.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";
import { compose } from "redux";




const mapStateToProps=state=>({
    isLoading:selectIsCollectionFetching(state)
})

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)
//  connect(mapStateToProps)(WithSpinner(CollectionsOverview))

export default CollectionsOverviewContainer