import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss'
import { selectDirectorySection } from '../redux/directory/direcoty.selectors';
import { connect } from 'react-redux';

const Directory =({sections})=> (
   <div className="directory-menu">
        {
          sections.map(({ id, ...otherSectionProps}) => (
           < MenuItem key={id} {...otherSectionProps}/>
                ))} 
 </div>
        
)



const mapStateToProps=(state)=>({
  sections:selectDirectorySection(state)
})
    

export default connect(mapStateToProps) (Directory);