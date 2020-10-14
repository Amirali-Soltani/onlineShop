import React, { Component, Fragment } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeMenu, openMenu } from '../../../../redux-slicers/burger-menu';

class Example extends React.Component {

  showSettings (event) {
    event.preventDefault();
  }

  render () {
let {statusOfMenu}=this.props
console.log(statusOfMenu);
    let {allCategories}=this.props
    return (
      <Menu right isOpen={ statusOfMenu } pageWrapId={ "page-wrap" } >
        {allCategories.filter((c1) => c1.parentId === 0)
                .map((i1) => (
                  <Fragment>
                  <Link to={`/category/${i1.id}`} className="menu-item" style={{textAlign:"right"}}>
                  {i1.title}
                  </Link>
                  {allCategories
                        .filter((c2) => c2.parentId === i1.id)
                        .map((i2) => 
                            <Link to={`/category/${i2.id}`}>
                              <div className="cat__name">{i2.title}</div>
                            </Link>
                        )}
                  </Fragment>
                )
              )
            }
            </Menu>
     );
    }
}
const mapStateToProps = (state) => ({
  allCategories: state.api.apiattributeItem.categories,
  statusOfMenu:state.menu.open
});
function mapDispatchToProps(dispatch) {
  return {
    openMenu: () => dispatch(openMenu()),
    closeMenu: () => dispatch(closeMenu()),
  };
}
export default connect(mapStateToProps,mapDispatchToProps) (Example);

{/* <a id="home" className="menu-item" href="/">Home</a>
<a id="about" className="menu-item" href="/about">About</a>
<a id="contact" className="menu-item" href="/contact">Contact</a>
<a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}